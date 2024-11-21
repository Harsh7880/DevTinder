import express from 'express';
import { adminAuth, userAuth } from './middlewares/auth.js';
import {connectDB} from './config/db.js';
import { userModel } from './models/user.js';
const app = express();


app.post('/signup',async (req,res) => {
    const userData = {
        firstName: "Viral",
        lastName: "Kohli",
        email: "virat@gmail.com",
        age: 24,
        gender: "Male",
        password: "Virat@1234"
    }
    const user = new userModel(userData);
    await user.save();
    res.send("User Added Successfully!");
})

connectDB().then(()=>{
    console.log("Database connection established");
    app.listen(3000, ()=>{
        console.log("Server is running in port 3000..........")
    })
}).catch((err) => {
    console.log("Somthing Went wrong, Database is not connected")
})

