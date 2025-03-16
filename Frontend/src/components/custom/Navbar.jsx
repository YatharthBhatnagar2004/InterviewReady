import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useLogout } from "@/services/auth/mutations"
import Loader from "@/components/custom/Loader"
import { useQueryClient } from "@tanstack/react-query"
import { useAuth } from "@/context/AuthContext"

const Navbar = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data } = useAuth()
  const { mutate: logout, isPending } = useLogout()
  const handleLogout = () => {
    logout("", {
      onSuccess: () => {
        queryClient.setQueriesData(["current-user"], null)
        queryClient.clear()
        navigate("/login", { replace: true })
      },
    })
  }

  if (isPending) return <Loader />
  return (
    <div className="sticky top-0 z-50 bg-white/50 backdrop-blur-sm shadow-sm py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-md md:text-3xl font-bold bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent">
            InterviewReady
          </h1>
          {data ? (
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="hover:scale-105 text-md font-medium transition-transform bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent"
              >
                Dashboard
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <Avatar>
                    <AvatarFallback className="text-xl bg-indigo-100 text-indigo-700">
                      {data?.fullName?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    Welcome, {data?.fullName}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/dashboard/profile">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/signup"
                className="hover:scale-105 text-md font-medium transition-transform bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent"
              >
                Sign Up
              </Link>
              <Link to="/login">
                <Button
                  size="lg"
                  className="hover:scale-105 transition-transform bg-gradient-to-r from-gray-700 to-indigo-700"
                >
                  <Mail /> Log In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
