import express from 'express';

const app = express();



app.get('/user/:id/:username',(req,res)=>{
    console.log(req.params);
    console.log(req.query);
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