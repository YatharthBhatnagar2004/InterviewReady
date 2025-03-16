import { Loader2 } from "lucide-react"

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-slate-100 to-gray-50 z-50">
      <Loader2 className="animate-spin w-8 h-8 text-indigo-700" />
      <p className="ml-2 text-gray-600">Please Wait...</p>
    </div>
  )
}

export default Loader
