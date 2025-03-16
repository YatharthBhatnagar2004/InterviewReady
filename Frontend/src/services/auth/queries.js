import axiosInstance from "@/utils/axiosInstance"
import { useQuery } from "@tanstack/react-query"

const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/current-user")
      return response?.data?.data
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
  })
}

export { useGetCurrentUser }
