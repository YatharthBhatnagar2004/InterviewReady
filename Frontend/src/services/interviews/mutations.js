import axiosInstance from "@/utils/axiosInstance"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

const useCreateInterview = () => {
  return useMutation({
    mutationFn: (data) => {
      return axiosInstance.post("/interviews", data)
    },
    onSuccess: (response) => {
      toast.success(response?.data?.message)
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong")
    },
  })
}

const useEndInterview = () => {
  return useMutation({
    mutationFn: (id) => {
      return axiosInstance.put(`/interviews/${id}`)
    },
    onSuccess: (response) => {
      toast.success(response?.data?.message)
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong")
    },
  })
}

export { useCreateInterview, useEndInterview }
