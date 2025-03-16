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
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon, Coins } from "lucide-react"
import { Button } from "../ui/button"
import { useCreateInterview } from "@/services/interviews/mutations"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { useQueryClient } from "@tanstack/react-query"

const formSchema = z.object({
  jobRole: z
    .string()
    .min(3, { message: "Job role must be at least 3 characters long" })
    .max(50, { message: "Job role must be at most 50 characters long" }),
  jobExperience: z.string().min(1, { message: "Job experience is required" }),
  noOfQuestions: z
    .string()
    .min(1, { message: "Number of questions is required" }),
  difficulty: z.string().min(1, { message: "Difficulty is required" }),
  jobDescription: z
    .string({ required_error: "Job description is required" })
    .min(3, { message: "Job description must be at least 3 characters long" })
    .max(100, {
      message: "Job description must be at most 100 characters long",
    }),
})

const CreateInterview = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data } = useAuth()
  const { mutate: createInterview, isPending } = useCreateInterview()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobRole: "",
      jobExperience: "",
      noOfQuestions: "10",
      difficulty: "easy",
      jobDescription: "",
    },
  })

  const onSubmit = (data) => {
    createInterview(data, {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["get-all-interviews", "current-user"])
        navigate(`/dashboard/interview/${response?.data?.data}`, {
          replace: true,
        })
      }
    })
  }
  return (
    <div className="bg-gradient-to-r from-gray-100 to-indigo-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center py-24 space-y-6">
          <Badge
            className="p-4 text-sm hover:scale-105 transition-transform cursor-default"
            variant="secondary"
          >
            🚀 Elevate Your Interview Performance
          </Badge>
          <h2 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent">
            Welcome to InterviewReady
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Create and Start your Interview
          </p>
          <div className="flex items-center justify-center gap-2 text-xl text-gray-600">
            <Coins className="h-6 w-6 text-indigo-700" />
            <span>Credits Available: {data?.credits}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/dashboard/pricing">
              <Button
                type="submit"
                size="lg"
                variant="outline"
                className="hover:scale-105 transition-transform border-indigo-700 text-indigo-700 hover:bg-gradient-to-r from-gray-700 to-indigo-700 hover:text-white hover:border-none"
              >
                Get More Credits
              </Button>
            </Link>
            <Dialog>
              <DialogTrigger className="outline-none">
                <Button
                  size="lg"
                  className="hover:scale-105 transition-transform bg-gradient-to-r from-gray-700 to-indigo-700"
                >
                  Start Mock Interview
                  <ArrowRightIcon />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent mb-6">
                    Tell us more about your job interview
                  </DialogTitle>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="jobRole"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Role</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ex. Full Stack Developer"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="jobExperience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Experience</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex. 5" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="noOfQuestions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>No. of Questions</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select No. of Questions" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="15">15</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="difficulty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Difficulty Level</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Difficulty Level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="jobDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Description (In Short)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Ex. React.js, Node.js, Express.js and MongoDB"
                                {...field}
                              />
                            </FormControl>
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
                        Start Mock Interview
                        <ArrowRightIcon />
                      </Button>
                    </form>
                  </Form>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateInterview
