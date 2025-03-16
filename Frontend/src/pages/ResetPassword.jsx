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
import { Link, useNavigate, useParams } from "react-router-dom"
import { useResetPassword } from "@/services/auth/mutations"
import ReCAPTCHA from "react-google-recaptcha"
import { useRef } from "react"

const formSchema = z.object({
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(50, { message: "Password must be at most 50 characters long" }),
  // reCaptcha: z.string().min(1, { message: "ReCaptcha is required" }),
})

const ResetPassword = () => {
  const navigate = useNavigate()
  const { resetPasswordToken } = useParams()
  const { mutate: resetPassword, isPending } = useResetPassword()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      // reCaptcha: "",
    },
  })

  // const recaptchaRef = useRef(null)

  const onSubmit = (data) => {
    resetPassword(
      { ...data, resetPasswordToken },
      {
        onSuccess: () => {
          navigate("/login", { replace: true })
        },
        // onSettled: () => {
        //   form.setValue("reCaptcha", "")
        //   recaptchaRef.current?.reset()
        // },
      }
    )
  }

  return (
    <div className="bg-gradient-to-r from-gray-100 to-indigo-300 flex items-center justify-center h-screen">
      <Card className="w-[450px]">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent">
            Reset Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reCaptcha"
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
                Submit
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

export default ResetPassword
