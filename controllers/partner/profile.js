import partnerModel from "../../models/auth/partnerModel.js"

const profileController = async (req, res,next)=>{
    const id= req.user._id
    // console.log(id,"user id")

    try {
        const userData = await partnerModel.findById(id).select("-password -createdAt -updatedAt -__v")
        console.log(userData,"user data")
        res.status(200).json(userData)
    } catch (error) {
        next(error)
    }
}

export default profileController