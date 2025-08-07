const exp = require("express");
const router = exp.Router();
const bcrypt = require("bcryptjs");
const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");
const {User ,validatLogin,validateNewUser } = require('../models/User')

/**
 * @desc login user 
 * @route /api/auth/login
 * @method Post
 * @access public
 */

router.post("/login",asyncHandler(async(req,res)=>{
    const { error } = validatLogin(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message})
    }
    
    let user = await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json({message:"invalid Email"})
    }

    const passwordTrue = await bcrypt.compare(req.body.password,user.password)
    if(!passwordTrue){
        return res.status(400).json({message:"invalid Passowrd"})
    }

    
    const token = jwt.sign({id:user._id, username:user.username},"secKay");
    const { password  , ...other } = user._doc;

    
    res.status(201).json({...other,token});
}));

/**
 * @desc Register new user 
 * @route /api/auth/register
 * @method Post
 * @access public
 */

router.post("/register",asyncHandler(async(req,res)=>{
    const { error } = validateNewUser(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message})
    }
    
    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({message:"this user is alredy registered"})
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password  = await bcrypt.hash(req.body.password,salt)
    user = new User({
        email:req.body.email,
        username:req.body.username,
        age:req.body.age,
        password:req.body.password,
        isAdmin:req.body.isAdmin,

    })

    const result = await user.save();
    const token = jwt.sign({id:user._id, username:user.username},process.env.secKay);
    const { password  , ...other } = result._doc;

    
    res.status(201).json({...other,token});
}));
module.exports = router;