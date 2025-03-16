import Loader from "@/components/custom/Loader"
import Navbar from "@/components/custom/Navbar"
import WebCam from "@/components/custom/WebCam"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetInterviewById } from "@/services/interviews/queries"
import { ArrowRightIcon, WebcamIcon } from "lucide-react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"

const InterviewDetail = () => {
  const { id } = useParams()
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(false)
  const { isLoading, data } = useGetInterviewById(id)

  if (isLoading) return <Loader />
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="my-10 bg-white shadow-lg rounded-xl p-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent">
              Ready to Start Your Interview?
            </h2>
            <p className="mt-4 text-gray-600">
              Please enable your webcam to begin the interview process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent">
                  Position Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm text-gray-500">Role</label>
                        <p className="text-lg font-semibold text-gray-800">
                          {data?.jobRole}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm text-gray-500">
                          Experience
                        </label>
                        <p className="text-lg font-semibold text-gray-800">
                          {data?.jobExperience}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm text-gray-500">
                          Tech Stack
                        </label>
                        <p className="text-lg font-semibold text-gray-800">
                          {data?.jobDescription}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm text-gray-500">
                          Difficulty Level
                        </label>
                        <p className="text-lg font-semibold text-gray-800">
                          {data?.difficulty.toUpperCase()}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm text-gray-500">
                          No. of Questions
                        </label>
                        <p className="text-lg font-semibold text-gray-800">
                          {data?.noOfQuestions}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="h-full flex flex-col items-center justify-center space-y-6">
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
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">
                      Webcam Status:{" "}
                      {isWebcamEnabled ? (
                        <span className="text-indigo-700">Enabled</span>
                      ) : (
                        <span className="text-red-500">Disabled</span>
                      )}
                    </p>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full hover:scale-105 transition-transform border-indigo-700 text-indigo-700 hover:bg-gradient-to-r from-gray-700 to-indigo-700 hover:text-white hover:border-none"
                      onClick={() => setIsWebcamEnabled(true)}
                      disabled={isWebcamEnabled}
                    >
                      Enable Webcam
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button
              size="lg"
              disabled={!isWebcamEnabled}
              className="hover:scale-105 transition-transform bg-gradient-to-r from-gray-700 to-indigo-700"
            >
              <Link to={`/dashboard/interview/start/${id}`}>
                Start Interview
              </Link>
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default InterviewDetail
