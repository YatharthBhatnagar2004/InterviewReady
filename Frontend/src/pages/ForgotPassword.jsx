import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { useForgotPassword } from "@/services/auth/mutations"
import ReCAPTCHA from "react-google-recaptcha"
import { useRef } from "react"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  // reCaptcha: z.string().min(1, { message: "ReCaptcha is required" }),
})

const ForgotPassword = () => {
  const { mutate: forgotPassword, isPending } = useForgotPassword()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      // reCaptcha: "",
    },
  })

  // const recaptchaRef = useRef(null)

  const onSubmit = (data) => {
    forgotPassword(data, {
      onSuccess: () => {
        form.reset()
      },
      // onSettled: () => {
      //   form.setValue("reCaptcha", "")
      //   recaptchaRef.current?.reset()
      // },
    })
  }
  return (
    <div className="bg-gradient-to-r from-gray-100 to-indigo-300 flex items-center justify-center h-screen">
      <Card className="w-[450px]">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent">
            Forgot Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                // name="reCaptcha"
                render={({ field }) => (
                  <FormItem>
                    {/* <ReCAPTCHA
                      sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                      ref={recaptchaRef}
                      onChange={() =>
                        field.onChange(recaptchaRef.current.getValue())
                      }
                    /> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-gray-700 to-indigo-700 w-full hover:scale-105 transition-transform"
                disabled={isPending}
              >
                Reset Password
                <ArrowRightIcon />
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-center">
          <Link
            to="/login"
            className="font-semibold text-sm text-indigo-700 flex items-center hover:scale-105 transition-transform"
          >
            <ArrowLeftIcon className="me-2 h-4 w-4" />
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ForgotPassword
