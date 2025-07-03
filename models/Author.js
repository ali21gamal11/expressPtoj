const mongoose = require("mongoose");
const joi = require('joi');

const authorschema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minLength:3,
        maxLength:20,
    },

    age:{
        type:Number,
        required:true,
        trim:true,
        min:18,
        max:120,


    }
},
{   
    timestamps:true
})

function addv(obj){
    const schema = joi.object({
        name:joi.string().min(3).max(20).trim().required(),
        age:joi.number().min(18).max(120).required()
    })
    return schema.validate(obj);
}


function editv(obj){
    const schema = joi.object({
        // id: joi.number().required(),
        name:joi.string().min(3).max(20).trim(),
        age:joi.number().min(18).max(120)
    })
    return schema.validate(obj);
}

const Author = mongoose.model("Author",authorschema);

module.exports = {
    Author,addv,editv
}