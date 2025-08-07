const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const logger = require('./middleware/logger')
dotenv.config();
const bookpath = require('./routes/book')
const authorspath = require('./routes/authors')
const autpath  = require('./routes/auth')
const userpath  = require('./routes/user')

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("connected to BookStore")})
    .catch((error)=>{console.log("fail to connect >> error: ",error)});
app.use(express.json());
app.use(logger);

app.use("/api/books",bookpath);
app.use("/api/authors",authorspath);
app.use("/api/auth",autpath);
app.use("/api/user",userpath);




const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server is running in ${process.env.NODE_ENV} mode on port ${port}`);
})
