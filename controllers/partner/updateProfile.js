import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import { deleteFromCloudinary, extractCloudinaryPath } from "../../services/cloudinaryDelete.js";
import partnerModel from "../../models/auth/partnerModel.js";


//..............................................................................
const updateProfileController = async (req,res,next)=>{
    const id = req.user._id;

    

    try {
        //validator
            const result= validationResult(req)
            if(!result.isEmpty()){
            throw createHttpError(400,result.array()[0].msg)
        }

        const{fullName, contact} = req.body;
        const user = await partnerModel.findById(id);

       

            if(fullName) user.fullName = fullName;
            if(contact) user.contact = contact;

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