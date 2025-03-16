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
import { ArrowRightIcon } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useLogin } from "@/services/auth/mutations"
import { useQueryClient } from "@tanstack/react-query"
import ReCAPTCHA from "react-google-recaptcha"
import { useRef } from "react"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(50, { message: "Password must be at most 50 characters long" }),
  // reCaptcha: z.string().min(1, { message: "reCaptcha is required" }),
})

const Login = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate: login, isPending } = useLogin()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      // reCaptcha: "",
    },
  })

  // const recaptchaRef = useRef(null)

  const onSubmit = (data) => {
    login(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(["current-user"])
        navigate("/dashboard")
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
            Welcome Back
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      {/* <Link
                        to="/forgot-password"
                        className="text-sm text-indigo-700 font-semibold"
                      >
                        Forgot Password?
                      </Link> */}
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
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
                Log In
                <ArrowRightIcon />
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-gray-600">
            {`Don't`} have an account?{" "}
            <Link to="/signup" className="font-semibold text-indigo-700">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
