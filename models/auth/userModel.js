// const mongoose= require('mongoose');
import mongoose from 'mongoose';
import Config from '../../config/config.js';

const userSchema= new mongoose.Schema(
    {
        fullName:{
            type:String,
            required : true
        } ,
        email:{
            type: String,
            required: true,            
        },
        password:{
            type: String,
            required: true
        },
        role:{
            type: String,
            enum: ["User","Partner","SuperAdmin"],
            default:"User"
        },
        isVerified:{
            type: Boolean,
            default: false
        },
        resetOtp:{
            type:String,
            default:""
        },
        resetOtpExpireAt:{
            type: Number,
            default: 0
        },
        verifyOtp:{
            type:String,
            default:""
        },
        verifyOtpExpireAt:{
            type: Number,
            default: 0
        },
       avatar: {
            type: String,
            
        }
    },
    {
        timestamps:true,
    }
)

const userModel=mongoose.model("User",userSchema);
export default userModel