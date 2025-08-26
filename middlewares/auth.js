import partnerModel from "../models/auth/partnerModel.js";
import { verifyToken } from "../services/jwtService.js";
import createHttpError from "http-errors";

export const isAuthenticated = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    console.log(authHeader,"auth header")

    if(authHeader==="Bearer null" || authHeader==="Bearer undefined"){
        throw createHttpError(401,"unAuthorized")
    }
    const token = authHeader.split(" ")[1]
    // console.log(token,"token")

    try {
        const decoded = verifyToken(token)
        // console.log(decoded,"decoded")
        const {id,role}=decoded;
        const user={
            _id:id,
            role:role
        }
        req.user= user;
        // console.log(req.user,"req user")
        next()
    } catch (error) {
        next(error)
    }

}
   export const isAuthorized= (roles)=>{
   return async (req,res,next)=>{
    try {
        const userId=req.user._id;
        // console.log(userId,"user Id")
      const userRole= await partnerModel.findById(userId).select("role");
        // console.log(userRole)
        if(!roles.includes(userRole.role)){
            throw createHttpError(401,"Unauthorized to Access")
        }

        next()        
    } catch (error) {
        next(error)
    }
   }
}