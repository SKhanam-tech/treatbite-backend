import createHttpError from "http-errors";
import userModel from "../../models/auth/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../services/jwtService.js";
import { validationResult } from "express-validator";

const loginController = async (req,res,next)=>{
    try {
         //validator
                const result= validationResult(req)
                 if(!result.isEmpty()){
                throw createHttpError(400,result.array()[0].msg)
            }
        const {email,password}= req.body;
        const userData = await userModel.findOne({email});
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

        if(!userData.isVerifeid){
            throw createHttpError(403,"Complete Your Registration First")
        }
        //create token
        const payload = {
            id: userData._id,
            role:userData.role
        }
        const token = generateToken(payload)
        res.status(200).json(token)

    } catch (error) {
        next(error)
    }
}

export default loginController