import Navbar from "@/components/custom/Navbar"
import Packages from "@/components/custom/Packages"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowRightIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { stats, features } from "@/utils/constants"

const Home = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-100 to-indigo-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center py-24 space-y-6">
            <Badge
              className="p-4 text-sm hover:scale-105 transition-transform cursor-default"
              variant="secondary"
            >
              🎯 Land Your Dream Job with Ease
            </Badge>
            <h2 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent">
              Refine your interview techniques with AI-powered coaching.
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Practice effectively, get expert feedback, and stand out in every interview.  
            </p>
            <Link to="/signup" className="block">
              <Button
                size="lg"
                className="hover:scale-105 transition-transform bg-gradient-to-r from-gray-700 to-indigo-700"
              >
                Start Practice Interview
                <ArrowRightIcon />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats?.map((stat, index) => (
              <Card
                key={index}
                className="hover:scale-105 transition-transform"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      {stat?.icon}
                    </div>

                    <div>
                      <p className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent">
                        {stat?.value}
                      </p>
                      <p className="text-gray-600">{stat?.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-24">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent">
          Why Choose Our Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features?.map((feature, index) => (
            <Card
              key={index}
              className="hover:scale-105 transition-transform text-center"
            >
              <CardHeader className="space-y-4">
                <div className="h-12 w-12 mx-auto rounded-full bg-indigo-100 flex items-center justify-center">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-gray-600 text-md">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <Packages />

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-100 to-indigo-300">
        <Card className="rounded-none border-none bg-transparent py-24">
          <CardContent className="pb-0">
            <div className="text-center relative z-10 space-y-6">
              <h2 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-700 to-indigo-700 bg-clip-text text-transparent">
                Ready to Ace Your Next Interview?
              </h2>
              <p className="text-xl text-gray-600">
                Start practicing now and build your confidence with our AI
                interviewer
              </p>
              <Link to="/signup" className="block">
                <Button
                  size="lg"
                  className="hover:scale-105 transition-transform bg-gradient-to-r from-gray-700 to-indigo-700"
                >
                  Begin Free Practice
                  <ArrowRightIcon />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Home
