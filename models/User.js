const mongoose = require('mongoose');
const joi = require('joi');

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        maxlength:200,
        minlength:5
    },
    username:{
        type:String,
        required:true,
        trim:true,
        maxlength:50,
        minlength:2
    },
    age:{
        type:Number,
        required:true,
        trim:true,
        max:120,
        min:18
    },
    password:{
        type:String,
        required:true,
        trim:true,
        maxlength:100,
        minlength:8
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

},{timestamps:true});

const User = mongoose.model("User",UserSchema);

function validateNewUser (obj){
    const schema = joi.object({
        email:joi.string().email().required().trim().min(5).max(200),
        password:joi.string().required().trim().min(8).max(100),
        username:joi.string().required().trim().min(2).max(50),
        age:joi.number().required().min(18).max(120),
        
    })
    return schema.validate(obj);
}

function validatLogin (obj){
    const schema = joi.object({
        email:joi.string().email().required().trim().min(5).max(200),
        password:joi.string().required().trim().min(8).max(100),
    })
    return schema.validate(obj);
}

function validateUpdateUser (obj){
    const schema = joi.object({
        email:joi.string().email().trim().min(5).max(200),
        password:joi.string().trim().min(8).max(100),
        username:joi.string().trim().min(2).max(50),
        age:joi.number().min(18).max(120),
        
    })
    return schema.validate(obj);
}

module.exports = {
    User,validateUpdateUser,validatLogin,validateNewUser
}