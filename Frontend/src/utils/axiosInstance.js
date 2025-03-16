import axios from "axios"
// base url
const BASE_URL = "http://localhost:8000/api/v1"

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

export default axiosInstance
