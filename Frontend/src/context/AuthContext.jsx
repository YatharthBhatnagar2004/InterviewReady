import { createContext, useContext } from "react"
import { useGetCurrentUser } from "@/services/auth/queries"
import Loader from "@/components/custom/Loader"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const { data, isLoading } = useGetCurrentUser()

  if (isLoading) return <Loader />

  return (
    <AuthContext.Provider value={{ data }}>{children}</AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
