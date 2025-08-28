import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import { generateToken } from "../../services/jwtService.js";
import { validationResult } from "express-validator";
import partnerModel from "../../models/auth/partnerModel.js";

const loginController = async (req,res,next)=>{
    try {
         //validator
                const result= validationResult(req)
                 if(!result.isEmpty()){
                throw createHttpError(400,result.array()[0].msg)
            }
        const {email,password}= req.body;
        const userData = await partnerModel.findOne({email});
        if(!userData){
            throw createHttpError(403,"Email or Password is wrong")
        }

        //bcryptjs password compare
//userData.password is hashed password save in database
//password is from req.body

        // await bcrypt.compare("B4c0/\/", hash); // true
        const isMatch = await bcrypt.compare(password, userData.password); // true
        if(!isMatch){
            throw createHttpError(403,"Invallid Email or Password")
        }

        if(!userData.isVerified){
            throw createHttpError(403,"Complete Your Registration First")
        }
        if(!userData.isApproved){
            throw createHttpError(403,"Your Registration is not Approved or Blocked.Check Your Email.")
        }
        //create token
        const payload = {
            id: userData._id,
            role:userData.role
        }
        const token = generateToken(payload)
        res.status(200).json(
            {
                token,
                role:userData.role
            }
        )

    } catch (error) {
        next(error)
    }
}

export default loginController