import axiosInstance from "@/utils/axiosInstance"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (data) => {
      return axiosInstance.put("/users/profile", data)
    },
    onSuccess: (response) => {
      toast.success(response?.data?.message)
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong")
    },
  })
}

const useChangePassword = () => {
  return useMutation({
    mutationFn: (data) => {
      return axiosInstance.put("/users/change-password", data)
    },
    onSuccess: (response) => {
      toast.success(response?.data?.message)
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong")
    },
  })
}

export { useUpdateProfile, useChangePassword }
