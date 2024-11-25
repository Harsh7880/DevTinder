import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.js';

export const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Token not valid...........")
        }
        const decodedToken = await jwt.verify(token, "devTinder@harsh");
        const user = await userModel.findById(decodedToken?._id);
        if (!user) {
            throw new Error("User does noot exist....")
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send("Error : " + error.message);
    }
}