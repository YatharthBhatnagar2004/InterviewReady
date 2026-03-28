import asyncHandler from "express-async-handler"
import Feedback from "../models/feedback.model.js"
import ApiResponse from "../utils/ApiResponse.js"
import createChatSession from "../utils/geminiai.js"
import ApiError from "../utils/ApiError.js"

const parseFeedback = (rawText) => {
  if (typeof rawText !== "string") return null

  const cleaned = rawText.trim().replace(/^```json\s*/i, "").replace(/```$/i, "")
  const startIndex = cleaned.indexOf("{")
  const endIndex = cleaned.lastIndexOf("}")

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    return null
  }

  const parsed = JSON.parse(cleaned.slice(startIndex, endIndex + 1))
  if (typeof parsed?.feedback !== "string") return null

  const rating = Number(parsed?.rating)
  if (Number.isNaN(rating) || rating < 0 || rating > 5) return null

  return {
    rating,
    feedback: parsed.feedback.trim(),
  }
}

/**
 * @function createFeedback
 * @description Create a feedback
 * @access Private
 * @route POST /api/v1/feedbacks
 * @returns {Object}
 */
const createFeedback = asyncHandler(async (req, res) => {
  const { interviewId, questionId } = req.query
  const { question, userAnswer } = req.body

  const prompt = `
    Question: ${question}
    User Answer: ${userAnswer},
    Based on the question and the user’s answer, please provide a rating (0 to 5) and feedback for improvement in the following JSON format:
    {
      "rating": <0-5>,
      "feedback": "<Provide constructive feedback on how to improve the answer. Limit the feedback to 3-5 lines.>"
    }
    Make sure the rating is a number between 0 and 5, and the feedback is clear and actionable.
  `

  const chatSession = createChatSession()
  const result = await chatSession.sendMessage(prompt)
  const responseText = result?.response?.text?.() || ""
  const feedback = parseFeedback(responseText)

  if (!feedback) {
    throw new ApiError(
      502,
      "Unable to generate feedback at the moment. Please try again."
    )
  }

  // *Check if feedback already exists
  const feedbackExists = await Feedback.findOne({
    userId: req.user._id,
    interviewId,
  })

  if (feedbackExists) {
    // *Check if question already exists
    const questionExists = feedbackExists.feedbacks.find(
      (feedback) => feedback.questionId.toString() === questionId
    )

    if (questionExists) {
      throw new ApiError(400, "Feedback for this question already exists")
    }

    // *Update feedback
    feedbackExists.feedbacks.push({
      questionId,
      userAnswer,
      rating: feedback.rating,
      feedback: feedback.feedback,
    })

    await feedbackExists.save()
  } else {
    // *Create feedback
    await Feedback.create({
      userId: req.user._id,
      interviewId,
      feedbacks: [
        {
          questionId,
          userAnswer,
          rating: feedback.rating,
          feedback: feedback.feedback,
        },
      ],
    })
  }

  res.status(201).json(new ApiResponse(201, "Answer saved successfully"))
})

/**
 * @function getFeedbackById
 * @description Get feedback by id
 * @access Private
 * @route GET /api/v1/feedbacks/:id
 * @returns {Object}
 */
const getFeedbackById = asyncHandler(async (req, res) => {
  const { id } = req.params

  // *Check if feedback exists
  const feedback = await Feedback.findOne({
    userId: req.user?._id,
    interviewId: id,
  })
  .populate({
    path: "interviewId",
    select: "questionsAndAnswers",
  })
  .lean();
  
  const result = feedback?.feedbacks?.map((item) => {
    const questionAnswer = feedback?.interviewId?.questionsAndAnswers?.find(
      (qa) => qa?._id.toString() === item?.questionId.toString()
    )

    return {
      question: questionAnswer?.question,
      answer: questionAnswer?.answer,
      userAnswer: item?.userAnswer,
      rating: item?.rating,
      feedback: item?.feedback,
    }
  })

  res
    .status(200)
    .json(new ApiResponse(200, "Feedback fetched successfully", result))
})

export { createFeedback, getFeedbackById }
