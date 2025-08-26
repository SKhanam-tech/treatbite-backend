import express from "express"
import partnerRegisterValidator from "../../validators/partnerRegister-validator.js"
import registerController from "../../controllers/partner/register.js"
import verifyEmailController from "../../controllers/partner/verifyEmail.js"
import loginController from "../../controllers/partner/login.js"
import userLogin_validator from "../../validators/userLogin_validator.js"
import otpResetPasswordController from "../../controllers/partner/resetOtp.js"
import resetPasswordController from "../../controllers/partner/resetPassword.js"
import userResetPassword_validator from "../../validators/userResetPassword_validator.js"
import profileController from "../../controllers/partner/profile.js"
import updateProfileController from "../../controllers/partner/updateProfile.js"
import { isAuthenticated } from "../../middlewares/auth.js"
import { uploadImages } from "../../middlewares/uploadImages.js"
import partnerUpdateProfile_validator from "../../validators/partnerUpdateProfile_validator.js"

const router = express.Router()

//localhost:4000/api/partner/register
router.post("/register",partnerRegisterValidator,registerController)

//localhost:4000/api/partner/verifyEmail
router.post("/verifyEmail",verifyEmailController)

//localhost:4000/api/partner/login
router.post("/login",userLogin_validator,loginController)

//localhost:4000/api/partner/otpResetPassword
router.post("/otpResetPassword", otpResetPasswordController)

//localhost:4000/api/partner/resetPassword
router.post("/resetPassword",userResetPassword_validator, resetPasswordController)

//localhost:4000/api/partner/profile
router.get("/profile",isAuthenticated,profileController)

//localhost:4000/api/partner/updateProfile
router.put("/updateProfile",uploadImages, isAuthenticated, partnerUpdateProfile_validator, updateProfileController)

export default router