import express from 'express';

const app = express();



app.get('/', (req,res) => {
    res.send("Hello this is home page")
})

app.get('/hello', (req,res) => {
    res.send("Hello this is hello page")
})
app.get('/test', (req,res) => {
    res.send("Hello this is text page")
})


app.listen(3000, ()=>{
    console.log("Server is ruuning in port 3000..........")
})