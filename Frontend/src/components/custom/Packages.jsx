import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { CheckIcon } from "lucide-react"
import { Button } from "../ui/button"
import { useGetAllPackages } from "@/services/packages/queries"
import { Skeleton } from "@/components/ui/skeleton"

const Packages = () => {
  const { isPending, data: packages } = useGetAllPackages()

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-24">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent">
        Choose Your Interview Package
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {isPending || !packages
          ? [1, 2, 3].map((index) => (
              <Card key={index} className="h-full flex flex-col">
                <CardHeader className="space-y-4">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-8 w-1/2" />
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
                <CardFooter className="mt-auto">
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))
          : packages.map((pkg) => (
              <Card key={pkg.id} className="h-full flex flex-col hover:scale-105 transition-transform">
                <CardHeader>
                  <CardTitle className="text-2xl bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent">
                    {pkg.name}
                  </CardTitle>
                  <p className="text-3xl font-bold mt-4 bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent">
                    ₹{pkg.price}
                  </p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-4">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="rounded-full bg-indigo-100 p-1">
                          <CheckIcon className="h-4 w-4 text-indigo-700" />
                        </div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button
                    size="lg"
                    className="hover:scale-105 transition-transform bg-gradient-to-r from-gray-700 to-indigo-700 w-full"
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            ))}
      </div>
    </div>
  )
}

export default Packages
