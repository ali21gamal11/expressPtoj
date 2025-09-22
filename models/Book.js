const mongoose = require('mongoose');
const joi = require('oi');

const bookschema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50,
        trim:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Author"
    },
    description:{
        type:String,
        required:true,
        minLength:10,
        maxLength:200,
        trim:true
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    cover:{
        type:String,
        enum:["soft cover","hard cover"],
        required:true
    }
    
},{timestamps:true});

const Book = mongoose.model("Book",bookschema);

//validate function for adding books
function vfun (obj){
        const schema = joi.object({
        title: joi.string().min(3).trim().max(50).required(),
        author: joi.string().required(),
        price:joi.number().min(0).required(),
        description:joi.string().min(10).max(200).trim().required(),
        cover:joi.string().valid("soft cover","hard cover").required()
        
    })
    return schema.validate(obj);

}

//validate function for editing books
function efun (obj){
        const schema = joi.object({
        title: joi.string().min(3).trim().max(100),
        author: joi.string(),
        price:joi.number().min(10),
        description:joi.string().min(10).max(200).trim(),
        cover:joi.string().valid("soft cover","hard cover")
        
    })
    return schema.validate(obj);

}

module.exports = {
    Book,vfun,efun
}

