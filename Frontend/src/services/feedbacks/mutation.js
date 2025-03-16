import axiosInstance from "@/utils/axiosInstance"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

const useCreateFeedback = () => {
  return useMutation({
    mutationFn: (data) => {
      return axiosInstance.post(
        `/feedbacks?interviewId=${data.interviewId}&questionId=${data.questionId}`,
        data
      )
    },
    onSuccess: (response) => {
      toast.success(response?.data?.message)
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong")
    },
  })
}

export { useCreateFeedback }
