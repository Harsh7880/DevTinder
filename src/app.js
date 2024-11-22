import express from 'express';
import { connectDB } from './config/db.js';
import { userModel } from './models/user.js';

const app = express();
app.use(express.json())

app.post('/signup', async (req, res) => {

    try {
        const user = new userModel(req.body);
        await user.save();
        res.send(`User Added Successfully with userName: ${req.body.firstName} `);
    } catch (error) {
        res.status(400).send("Error while Saving the user in database");
    }
})


app.get('/user', async (req, res) => {

    try {
        const email = req.body.email;
        const user = await userModel.findOne({email});
        if(!user){
            res.status(404).send("User not Found");  
        }else{
            console.log(user)
            res.send(user);
        }
  

    } catch (error) {
        res.status(404).status("Something went wrong while fteching the user");
    }
})


app.get('/feed', async(req,res)=>{
    try {
       const users = await userModel.find({});
       if(users.length === 0){
        res.status(404).send("User's not Found");  
    }else{
        res.send(users);
    }
    } catch (error) {
        res.status(400).send("Something went wrong")
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

