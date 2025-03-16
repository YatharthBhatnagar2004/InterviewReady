import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import Loader from "@/components/custom/Loader"

const Home = lazy(() => import("@/pages/Home"))
const Login = lazy(() => import("@/pages/Login"))
const Signup = lazy(() => import("@/pages/Signup"))
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"))
const ResetPassword = lazy(() => import("@/pages/ResetPassword"))
const Dashboard = lazy(() => import("@/pages/Dashboard"))
const InterviewDetail = lazy(() => import("@/pages/interviews/InterviewDetail"))
const Interview = lazy(() => import("@/pages/interviews/Interview"))
const ProtectedRouter = lazy(() => import("@/routes/ProtectedRouter"))
const PublicRouter = lazy(() => import("@/routes/PublicRouter"))
const Profile = lazy(() => import("@/pages/Profile"))
const ChangePassword = lazy(() => import("@/pages/ChangePassword"))
const Pricing = lazy(() => import("@/pages/Pricing"))
const PaymentSuccess = lazy(() => import("@/pages/PaymentSuccess"))
const PaymentFailure = lazy(() => import("@/pages/PaymentFailure"))
const Feedback = lazy(() => import("@/pages/interviews/Feedback"))

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRouter>
                <Home />
              </PublicRouter>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRouter>
                <Signup />
              </PublicRouter>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRouter>
                <Login />
              </PublicRouter>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRouter>
                <ForgotPassword />
              </PublicRouter>
            }
          />
          <Route
            path="/reset-password/:resetPasswordToken"
            element={
              <PublicRouter>
                <ResetPassword />
              </PublicRouter>
            }
          />
          <Route path="/dashboard">
            <Route
              path="profile"
              element={
                <ProtectedRouter>
                  <Profile />
                </ProtectedRouter>
              }
            />
            <Route
              path="change-password"
              element={
                <ProtectedRouter>
                  <ChangePassword />
                </ProtectedRouter>
              }
            />
            <Route
              path="pricing"
              element={
                <ProtectedRouter>
                  <Pricing />
                </ProtectedRouter>
              }
            />
            <Route
              path="success"
              element={
                <ProtectedRouter>
                  <PaymentSuccess />
                </ProtectedRouter>
              }
            />
            <Route
              path="failure"
              element={
                <ProtectedRouter>
                  <PaymentFailure />
                </ProtectedRouter>
              }
            />
            <Route
              index
              element={
                <ProtectedRouter>
                  <Dashboard />
                </ProtectedRouter>
              }
            />
            <Route
              path="interview/:id"
              element={
                <ProtectedRouter>
                  <InterviewDetail />
                </ProtectedRouter>
              }
            />
            <Route
              path="interview/start/:id"
              element={
                <ProtectedRouter>
                  <Interview />
                </ProtectedRouter>
              }
            />
            <Route
              path="feedback/:id"
              element={
                <ProtectedRouter>
                  <Feedback />
                </ProtectedRouter>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
