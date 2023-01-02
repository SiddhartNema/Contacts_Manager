const router = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/User")
router.post("/login")



router.post("/register", async(req,res)=>{
    const {name, email, password} = req.body

    //  check all the mising fields
    if(!name || !email || !password)
    return res
        .status(400)
        .json({error : ` pls enter all required field`})

        // name validation
        if(name.length>25) return res.status(400).json({error: "name can be less then 25 char"})

        // email validation

        const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!emailReg.test(email))
        return res.status(400).json({error: "pls enter a valid email address"})

        // validation of password
        if(password.length<6) return res.status(400).json({ error: "password atleast mut be 6 char long"})

    try{
        const doesUserAlreadyExits = await User.findOne({email})
        if(doesUserAlreadyExits) return res.status(400).json({error: ` a user with that email [${email}] already exists so pls try diff email`})
        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = new User({name,email,password: hashedPassword})

        // save the user
        const result = await newUser.save()

        result._doc.password = undefined

        return res.status(201).json({...result._doc})


        
         

    }catch(err){
        console.log(err)
        return res.status(500).json({ error: err.message })
    }
})

router.post("/login", async(req,res)=>{
    const {email, password} = req.body
    if(!email || !password)  return res.status(400).json({error: " pls enter all the requiree fields"})

     // email validation

     const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     if(!emailReg.test(email))
     return res.status(400).json({error: "pls enter a valid email address"})

    try{
        const doesUserExits = await User.findOne({email})

        if(!doesUserExits) return res.status(400).json({error: " invalid email or password"})

        // if there were any user present
        const doesPasswordMatch =  await bcrypt.compare(password, doesUserExits.password)

        if(!doesPasswordMatch) return res.status(400).json({error: " invalid email or password"})

        const payload = {_id: doesUserExits._id}
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"1h"})

        return res.status(200).json({token})

    }catch(err){
        console.log(err)
        return res.status(500).json({ error: err.message })

    }
})

module.exports=router