const bcrypt = require("bcryptjs");
const asyncHandler = require('express-async-handler');
const {User,validateUpdateUser,validateNewUser } = require('../models/User');

const getAllUser = async(req,res)=>{
    try{
    const allusers =await User.find().sort({username:1,age:-1}).select("username age -_id");;
    res.status(200).json(allusers)
    }catch(error){
        res.status(500).json({message:"somthing went wrong"})
    }
};

const creatUser = async (req,res)=>{


    const { error } = validateNewUser(req.body);
        if(error){
            return res.status(400).json({message:error.details[0].message});
        }

    try{
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password,salt);
        const user = new User ({
        username:req.body.username,
        email:req.body.email,
        age:parseInt(req.body.age),
        password:req.body.password,
        isAdmin:req.body.isAdmin,
    });
    const result = await user.save()
    console.log(result);
    res.status(201).json(result);
    
    }catch(error){
        console.log("somthing is wrong, Error:",error);
        res.status(500).json({massage:"somthing is wrong"})
    }
}

const getUserById = async(req,res)=>{
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
    
};

const editUser = asyncHandler(async(req,res)=>{
    const { error }  = validateUpdateUser(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }
    
    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password,salt);
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
});

const deleteUser = async(req,res)=>{
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
    
};

module.exports = { getAllUser,getUserById,editUser,deleteUser,creatUser }