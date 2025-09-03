const exp = require("express");
const router = exp.Router();
const bcrypt = require("bcryptjs");
const asyncHandler = require('express-async-handler');
const {User,validateUpdateUser } = require('../models/User')
const { verifyTokenTheAuthorize,AuthorizeTheAdmin}  = require('../middleware/verifyToken');

/**
 * @desc ubdate user
 * @route /api/user/:id
 * @method PUT
 * @access private
*/

router.put("/:id",verifyTokenTheAuthorize,asyncHandler(async(req,res)=>{
    const { error }  = validateUpdateUser(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }

    
    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrybt.hash(req.body.password,salt);
    }
    


    const userUbdate = await User.findByIdAndUpdate(req.params.id,{
        $set:{
            username:req.body.username,
            age: req.body.age ,
            email: req.body.email,
            password: req.body.password,
        }
    },{new:true})

    res.status(200).json(userUbdate);
}));

/**
 * @desc get all users user
 * @route /api/user/
 * @method GET
 * @access private only admin
*/
router.get("/", AuthorizeTheAdmin,async(req,res)=>{
    try{
    const allusers =await User.find().sort({username:1,age:-1}).select("username age -_id");;
    res.status(200).json(allusers)
    }catch(error){
        res.status(500).json({message:"somthing went wrong"})
    }
});


/**
 * @desc get user by id
 * @route /api/user/id
 * @method GET
 * @access private
*/
router.get("/:id",verifyTokenTheAuthorize,AuthorizeTheAdmin,async(req,res)=>{
    try{
        const userId = req.params.id;
        const user = await User.findById(userId).select("-password");
        if(user){
             res.status(200).json(user);
        }else{
        return res.status(404).json({message:"user not found"})}
    }catch(error){
        res.status(400).json({message:"somthing went wrong",error:`${error}`});
    }
    
});


/**
 * @desc delete user by id
 * @route /api/user/id
 * @method GET
 * @access private
*/
router.delete("/:id",verifyTokenTheAuthorize,async(req,res)=>{
    try{
        const userId = req.params.id;
        const user = await User.findById(userId)
        if(user){
            await User.findByIdAndDelete(userId)
             res.status(200).json({message:`user:${user.username} has been deleted`});
        }else{
        return res.status(404).json({message:"user not found"})}
    }catch(error){
        res.status(400).json({message:"somthing went wrong",error:`${error}`});
    }
    
})


module.exports = router ;