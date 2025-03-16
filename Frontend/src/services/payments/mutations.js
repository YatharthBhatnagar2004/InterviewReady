import axiosInstance from "@/utils/axiosInstance"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { loadStripe } from "@stripe/stripe-js"

const useMakePayment = () => {
    return useMutation({
        mutationFn: (data) => {
            return axiosInstance.post("/payments/create-checkout-session", data)
        },
        onSuccess: async (response) => {
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
            await stripe.redirectToCheckout({ sessionId: response?.data?.data })
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something went wrong")
        },
    })
}

export { useMakePayment }