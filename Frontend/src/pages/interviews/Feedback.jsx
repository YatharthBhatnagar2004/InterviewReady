import Navbar from "@/components/custom/Navbar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetFeedbackById } from "@/services/feedbacks/queries"
import { useParams } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const RatingBadge = ({ rating }) => {
  const getRatingColor = (rating) => {
    if (rating >= 4) return "bg-green-500"
    if (rating >= 2) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Badge className={`${getRatingColor(rating)} text-white`}>
      Rating: {rating}/5
    </Badge>
  )
}

const Feedback = () => {
  const { id } = useParams()
  const { isLoading, data } = useGetFeedbackById(id)
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="my-10 bg-white shadow-lg rounded-xl p-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent mb-4">
              Interview Feedback
            </h2>
            <p className="text-gray-600">
              Review your answers and detailed feedback below
            </p>
          </div>
          {isLoading || !data ? (
            <Accordion type="single" collapsible className="w-full">
              {[1, 2, 3].map((index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger>
                    <Skeleton className="h-8 w-1/2" />
                  </AccordionTrigger>
                  <AccordionContent>
                    <Skeleton className="h-8 w-full" />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <Accordion type="single" collapsible className="w-full space-y-4">
              {data.map((feedback, index) => (
                <Card
                  key={index}
                  className="w-full hover:scale-105 transition-transform"
                >
                  <Accordion type="single" collapsible>
                    <AccordionItem value={`item-${index + 1}`}>
                      <AccordionTrigger className="px-6 hover:no-underline focus:no-underline">
                        <div className="flex flex-wrap items-center gap-4">
                          <span>Question {index + 1}:</span>
                          <span className="font-medium text-left">
                            {feedback?.question}
                          </span>
                          <RatingBadge rating={feedback?.rating} />
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        <div className="space-y-6">
                          <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="font-medium mb-2">Your Answer:</p>
                            <p className="text-gray-700 leading-relaxed">
                              {feedback?.userAnswer}
                            </p>
                          </div>

                          <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="font-medium mb-2">Correct Answer:</p>
                            <p className="text-gray-700 leading-relaxed">
                              {feedback?.answer}
                            </p>
                          </div>

                          <div className="bg-blue-100 border-l-4 border-blue-500 pl-4 py-2 rounded-lg">
                            <p className="font-medium mb-2">Feedback:</p>
                            <p className="text-gray-700 leading-relaxed">
                              {feedback?.feedback}
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              ))}
            </Accordion>
          )}
        </div>
      </main>
    </>
  )
}

export default Feedback
