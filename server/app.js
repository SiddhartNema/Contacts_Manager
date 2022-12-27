const express = require('express')
const morgan = require("morgan")
const connectDB = require('./config/db')


const app = express()


app.use(express.json())
app.use(morgan("tiny"))


app.get("/",(req,res)=>{
    res.send("hello world")
})

app.use("/api",require("./routes/auth"))

const PORT = process.env.PORT || 3000
app.listen(PORT, async()=>{
    try{
        await connectDB()
    console.log(`server listening on port : ${PORT}`)

    }catch (err){
        console.log(err)

    }
    
})