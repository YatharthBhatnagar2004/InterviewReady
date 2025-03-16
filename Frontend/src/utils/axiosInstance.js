import axios from "axios"
// base url
const BASE_URL = "https://interviewready.onrender.com/api/v1"

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

export default axiosInstance
