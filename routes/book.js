const exp = require("express");
const router = exp.Router();
const asyncHandler = require('express-async-handler');
const { Book,efun,vfun } = require('../models/Book')


// const books = [
//     {id: 1, title: "Fast Objects", author: "Ali", price: 10},
//     {id: 2, title: "Node.js Basics", author: "Sara", price: 180},
//     {id: 3, title: "Mastering JS", author: "Khaled", price: 300},
//     {id: 4, title: "React in Depth", author: "Mona", price: 275},
//     {id: 5, title: "MongoDB Guide", author: "Hassan", price: 200},
//     {id: 6, title: "Understanding APIs", author: "Laila", price: 220},
//     {id: 7, title: "Express Made Easy", author: "Tarek", price: 190},
//     {id: 8, title: "CSS for Pros", author: "Salma", price: 160},
//     {id: 9, title: "HTML5 Handbook", author: "Omar", price: 150},
//     {id:10, title: "Advanced C++", author: "Nour", price: 310},
//     {id:11, title: "Python Projects", author: "Youssef", price: 290},
//     {id:12, title: "AI & ML Basics", author: "Amira", price: 330},
//     {id:13, title: "Data Structures", author: "Karim", price: 280},
//     {id:14, title: "Algorithms 101", author: "Nada", price: 260},
//     {id:15, title: "Clean Code", author: "Ahmed", price: 320},
//     {id:16, title: "DevOps Manual", author: "Rana", price: 240},
//     {id:17, title: "Linux Commands", author: "Mostafa", price: 210},
//     {id:18, title: "Docker Deep Dive", author: "Maged", price: 295},
//     {id:19, title: "Kubernetes Guide", author: "Zeinab", price: 340},
//     {id:20, title: "Software Testing", author: "Fady", price: 230},
// ];




/**
 * @desc get all books
 * @route api/books
 * @method GET
 * @access public
 */
router.get("/",asyncHandler( async(req,res)=>{
    const books = await Book.find().sort({name:1}).populate("author",["name","_id"]);
    res.status(200).json(books); 

}));

/**
 * @desc add a new book
 * @route /api/books
 * @method POST
 * @access public
 */
router.post("/",asyncHandler(async(req,res)=>{
    
    


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
}));


/**
 * @desc find a book by id
 * @route /api/books:id
 * @method GET
 * @access public
 */
router.get("/:id",asyncHandler(async(req,res)=>{
    const book = await Book.findById(req.params.id).populate("author"); 
    if(book){res.status(200).json(book);}
    else{res.status(404).json({massage: "book not found"});}

}));

/**
 * @desc edit a book by id
 * @route /api/books:id
 * @method PUT
 * @access public
 */
router.put("/:id",asyncHandler(async(req,res)=>{
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

}));


/**
 * @desc delete a book by id
 * @route api/books:id
 * @method DELETE
 * @access public
 */
router.delete("/:id",asyncHandler(async(req,res)=>{

    const book = await Book.findById(req.params.id)
    if(book){
        await Book.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"book has been deleted"})
    }
    else{
        res.status(404).json({message:"book not found"})
    }

}));




module.exports = router;