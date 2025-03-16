import { BrainIcon, CheckIcon, ClockIcon, StarIcon, TrophyIcon, UsersIcon } from "lucide-react"

const packages = [
  {
    name: "Starter",
    price: "Free",
    features: [
      "1 Interview",
      "15 Questions per Interview",
      "Detailed Feedback",
      "24/7 AI Availability",
    ],
  },
  {
    name: "Professional",
    price: "₹99",
    features: [
      "1 Interview",
      "15 Questions per Interview",
      "Detailed Feedback",
      "24/7 AI Availability",
    ],
  },
  {
    name: "Expert",
    price: "₹499",
    features: [
      "5 Interview",
      "15 Questions per Interview",
      "Detailed Feedback",
      "24/7 AI Availability",
    ],
  },
]

const stats = [
  {
    icon: <UsersIcon className="h-6 w-6 text-indigo-700" />,
    title: "Users",
    value: "1000+",
  },
  {
    icon: <ClockIcon className="h-6 w-6 text-indigo-700" />,
    title: "Practice Hours",
    value: "1000+",
  },
  {
    icon: <CheckIcon className="h-6 w-6 text-indigo-700" />,
    title: "Success Rate",
    value: "95%",
  },
]

const features = [
  {
    icon: <BrainIcon className="h-6 w-6 text-indigo-700" />,
    title: "AI-Powered Interviews",
    description:
      "Get realistic interview experience with our advanced AI interviewer",
  },
  {
    icon: <StarIcon className="h-6 w-6 text-indigo-700" />,
    title: "Personalized Feedback",
    description: "Receive detailed feedback and suggestions for improvement",
  },
  {
    icon: <TrophyIcon className="h-6 w-6 text-indigo-700" />,
    title: "Industry-Specific Questions",
    description:
      "Practice with questions tailored to your field and experience level",
  },
]

export { packages, stats, features }