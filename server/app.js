require("dotenv").config({path:"./config/config.env"})

const express = require('express')
const morgan = require("morgan")
const connectDB = require('./config/db')
const mongoose = require("mongoose")

mongoose.set("strictQuery", false);



const app = express()
const auth = require("./middlewares/auth")

app.use(express.json())
app.use(morgan("tiny"))
app.use(require('cors')())

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.get("/protected", auth, (req,res)=>{
    return res.status(200).json({...req.user._doc})
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