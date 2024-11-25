import express from 'express';
import { connectDB } from './config/db.js';
import { userModel } from './models/user.js';
import bcrypt from "bcrypt";
import { validateUserFields } from './utils/validations.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { userAuth } from './middlewares/auth.js';

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

app.get('/profile', userAuth, async(req,res) => {
    try {
        const user = req.user;
        res.send(user);
        
    } catch (error) {
        res.status(400).send("Error while getting the user from database :" + error.message);
    }
})

app.post('/sendConnectionRequest', userAuth, (req,res)=>{

    const user = req.user;
    console.log("Sending Connection Request..........................");
    res.send(user.firstName + " sent connection Request Send Successfully")
})

connectDB().then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
        console.log("Server is running in port 3000..........")
    })
}).catch((err) => {
    console.log("Somthing Went wrong, Database is not connected")
})

