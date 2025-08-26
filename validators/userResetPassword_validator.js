import {checkSchema} from "express-validator"

export default checkSchema({
    
    password :{
        notEmpty:true,
        errorMessage:"Password is required",
        trim:true,
        isLength:{
            Option:{min:6},
            errorMessage:"Password must be al least 6 characters",
        },
        matches: {
            options: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            errorMessage:"Password must contain letters, numbers, and special characters"
        }

    }
    
})