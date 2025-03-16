import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowRightIcon, X } from "lucide-react"
import { Link } from "react-router-dom"

const PaymentFailure = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-red-200">
      <Card className="w-[450px] m-auto">
        <CardHeader className="space-y-3">
          <div className="rounded-full w-16 h-16 bg-red-500 mx-auto flex items-center justify-center">
            <X className="h-12 w-12 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-500 text-center">
            Payment Failed!
          </CardTitle>
          <CardDescription className="text-center">
          Unfortunately, your payment could not be processed. Please try again later.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Link to="/dashboard/pricing">
            <Button className="bg-red-500 hover:scale-105 transition-transform hover:bg-red-600">
              Try Again
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PaymentFailure
