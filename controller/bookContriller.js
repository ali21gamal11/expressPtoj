const asyncHandler = require('express-async-handler');
const { Book,efun,vfun } = require('../models/Book')


getAllBooks = asyncHandler( async(req,res)=>{
    const { minPrice , maxPrice } = req.query
    const books = await Book.find()
    .sort({name:1}).populate("author",["firstName","_id"]);
    res.status(200).json(books); 

});

getBookById = asyncHandler(async(req,res)=>{
    const book = await Book.findById(req.params.id).populate("author"); 
    if(book){res.status(200).json(book);}
    else{res.status(404).json({massage: "book not found"});}

});

creatBook = asyncHandler(async(req,res)=>{
    
    const { error } = vfun(req.body);
    if(error){
        return res.status(400).json({message : error.details[0].message});
    }
    const book = new Book({
        title:req.body.title,
        author:req.body.author,
        price:req.body.price,  
        description:req.body.description,
        cover:req.body.cover
    });

    const result = await book.save();
    
    console.log(result);
    res.status(201).json(result);
});

editBook = asyncHandler(async(req,res)=>{
    const { error } = efun(req.body);
    if(error){
        res.status(400).json({message:error.details[0].message});
    }
    
    const book = await Book.findByIdAndUpdate(req.params.id,{$set:{
        title:req.body.title,
        author:req.body.author,
        price:req.body.price,  
        description:req.body.description,
        cover:req.body.cover
    }},{new:true});

    if(book){
        res.status(200).json({message:"book has been updated",the_new_book:book} )
    }
    else{
        res.status(404).json({message:"book not found"})
    }
});

deleteBook = asyncHandler(async(req,res)=>{

    const book = await Book.findById(req.params.id)
    if(book){
        await Book.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"book has been deleted"})
    }
    else{
        res.status(404).json({message:"book not found"})
    }

});


module.exports = {
    getAllBooks,getBookById,creatBook,editBook,deleteBook
}