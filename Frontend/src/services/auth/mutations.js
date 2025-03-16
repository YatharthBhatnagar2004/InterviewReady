import axiosInstance from "@/utils/axiosInstance"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

const useRegister = () => {
  return useMutation({
    mutationFn: (data) => {
      return axiosInstance.post("/auth/register", data)
    },
    onSuccess: (response) => {
      toast.success(response?.data?.message)
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong")
    },
  })
}

const useLogin = () => {
  return useMutation({
    mutationFn: (data) => {
      return axiosInstance.post("/auth/login", data)
    },
    onSuccess: (response) => {
      toast.success(response?.data?.message)
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong")
    },
  })
}

const useLogout = () => {
  return useMutation({
    mutationFn: () => {
      return axiosInstance.post("/auth/logout")
    },
    onSuccess: (response) => {
      toast.success(response?.data?.message)
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong")
    },
  })
}

const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data) => {
      return axiosInstance.post("/auth/forgot-password", data)
    },
    onSuccess: (response) => {
      toast.success(response?.data?.message)
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong")
    },
  })
}

const useResetPassword = () => {
  return useMutation({
    mutationFn: (data) => {
      return axiosInstance.post(
        `/auth/reset-password/${data.resetPasswordToken}`,
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

export { useRegister, useLogin, useLogout, useForgotPassword, useResetPassword }
