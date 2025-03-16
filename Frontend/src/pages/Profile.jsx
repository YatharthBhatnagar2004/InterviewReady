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
import { useUpdateProfile } from "@/services/users/mutations"
import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useAuth } from "@/context/AuthContext"
import ReCAPTCHA from "react-google-recaptcha"
import { useRef } from "react"

const formSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long" })
    .max(50, { message: "Full name must be at most 50 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().length(10, { message: "Invalid phone number" }),
  // reCaptcha: z.string().min(1, { message: "reCaptcha is required" }),
})

const Profile = () => {
  const queryClient = useQueryClient()
  const { data } = useAuth()
  const { mutate: updateProfile, isPending } = useUpdateProfile()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      // reCaptcha: "",
    },
  })

  // const recaptchaRef = useRef(null)

  useEffect(() => {
    if (data) {
      form.setValue("fullName", data?.fullName)
      form.setValue("email", data?.email)
      form.setValue("phone", data?.phone)
    }
  }, [data, form])

  const onSubmit = (data) => {
    updateProfile(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(["current-user"])
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
            Edit Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form} enctype="multipart/form-data">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
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

export default Profile
