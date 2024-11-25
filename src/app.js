import express from 'express';
import { connectDB } from './config/db.js';
import { userModel } from './models/user.js';
import bcrypt from "bcrypt";
import { validateUserFields } from './utils/validations.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'
const app = express();
app.use(express.json())
app.use(cookieParser());

app.post('/signup', async (req, res) => {

    const { firstName, lastName, email, password } = req.body;
    try {

        validateUserFields(req);

        const encyptedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            firstName,
            lastName,
            email,
            password: encyptedPassword
        });
        await user.save();
        res.send(`User Added Successfully with userName: ${req.body.firstName} `);
    } catch (err) {
        res.status(400).send("Error while Saving the user in database :" + err.message);
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email })
        if (!user) {
            throw new Error("User does not exists");
        }
        const isPasswordValid = await bcrypt.compare(password, user?.password);
        if (isPasswordValid) {

            const jwtToken = await jwt.sign({_id : user._id}, "devTinder@harsh");
            res.cookie("token", jwtToken);
            res.send("User login in Sucessfull............");

        } else {
            throw new Error("Invalid Credetials");
        }
    } catch (error) {
        res.status(400).send("Somthing Went wrong : " + error.message);
    }
})

app.get('/profile', async(req,res) => {
    try {

        const token = req.cookies;
        if(!token){
            throw new Error("Invalid Token Please login again"); 
        }
        const decodedMessage =  await jwt.verify(token.token,"devTinder@harsh");
        const user = await userModel.findById(decodedMessage._id);
        if(!user){
            throw new Error("User does not exist, Please Sign up");
        }
        res.send(user);
        
    } catch (error) {
        res.status(400).send("Error while getting the user from database :" + error.message);
    }
})

app.patch('/user/:userId', async (req, res) => {
    try {

        const userId = req.params?.userId;
        const data = req.body;
        const ALLOWED_UPDATES = [
            "firstName",
            "lastName",
            "age",
            "gender",
            "about",
            "photoUrl",
            "skills"
        ]

        const isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k));
        if (data?.skills?.length > 10) {
            throw new Error("Please Add skills below 10");
        }

        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }

        await userModel.findByIdAndUpdate(userId, data, {
            runValidators: true
        })
        res.send("User Updated Successfuly");

    } catch (error) {
        res.status(404).send("Something went wrong while updating the user :" + error.message);

    }
})

app.get('/feed', async (req, res) => {
    try {
        const users = await userModel.find({});
        if (users.length === 0) {
            res.status(404).send("User's not Found");
        } else {
            res.send(users);
        }
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
})

app.delete('/user', async (req, res) => {
    try {

        const userId = req.body.userId
        await userModel.findByIdAndDelete(userId);
        res.send("User deleted successfylly");

    } catch (error) {
        res.status(400).send("Something went wrong while deleting data")
    }
})

connectDB().then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
        console.log("Server is running in port 3000..........")
    })
}).catch((err) => {
    console.log("Somthing Went wrong, Database is not connected")
})

