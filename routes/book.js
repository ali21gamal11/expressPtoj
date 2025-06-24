const exp = require("express");
const router = exp.Router();
const joi = require('joi');

const books = [
    {id: 1, title: "Fast Objects", author: "Ali", price: 10},
    {id: 2, title: "Node.js Basics", author: "Sara", price: 180},
    {id: 3, title: "Mastering JS", author: "Khaled", price: 300},
    {id: 4, title: "React in Depth", author: "Mona", price: 275},
    {id: 5, title: "MongoDB Guide", author: "Hassan", price: 200},
    {id: 6, title: "Understanding APIs", author: "Laila", price: 220},
    {id: 7, title: "Express Made Easy", author: "Tarek", price: 190},
    {id: 8, title: "CSS for Pros", author: "Salma", price: 160},
    {id: 9, title: "HTML5 Handbook", author: "Omar", price: 150},
    {id:10, title: "Advanced C++", author: "Nour", price: 310},
    {id:11, title: "Python Projects", author: "Youssef", price: 290},
    {id:12, title: "AI & ML Basics", author: "Amira", price: 330},
    {id:13, title: "Data Structures", author: "Karim", price: 280},
    {id:14, title: "Algorithms 101", author: "Nada", price: 260},
    {id:15, title: "Clean Code", author: "Ahmed", price: 320},
    {id:16, title: "DevOps Manual", author: "Rana", price: 240},
    {id:17, title: "Linux Commands", author: "Mostafa", price: 210},
    {id:18, title: "Docker Deep Dive", author: "Maged", price: 295},
    {id:19, title: "Kubernetes Guide", author: "Zeinab", price: 340},
    {id:20, title: "Software Testing", author: "Fady", price: 230},
];




/**
 * @desc get all books
 * @route api/books
 * @method GET
 * @access public
 */
router.get("/",(req,res)=>{
    
    res.status(200).json(books); 
});

/**
 * @desc add a new book
 * @route /api/books
 * @method POST
 * @access public
 */
router.post("/",(req,res)=>{
    
    const book = {
        id: books.length + 1 ,
        title: req.body.title,
        author:req.body.author,
        price:parseInt(req.body.price)
    }
    


    const { error } = vfun(req.body);
    if(error){
        return res.status(400).json({message : error.details[0].message});
    }

    
    console.log(book);
    books.push(book);
    res.status(201).json(book);
})


/**
 * @desc find a book by id
 * @route /api/books:id
 * @method GET
 * @access public
 */
router.get("/:id",(req,res)=>{
    const book =books.find(mybook => mybook.id === parseInt(req.params.id)); 
    if(book){res.status(200).json(book);}
    else{res.status(404).json({massage: "book not found"});}

});

/**
 * @desc edit a book by id
 * @route /api/books:id
 * @method PUT
 * @access public
 */
router.put("/:id",(req,res)=>{
    const { error } = efun(req.body);
    if(error){
        res.status(400).json({message:error.details[0].message});
    }
    
    const book = books.find(b => b.id === parseInt(req.params.id))
    if(book){
        res.status(200).json({message:"book has been updated"})
    }
    else{
        res.status(404).json({message:"book not found"})
    }

})


/**
 * @desc delete a book by id
 * @route api/books:id
 * @method DELETE
 * @access public
 */
router.delete("/:id",(req,res)=>{
    const book = books.find(b => b.id === parseInt(req.params.id))
    if(book){
        res.status(200).json({message:"book has been deleted"})
    }
    else{
        res.status(404).json({message:"book not found"})
    }

})

//validate function for adding books
function vfun (obj){
        const schema = joi.object({
        title: joi.string().min(3).trim().max(100).required(),
        author: joi.string().min(3).trim().max(100).required(),
        price:joi.number().min(6).max(99999).required(),
        
    })
    return schema.validate(obj);

}

//validate function for editing books
function efun (obj){
        const schema = joi.object({
        title: joi.string().min(3).trim().max(100),
        author: joi.string().min(3).trim().max(100),
        price:joi.number().min(6).max(99999)
        
    })
    return schema.validate(obj);

}


module.exports = router;