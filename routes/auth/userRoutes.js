import express from "express"
import registerController from "../../controllers/user/register.js"
import loginController from "../../controllers/user/login.js"
import profileController from "../../controllers/user/profile.js"
import { isAuthenticated } from "../../middlewares/auth.js"
import registerValidator from "../../validators/userRegister_validator.js"  
import loginValidator from "../../validators/userLogin_validator.js"
import verifyEmailController from "../../controllers/user/verifyEmail.js"  
import otpResetPasswordController from "../../controllers/user/resetOtp.js"  
import resetPasswordValidator from "../../validators/userResetPassword_validator.js"
import resetPasswordController from "../../controllers/user/resetPassword.js"  
import updateProfileValidator from "../../validators/userUpdateProfile_validator.js"
import updateProfileController from "../../controllers/user/updateProfile.js"
import { uploadImages } from "../../middlewares/uploadImages.js"


const router = express.Router()

//localhost:4000/api/user/register
router.post("/register",registerValidator,registerController)

//localhost:4000/api/user/verifyEmail
router.post("/verifyEmail",verifyEmailController)

//localhost:4000/api/user/login
router.post("/login",loginValidator,loginController)

//localhost:4000/api/user/otpResetPassword
router.post("/otpResetPassword", otpResetPasswordController)

//localhost:4000/api/user/resetPassword
router.post("/resetPassword",resetPasswordValidator, resetPasswordController)


//localhost:4000/api/user/profile
router.get("/profile",isAuthenticated,profileController)

//localhost:4000/api/user/updateProfile
router.put("/updateProfile",uploadImages, isAuthenticated, updateProfileValidator, updateProfileController)

export default router