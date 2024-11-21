import express from 'express';
import { adminAuth, userAuth } from './middlewares/auth.js';
const app = express();

app.use('/admin' , adminAuth);
app.get('/admin/getData', (req,res)=>{
    res.send("Data sent sucessfully");
});

app.get('/user/getUserData', userAuth ,(req,res)=>{

    res.send({
        name: "Harsh",
        email: "harsh@gmail.com"
    })
})

app.post('/user',(req,res)=>{
    res.send("Data Saved Successfully");
})

app.delete('/user', (req,res) => {
    res.send("User Deleted Successfully");
})

app.listen(3000, ()=>{
    console.log("Server is ruuning in port 3000..........")
})