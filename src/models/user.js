import {Schema, model} from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    password: {
        type: String
    }, 
    age: {
        type: Number
    }
})

export const userModel = model("User", userSchema);