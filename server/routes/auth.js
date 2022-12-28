const router = require ("express").Router();
const bcrypt=require("bcrypt")

const User=require("../models/User")

router.post("/login");
router.post("/register",async (req,res)=>{
  //Checking All Fileds
    const {name,email,password}=req.body;
  if(!name || !email || !password)
  return res.status(400).json({
    error: `Please Enter All Required Fileds`
  })
  //Name Validation
  if(name.length>30)return res.status(400).json({
    error: "Name will Only 30 Characters"
  })
  //Email Validation
  const emailReg=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if(!emailReg.test(email))
  return res.status(400).json({
    error: `Please Enter Valid Email Address`  })
//Password Validation
if(password.length<=6)return res.json(400).json({
    error: "Password Must Be more than 6 characters long.."
}) 

    try{
        const doesUserAlreadyExist=await User.findOne({email});
        if(!doesUserAlreadyExist)return res.status(400).json({
            error:`A user Already exist [${email}]`
        })
        const hashedPassword=await bcrypt.hash(password,12)
const newUser= new User({
    name,email,password : hashedPassword
});

// Save the user
const result=await newUser.save();
result._doc.password=undefined;
return res.status(201).json({
    ...result._doc
})
    }catch(err){
        console.log(err);
        return res.status(500).json({
            error:err.message
        })
    }
});

module.exports = router;
