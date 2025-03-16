import { useEffect, useState } from "react"
import Navbar from "@/components/custom/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Mic,
  Clock,
  ChevronLeft,
  ChevronRight,
  Timer,
  WebcamIcon,
} from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { useGetInterviewById } from "@/services/interviews/queries"
import Loader from "@/components/custom/Loader"
import WebCam from "@/components/custom/WebCam"
import useSpeechToText from "react-hook-speech-to-text"
import toast from "react-hot-toast"
import { useCreateFeedback } from "@/services/feedbacks/mutation"
import { useEndInterview } from "@/services/interviews/mutations"

const Interview = () => {
  const { isRecording, results, startSpeechToText, stopSpeechToText } =
    useSpeechToText({
      continuous: true,
      useLegacyResults: false,
    })
  const [userAnswer, setUserAnswer] = useState("")
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(false)
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const { id } = useParams()
  const navigate = useNavigate()
  const { isLoading, data: interview } = useGetInterviewById(id)
  const { mutate: createFeedback, isPending } = useCreateFeedback()
  const { mutate: endInterview, isPending: isEndingInterview } =
    useEndInterview()

  const progress =
    ((activeQuestionIndex + 1) / interview?.questionsAndAnswers.length) * 100

  // Calculate which questions to show in navigation
  const QUESTIONS_PER_PAGE = 5
  const currentPage = Math.floor(activeQuestionIndex / QUESTIONS_PER_PAGE)
  const startIndex = currentPage * QUESTIONS_PER_PAGE
  const endIndex = Math.min(
    startIndex + QUESTIONS_PER_PAGE,
    interview?.questionsAndAnswers.length
  )
  const visibleQuestions = interview?.questionsAndAnswers.slice(
    startIndex,
    endIndex
  )
  const totalPages = Math.ceil(
    interview?.questionsAndAnswers.length / QUESTIONS_PER_PAGE
  )

  useEffect(() => {
    results.map((result) => setUserAnswer(result?.transcript))
  }, [results])

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      createFeedback(
        {
          interviewId: id,
          questionId: interview?.questionsAndAnswers[activeQuestionIndex]?._id,
          question:
            interview?.questionsAndAnswers[activeQuestionIndex]?.question,
          userAnswer,
        },
        {
          onSuccess: () => {
            toast.success("You have moved to the next question")
            if (
              activeQuestionIndex !==
              interview?.questionsAndAnswers.length - 1
            ) {
              setActiveQuestionIndex((prev) => prev + 1)
            }
            setUserAnswer("")
          },
        }
      )
    }
  }, [isRecording, userAnswer])

  const handleEndInterview = () => {
    endInterview(id, {
      onSuccess: () => {
        navigate(`/dashboard/feedback/${id}`, { replace: true })
      },
    })
  }
  
  if (isLoading || isPending || isEndingInterview) return <Loader />

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 mb-6 bg-indigo-100 rounded-full">
            <Timer className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-600">
              Technical Interview in Progress
            </span>
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent mb-6">
            {interview.jobRole} Interview
          </h1>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span className="font-medium">
                Question {activeQuestionIndex + 1} of{" "}
                {interview.questionsAndAnswers.length}
              </span>
            </div>
          </div>

          <Progress value={progress} className="h-2 bg-gray-100" />
        </div>

        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-7">
          {/* Question Navigator */}
          <Card className="lg:col-span-2 h-fit">
            <CardContent className="p-4">
              <div className="space-y-2">
                {/* Page Navigation */}
                {totalPages > 1 && (
                  <div className="flex justify-between items-center mb-4 pb-2 border-b">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={currentPage === 0}
                      onClick={() =>
                        setActiveQuestionIndex(startIndex - QUESTIONS_PER_PAGE)
                      }
                      className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-gray-600">
                      Page {currentPage + 1} of {totalPages}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={currentPage === totalPages - 1}
                      onClick={() =>
                        setActiveQuestionIndex(startIndex + QUESTIONS_PER_PAGE)
                      }
                      className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                {/* Question Buttons */}
                {visibleQuestions.map((_, index) => {
                  const questionNumber = startIndex + index + 1
                  return (
                    <Button
                      key={index}
                      variant={
                        startIndex + index === activeQuestionIndex
                          ? "default"
                          : "ghost"
                      }
                      className={`w-full  ${
                        startIndex + index === activeQuestionIndex
                          ? "bg-gradient-to-r from-gray-700 to-indigo-700 text-white"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveQuestionIndex(startIndex + index)}
                    >
                      Question {questionNumber}
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Card className="lg:col-span-5">
            <CardContent className="p-6">
              {/* Question Display */}
              <div className="bg-gradient-to-r from-slate-100 to-gray-50 p-6 rounded-xl mb-8">
                <h3 className="text-xl font-semibold text-gray-800">
                  {interview.questionsAndAnswers[activeQuestionIndex].question}
                </h3>
              </div>

              {/* Recording Interface */}
              <div className="flex flex-col items-center gap-6">
                {isWebcamEnabled ? (
                  <WebCam
                    isWebcamEnabled={isWebcamEnabled}
                    setIsWebcamEnabled={setIsWebcamEnabled}
                  />
                ) : (
                  <div className="bg-indigo-100 w-32 h-32 rounded-full flex items-center justify-center transform transition-transform hover:scale-105">
                    <WebcamIcon className="h-20 w-20 text-indigo-700" />
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                  <Button
                    size="lg"
                    variant="outline"
                    className="hover:scale-105 transition-transform border-indigo-700 text-indigo-700 hover:bg-gradient-to-r from-gray-700 to-indigo-700 hover:text-white hover:border-none"
                    onClick={() => setIsWebcamEnabled(true)}
                    disabled={isWebcamEnabled}
                  >
                    Enable Webcam
                  </Button>
                  <Button
                    size="lg"
                    className={`hover:scale-105 transition-transform ${
                      isRecording
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-gradient-to-r from-gray-700 to-indigo-700"
                    }`}
                    disabled={!isWebcamEnabled}
                    onClick={isRecording ? stopSpeechToText : startSpeechToText}
                  >
                    {isRecording ? "Stop Recording" : "Start Recording"}
                    <Mic
                      className={`ml-2 h-5 w-5 ${
                        isRecording ? "animate-pulse" : ""
                      }`}
                    />
                  </Button>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-12 border-t pt-6">
                <Button
                  variant="ghost"
                  size="lg"
                  disabled={activeQuestionIndex === 0}
                  onClick={() => setActiveQuestionIndex((prev) => prev - 1)}
                  className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                {activeQuestionIndex ===
                interview.questionsAndAnswers.length - 1 ? (
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 text-white transition-all duration-300"
                    onClick={handleEndInterview}
                  >
                    End Interview
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setActiveQuestionIndex((prev) => prev + 1)}
                    className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Interview
