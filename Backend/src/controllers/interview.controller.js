import asyncHandler from "express-async-handler"
import Interview from "../models/interview.model.js"
import ApiResponse from "../utils/ApiResponse.js"
import createChatSession from "../utils/geminiai.js"
import Feedback from "../models/feedback.model.js"
import ApiError from "../utils/ApiError.js"
import User from "../models/user.model.js"

const extractJSONArray = (value) => {
  if (typeof value !== "string") return null

  const cleaned = value.trim().replace(/^```json\s*/i, "").replace(/```$/i, "")
  const startIndex = cleaned.indexOf("[")
  const endIndex = cleaned.lastIndexOf("]")

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    return null
  }

  return cleaned.slice(startIndex, endIndex + 1)
}

const normalizeQuestions = (items) => {
  if (!Array.isArray(items)) return []

  return items
    .filter(
      (item) =>
        item && typeof item.question === "string" && typeof item.answer === "string"
    )
    .map((item) => ({
      question: item.question.trim(),
      answer: item.answer.trim(),
    }))
    .filter((item) => item.question && item.answer)
}

const parseQuestions = (rawText) => {
  if (typeof rawText !== "string") return null

  const cleaned = rawText.trim().replace(/^```json\s*/i, "").replace(/```$/i, "")

  try {
    const directParsed = JSON.parse(cleaned)
    if (Array.isArray(directParsed)) {
      return normalizeQuestions(directParsed)
    }
    if (Array.isArray(directParsed?.questions)) {
      return normalizeQuestions(directParsed.questions)
    }
  } catch {
    // Ignore parse errors and try extracting JSON array from mixed text.
  }

  const payload = extractJSONArray(cleaned)
  if (!payload) return null

  try {
    const parsed = JSON.parse(payload)
    return normalizeQuestions(parsed)
  } catch {
    return null
  }
}

const buildFallbackQuestions = ({
  jobRole,
  jobDescription,
  jobExperience,
  noOfQuestions,
  difficulty,
}) => {
  const role = jobRole || "this role"
  const experience = Number(jobExperience)
  const years = Number.isNaN(experience) ? 0 : experience
  const level = (difficulty || "easy").toLowerCase()
  const count = Math.max(1, Number(noOfQuestions) || 5)
  const focus = (jobDescription || "core responsibilities").slice(0, 80)

  const bank = [
    {
      question: `Can you walk me through your recent experience as a ${role}?`,
      answer:
        "Start with scope, team size, business context, and two measurable outcomes that you personally influenced.",
    },
    {
      question: `How would you break down a ${role} problem statement before implementation?`,
      answer:
        "Clarify requirements, constraints, and success metrics; propose architecture options; estimate effort; then execute in milestones.",
    },
    {
      question: `What trade-offs do you consider when designing solutions for ${focus}?`,
      answer:
        "Compare performance, scalability, reliability, maintainability, and cost, then justify decisions with expected impact.",
    },
    {
      question: `How do you ensure quality and reduce regressions in your work?`,
      answer:
        "Use layered testing, code reviews, observability, rollback plans, and post-release monitoring tied to clear SLIs/SLOs.",
    },
    {
      question: `Describe a difficult bug you resolved and your debugging process.`,
      answer:
        "Reproduce reliably, isolate variables, inspect logs/metrics, form hypotheses, validate with small experiments, and document the fix.",
    },
    {
      question: `How do you communicate technical decisions with product and non-technical stakeholders?`,
      answer:
        "Translate options into risks, timeline, and user impact; align on priorities; and keep updates concise and frequent.",
    },
    {
      question: `What is your approach to performance optimization in a ${role} context?`,
      answer:
        "Measure first, identify bottlenecks, optimize highest-impact paths, and validate improvements with baseline comparisons.",
    },
    {
      question: `How do you handle security and privacy concerns in your projects?`,
      answer:
        "Apply secure defaults, least privilege, input validation, dependency scanning, and regular threat-model reviews.",
    },
    {
      question: `Tell me about a time you had to deliver under tight deadlines.`,
      answer:
        "Prioritize ruthlessly, reduce scope to essentials, communicate trade-offs early, and protect quality for critical paths.",
    },
    {
      question: `How would you mentor someone junior in your team for this role?`,
      answer:
        "Set clear expectations, pair on real tasks, provide actionable feedback, and gradually increase ownership.",
    },
  ]

  const adjustedBank = bank.map((item) => {
    if (level === "hard") {
      return {
        question: `${item.question} Also discuss edge cases and system-level impact.`,
        answer: `${item.answer} Include failure modes, scalability considerations, and rollback strategy.`,
      }
    }

    if (level === "medium") {
      return {
        question: `${item.question} Include practical implementation details.`,
        answer: `${item.answer} Cover design choices and why one approach was selected over others.`,
      }
    }

    return item
  })

  return Array.from({ length: count }, (_, index) => {
    const template = adjustedBank[index % adjustedBank.length]
    return {
      question: `${template.question} (Experience context: ${years} year(s))`,
      answer: template.answer,
    }
  })
}

/**
 * @function createInterview
 * @description Create an interview
 * @access Private
 * @route POST /api/v1/interviews
 * @returns {Object}
 */
const createInterview = asyncHandler(async (req, res) => {
  const { jobRole, jobDescription, jobExperience, noOfQuestions, difficulty } =
    req.body
  const userId = req.user?._id

  // *Check if user has enough credits
  const creditsLeft = await User.findById(userId).select(
    "credits maxNoOfQuestions"
  )
  if (!creditsLeft) {
    throw new ApiError(404, "User not found")
  }
  if (creditsLeft?.credits < 1) {
    throw new ApiError(400, "You don't have enough credits")
  }
  // console.log(creditsLeft)
  if (noOfQuestions > creditsLeft?.maxNoOfQuestions) {
    throw new ApiError(
      400,
      `Max no. of question is ${creditsLeft?.maxNoOfQuestions}`
    )
  }

  const prompt = `
    Job Role: ${jobRole}
    Job Description: ${jobDescription}
    Years of Experience: ${jobExperience}
    Difficulty: ${difficulty}
    Generate exactly ${noOfQuestions} interview questions and answers in the following JSON format:
    [
      {
        "question": "question_text",
        "answer": "answer_text"
      },
      ...
    ]
    The questions should be related to ${jobRole} with appropriate difficulty based on the provided years of experience and difficulty level.
`

  let questionsAndAnswers = null

  if (process.env.GEMINI_API_KEY) {
    try {
      const chatSession = createChatSession()
      const result = await chatSession.sendMessage(prompt)
      const responseText = result?.response?.text?.() || ""
      questionsAndAnswers = parseQuestions(responseText)
    } catch (error) {
      console.error("Gemini interview generation failed:", error?.message)
    }
  } else {
    console.error("Gemini key missing. Falling back to local interview questions.")
  }

  if (!questionsAndAnswers || questionsAndAnswers.length === 0) {
    questionsAndAnswers = buildFallbackQuestions({
      jobRole,
      jobDescription,
      jobExperience,
      noOfQuestions,
      difficulty,
    })
  }

  // *Create interview
  const interview = await Interview.create({
    userId,
    questionsAndAnswers,
    jobRole,
    jobDescription,
    jobExperience,
    noOfQuestions,
    difficulty,
  })

  // *Update user credits
  await User.findByIdAndUpdate(userId, {
    $set: {
      credits: creditsLeft.credits - 1,
    },
  })
  res
    .status(201)
    .json(
      new ApiResponse(201, "Interview created successfully", interview?._id)
    )
})

/**
 * @function getAllInterviews
 * @description Get all interviews
 * @access Private
 * @route GET /api/v1/interviews
 * @returns {Object}
 */
const getAllInterviews = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 3
  const skip = (page - 1) * limit

  const interviews = await Interview.find({ userId: req.user?._id })
    .select("-userId -questionsAndAnswers")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })

  const total = await Interview.countDocuments({ userId: req.user?._id })
  const hasMore = total > skip + interviews.length

  res.status(200).json(
    new ApiResponse(200, "Interview fetched successfully", {
      interviews,
      hasMore,
      total,
      currentPage: page,
    })
  )
})

/**
 * @function getInterviewById
 * @description Get interview by id
 * @access Private
 * @route GET /api/v1/interviews/:id
 * @returns {Object}
 */
const getInterviewById = asyncHandler(async (req, res) => {
  const { id } = req.params

  const interview = await Interview.findById(id)
  res
    .status(200)
    .json(new ApiResponse(200, "Interview fetched successfully", interview))
})

/**
 * @function endInterview
 * @description End interview
 * @access Private
 * @route PUT /api/v1/interviews/:id
 * @returns {Object}
 */
const endInterview = asyncHandler(async (req, res) => {
  const { id } = req.params
  const userId = req.user._id

  const feedbackExists = await Feedback.findOne({
    userId,
    interviewId: id,
  })

  if (!feedbackExists) {
    throw new ApiError(404, "Please attempt at least one question")
  }

  await Interview.findOneAndUpdate(
    { _id: id, userId },
    {
      $set: {
        isCompleted: true,
      },
    }
  )

  res.status(200).json(new ApiResponse(200, "Interview ended successfully"))
})

export { createInterview, getAllInterviews, getInterviewById, endInterview }
