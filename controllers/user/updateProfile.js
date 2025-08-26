import createHttpError from "http-errors";
import userModel from "../../models/auth/userModel.js";
import { validationResult } from "express-validator";
import { deleteFromCloudinary, extractCloudinaryPath } from "../../services/cloudinaryDelete.js";


//..............................................................................
const updateProfileController = async (req,res,next)=>{
    const id = req.user._id;

    

    try {
        //validator
            const result= validationResult(req)
            if(!result.isEmpty()){
            throw createHttpError(400,result.array()[0].msg)
        }

        const{fullName, email} = req.body;
        const user = await userModel.findById(id);

        if(email && user.email !== email){
            const userExist =  await userModel.findOne({email})

            if(userExist)
                throw createHttpError(409,"Email is Already in Use")
            }

            if(fullName) user.fullName = fullName;
            if(email) user.email = email;

            // req.files?.avatar?.[0] means returns undefined if no avatar uploaded
        if (req.files?.avatar?.[0]) {
            // Delete old avatar from Cloudinary
            if (user.avatar) {
                const url = extractCloudinaryPath(user.avatar)
                await deleteFromCloudinary(url);
            }
            //'https://res.cloudinary.com/demo/image/upload/v1723456789/avatar/1755269311433-profile.jpg'
            user.avatar = req.files.avatar[0].path;
        }

            await user.save()
            res.status(201).json({
                message:"Profile Update Successfully",
            user:{
                fullName:user.fullName,
                email:user.email,
                avatar:user.avatar
            }
        });
        
    } catch (error) {
        next(error)
    }
}

export default updateProfileController