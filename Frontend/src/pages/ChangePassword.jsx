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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"
import Navbar from "@/components/custom/Navbar"
import { useChangePassword } from "@/services/users/mutations"
import ReCAPTCHA from "react-google-recaptcha"
import { useRef } from "react"

const formSchema = z.object({
  oldPassword: z
    .string()
    .min(6, { message: "Old Password must be at least 6 characters long" })
    .max(50, { message: "Old Password must be at most 50 characters long" }),
  newPassword: z
    .string()
    .min(6, { message: "New Password must be at least 6 characters long" })
    .max(50, { message: "New Password must be at most 50 characters long" }),
  reCaptcha: z.string().min(1, { message: "ReCaptcha is required" }),
})

const ChangePassword = () => {
  const { mutate: changePassword, isPending } = useChangePassword()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      // reCaptcha: "",
    },
  })

  // const recaptchaRef = useRef(null)

  const onSubmit = (data) => {
    changePassword(data, {
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
    <>
      {/* Navbar */}
      <Navbar />

      <Card className="w-[450px] mx-auto my-24">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent">
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form} enctype="multipart/form-data">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your old password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                Save
                <ArrowRightIcon />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}

export default ChangePassword
