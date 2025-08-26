import createHttpError from "http-errors";
import transporter from "../../config/nodemailer.js"
import Config from "../../config/config.js";
import partnerModel from "../../models/auth/partnerModel.js";

const otpResetPasswordontroller = async (req,res,next)=>{
    try {
        const{email}=req.body;
        if(!email){
            throw createHttpError(401, "Email is required")
        }
        const user = await partnerModel.findOne({email})
         if(!user){
            throw createHttpError(401, "Invalid Email")
        }
        //opt create
        const otp = String (Math.floor(100000+Math.random()*900000))

        //expire time
        const expireAt = Date.now()+24*60*60*1000;

        //email send
        await transporter.sendMail({
      from: Config.SENDER_EMAIL, // sender address
      to: email, // list of receivers
      subject: "OTP For Reset Password", // Subject line
      text: `Your otp is ${otp}.Reset Your Password Using This OTP`, // plain text body
      
    });

    user.resetOtp = otp;
    user.resetOtpExpireAt = expireAt;
    await user.save();

        res.status(201).json({message:"Enter Your OTP Send on Email to Reset Password"})
    } catch (error) {
        next(error)
    }
}
export default otpResetPasswordontroller