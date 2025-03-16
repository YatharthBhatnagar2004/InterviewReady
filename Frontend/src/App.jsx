import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import Router from "@/routes/Router"
import { Toaster } from "react-hot-toast"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { AuthProvider } from "./context/AuthContext"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
          <Toaster />
          <ReactQueryDevtools initialIsOpen />
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
