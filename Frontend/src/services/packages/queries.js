import axiosInstance from "@/utils/axiosInstance"
import { useQuery } from "@tanstack/react-query"

const useGetAllPackages = () => {
    return useQuery({
        queryKey: ["get-all-packages"],
        queryFn: async () => {
            const response = await axiosInstance.get("/packages")
            console.log(response)
            return response?.data?.data
        },
        staleTime: 1000 * 60 * 30, // 30 minutes
    })
}

export { useGetAllPackages }