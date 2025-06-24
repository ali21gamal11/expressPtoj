const express = require('express');
const app = express();

app.use(express.json());
const bookpath = require('./routes/book')
const authorspath = require('./routes/authors')
app.use("/api/books",bookpath);
app.use("/api/authors",authorspath);




const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
