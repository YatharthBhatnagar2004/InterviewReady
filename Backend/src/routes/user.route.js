import { Router } from "express"
import {
  changePassword,
  updateUserProfile,
} from "../controllers/user.controller.js"
import {
  updateUserProfileValidator,
  changePasswordValidator,
} from "../validators/user.validator.js"
import validate from "../middlewares/validate.middleware.js"
import verifyReCaptcha from "../middlewares/reCaptcha.middleware.js"

const router = Router()

router
  .put("/profile", updateUserProfileValidator(), validate, updateUserProfile)
  .put("/change-password", changePasswordValidator(), validate, changePassword)

export default router
