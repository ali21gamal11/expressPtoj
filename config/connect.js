const mongoose = require('mongoose');

async function connectDB (){
    try{
       await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to BookStore")
    }catch(error){
        console.log("fail to connect >> error: ",error)
    }
}

module.exports = connectDB



    