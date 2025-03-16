import Navbar from "@/components/custom/Navbar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowRightIcon, RefreshCcw } from "lucide-react"
import { Link } from "react-router-dom"
import { useGetAllInterviews } from "@/services/interviews/queries"
import CreateInterview from "@/components/custom/CreateInterview"
import { Skeleton } from "@/components/ui/skeleton"

const Dashboard = () => {
  const { isPending, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetAllInterviews()

  // Flatten all interviews from all pages
  const allInterviews = data?.pages?.flatMap(page => page.interviews) || []

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Create Interview */}
      <CreateInterview />

      {/* Previous Mock Interviews */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-24">
        <h2 className="inline-block text-2xl md:text-3xl font-bold mb-12 bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent">
          Previous Mock Interview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isPending ? (
            [1, 2, 3].map((index) => (
              <Card
                key={index}
                className="hover:scale-105 transition-transform"
              >
                <CardHeader className="space-y-4">
                  <Skeleton className="h-8 w-full" />
                  <CardDescription className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </CardDescription>
                </CardHeader>
                <CardFooter className="block">
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))
          ) : allInterviews.length === 0 ? (
            <div className="col-span-3">
              <Card className="hover:scale-105 transition-transform">
                <CardHeader>
                  <CardTitle className="text-gray-500 text-md tracking-normal text-center">
                    No Previous Interviews Found
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
          ) : (
            <>
              {allInterviews.map((interview) => (
                <Card
                  key={interview?._id}
                  className="hover:scale-105 transition-transform"
                >
                  <CardHeader className="space-y-4">
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent">
                      {interview?.jobRole}
                    </CardTitle>
                    <CardDescription className="space-y-2">
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm text-gray-500">Role</label>
                        <p className="text-lg font-semibold text-gray-800">
                          {interview?.jobRole}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm text-gray-500">
                          Experience
                        </label>
                        <p className="text-lg font-semibold text-gray-800">
                          {interview?.jobExperience}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm text-gray-500">
                          Tech Stack
                        </label>
                        <p className="text-lg font-semibold text-gray-800">
                          {interview?.jobDescription}
                        </p>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="block">
                    {interview?.isCompleted ? (
                      <Link to={`/dashboard/feedback/${interview?._id}`}>
                        <Button
                          size="lg"
                          variant="outline"
                          className="hover:scale-105 transition-transform border-indigo-700 text-indigo-700 hover:bg-gradient-to-r from-gray-700 to-indigo-700 hover:text-white w-full hover:border-none"
                        >
                          Feedback
                        </Button>
                      </Link>
                    ) : (
                      <Link to={`/dashboard/interview/${interview?._id}`}>
                        <Button
                          size="lg"
                          className="hover:scale-105 transition-transform bg-gradient-to-r from-gray-700 to-indigo-700 w-full"
                        >
                          Start
                          <ArrowRightIcon />
                        </Button>
                      </Link>
                    )}
                  </CardFooter>
                </Card>
              ))}
              {hasNextPage && (
                <div className="col-span-full flex justify-center mt-8">
                  <Button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    variant="outline"
                    size="lg"
                    className="hover:scale-105 transition-transform border-indigo-700 text-indigo-700 hover:bg-gradient-to-r from-gray-700 to-indigo-700 hover:text-white hover:border-none"
                  >
                    {isFetchingNextPage
                      ? "Loading more..."
                      : "Load More Interviews"}
                      <RefreshCcw />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-100 to-indigo-300">
        <Card className="rounded-none border-none bg-transparent py-24">
          <CardContent className="pb-0">
            <div className="text-center relative z-10 space-y-6">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent">
                Buy Your First Interview
              </h2>
              <p className="text-xl text-gray-600">
                Start practicing now and build your confidence with our AI
                interviewer
              </p>
              <Link to="/dashboard/pricing" className="block">
                <Button
                  size="lg"
                  className="hover:scale-105 transition-transform bg-gradient-to-r from-gray-700 to-indigo-700"
                >
                  Buy Now
                  <ArrowRightIcon />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Dashboard