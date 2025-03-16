import { useAuth } from "@/context/AuthContext"
import { Navigate } from "react-router-dom"

const ProtectedRouter = ({ children }) => {
  const { data } = useAuth()

  if (!data) return <Navigate to="/login" replace />

  return children
}

export default ProtectedRouter
