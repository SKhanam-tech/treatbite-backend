import { checkSchema } from "express-validator";

export default checkSchema({
    firstName:{     
        optional:true,   
        isString:{
            errorMessage:"Full Name must be a string"
        },
        trim:true
    },
    contact:{
        optional:true,
        trim:true
    }
   
})