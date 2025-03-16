import axiosInstance from "@/utils/axiosInstance"
import { useQuery, useInfiniteQuery } from "@tanstack/react-query"

const useGetInterviewById = (id) => {
  return useQuery({
    queryKey: ["get-interview-by-id", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/interviews/${id}`)
      return response?.data?.data
    },
  })
}

const useGetAllInterviews = () => {
  return useInfiniteQuery({
    queryKey: ["get-all-interviews"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axiosInstance.get(
        `/interviews?page=${pageParam}&limit=3`
      )
      return response?.data?.data
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
  })
}

export { useGetInterviewById, useGetAllInterviews }
