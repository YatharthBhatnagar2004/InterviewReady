import { useAuth } from "@/context/AuthContext"
import { Navigate } from "react-router-dom"

const PublicRouter = ({ children }) => {
  const { data } = useAuth()

  if (data) return <Navigate to="/dashboard" replace />

  return children
}

export default PublicRouter
