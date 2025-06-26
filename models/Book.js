const mongoose = require('mongoose');

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
