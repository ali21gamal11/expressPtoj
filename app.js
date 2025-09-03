const express = require('express');
const app = express();

const dotenv = require("dotenv");
const logger = require('./middleware/logger')
dotenv.config();
const bookpath = require('./routes/book')
const authorspath = require('./routes/authors')
const autpath  = require('./routes/auth')
const userpath  = require('./routes/user')

const connect = require("./config/connect") 
connect();
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
