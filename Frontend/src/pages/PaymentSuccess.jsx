import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowRightIcon, Check } from "lucide-react"
import { Link } from "react-router-dom"

const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-green-200">
      <Card className="w-[450px] m-auto">
        <CardHeader className="space-y-3">
          <div className="rounded-full w-16 h-16 bg-green-500 mx-auto flex items-center justify-center">
            <Check className="h-12 w-12 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-500 text-center">
            Payment Successful!
          </CardTitle>
          <CardDescription className="text-center">
            Thank you for your payment. Your transaction has been processed
            successfully.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Link to="/dashboard">
            <Button className="bg-green-500 hover:scale-105 transition-transform hover:bg-green-600">
              Go to Dashboard
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PaymentSuccess
