const express = require('express');
const app = express();
const mongoose = require('mongoose');



mongoose.connect("mongodb://localhost:27018/bookstore")
    .then(()=>{console.log("connected to BookStore")})
    .catch((error)=>{console.log("fail to connect >> error: ",error)});
app.use(express.json());
const bookpath = require('./routes/book')
const authorspath = require('./routes/authors')
app.use("/api/books",bookpath);
app.use("/api/authors",authorspath);




const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
