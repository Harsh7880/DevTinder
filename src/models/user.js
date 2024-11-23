import {Schema, model} from "mongoose";
import validator from 'validator';

const userSchema = new Schema({
    firstName: {
        type: String, 
        required : true,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required : true,
        lowercase: true,
        trim: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address : " + value);
            }
        }
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"]
    },
    password: {
        type: String,
        required: true, 
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please Enter a String Password : " + value);
            }
        }
    }, 
    age: {
        type: Number,
        min: 18
    },
    photoUrl: {
        type: String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("PLease Add a valid Photo Url : " + value);
            }
        }
    },
    about: {
        type: String,
        default: "This is about me"
    },
    skills: {
        type: [String]
    }
}, {
    timestamps: true
}
)

export const userModel = model("User", userSchema);