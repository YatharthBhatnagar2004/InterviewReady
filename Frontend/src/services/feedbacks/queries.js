import axiosInstance from "@/utils/axiosInstance"
import { useQuery } from "@tanstack/react-query"

const useGetFeedbackById = (id) => {
    return useQuery({
        queryKey: ["get-feedback-by-id", id],
        queryFn: async () => {
            const response = await axiosInstance.get(`/feedbacks/${id}`)
            return response?.data?.data
        },
        staleTime: 1000 * 60 * 30, // 30 minutes
    })
}

export { useGetFeedbackById }