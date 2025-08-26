import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import Config from "../../config/config.js";
import transporter from "../../config/nodemailer.js";
import partnerModel from "../../models/auth/partnerModel.js";
import restaurantModel from "../../models/restaurant/restaurantModel.js";
import bankInfoModel from "../../models/bank/bankInfoModel.js";

const registerController = async (req,res,next)=>{

    //  console.log(result.array(),"all errors")

   
    try {
        //validator
        const result= validationResult(req)
         if(!result.isEmpty()){
        throw createHttpError(400,result.array()[0].msg)
    }
        const {fullName,email,password,role, contact, restaurantName, restaurantAddress, restaurantContact}= req.body;

        const userExist = await partnerModel.findOne({email})
        if(userExist){
            // res.status(409).json({message:"Email Already Exist"})
            throw createHttpError(409,"Email Already Exist")
        }
        //create hashed password using bcryptjs
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        //opt create
        const otp = String (Math.floor(100000+Math.random()*900000))

        //expire time
        const expireAt = Date.now()+24*60*60*1000;

        

        // Define an array of background colors
    const backgroundColors = [
      "e57f7f",
      "69a69d",
      "7a9461",
      "98b8e1",
      "e0d084",
      "516087",
      "ab9f8e",
      "c150ad",
      "be94eb",
      "a6a7ae",
    ];

    // Choose a random background color from the array
    const randomBackgroundColor =
      backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

      const userData = await partnerModel.create({
            fullName,
            email,
            password:hashedPassword,
            role,
            contact,
            verifyOtp:otp,
            verifyOtpExpireAt: expireAt,
            avatar: `https://ui-avatars.com/api/?name=${fullName}&&color=fff&&background=${randomBackgroundColor}&&rounded=true&&font-size=0.44`

        })
        
        await new restaurantModel({
            restaurantName,
            restaurantAddress,
            restaurantContact,            
            partner: userData._id,
        }).save();

        await new bankInfoModel({
            partnerId: userData._id
        }).save();

        //email send
        await transporter.sendMail({
      from: Config.SENDER_EMAIL, // sender address
      to: email, // list of receivers
      subject: "Email Verification", // Subject line
      text: `Your otp is ${otp}.Verify Your Account Using This OTP`, // plain text body
      
    });

        res.status(201).json({message:"Enter Your OTP Send on Email"})
    } catch (error) {
        // res.status(500).json({message:"Internal Server Error",error:error})
        next(error)
    }
}

export default registerController