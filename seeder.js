const { books,authors } = require("./data.js");
const { Book } = require("./models/Book.js");
const { Author } = require("./models/Author");
const connect = require("./config/connect");


require("dotenv").config();

// connect to database
connect();


// import books
const importbooks = async ()=>{
    try{
       await Book.insertMany(books);
        console.log("books inmported!");
    }catch(error){
        console.log(`error=> : ${error}`);
        process.exit(1);
    }
}


// remove all books
const deletebooks = async ()=>{
    try{
       await Book.deleteMany();
        console.log("books removed!");
    }catch(error){
        console.log(`error=> : ${error}`);
        process.exit(1);
    }
}

const importauthors = async ()=>{
    try{
       await Author.insertMany(authors);
        console.log("Authors inmported!");
    }catch(error){
        console.log(`error=> : ${error}`);
        process.exit(1);
    }
}


// remove all books
const deleteauthors = async ()=>{
    try{
       await Author.deleteMany();
        console.log("Authors removed!");
    }catch(error){
        console.log(`error=> : ${error}`);
        process.exit(1);
    }
}

if(process.argv[2] == "-import"){
    importbooks();
}else if(process.argv[2] == "-delete"){
    deletebooks();
}

if(process.argv[2] == "-importA"){
    importauthors();
}
else if(process.argv[2] == "-deleteA"){
    deleteauthors();
}