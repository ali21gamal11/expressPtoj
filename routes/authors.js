const exp = require("express");
const auth = exp.Router();
const joi = require('joi');
const { Author } = require('../models/Author')

const authors = [
    {id:1, name:"ali" ,age:20},
    {id:2, name:"mona" ,age:24},
    {id:3, name:"ahmed" ,age:30},
    {id:4, name:"mostafa" ,age:39},
    {id:5, name:"omar" ,age:40},
    {id:6, name:"kareem" ,age:32},
]


/**
 * @desc get all authors 
 * @route /api/authors
 * @method GET
 * @access public
 */
auth.get("/", async (req,res)=>{
    try{
        const allauth = await Author.find().sort({name:1,age:-1}).select("name age");
        res.status(200).json(allauth);
    }catch(error){
        conole.log("somthing went wrong, Error:",error);
        res.status(500).json({message:"somthing went wrong, Error:",error})
    }
})


/**
 * @desc add a new author 
 * @route /api/authors
 * @method POST
 * @access public
 */
auth.post("/", async (req,res)=>{


    const { error } = addv(req.body);
        if(error){
            return res.status(400).json({message:error.details[0].message});
        }

    try{
        const author = new Author ({
        name:req.body.name,
        age:parseInt(req.body.age)
    });

    const result = await author.save()
    console.log(result);
    res.status(201).json(result);
    

    }catch(error){
        console.log("somthing is wrong, Error:",error);
        res.status(500).json({massage:"somthing is wrong"})
    }
})

/**
 * @desc update author by id
 * @route /api/authors
 * @method PUT
 * @access public
 */

auth.put("/:id", async (req,res)=>{
    try{
        const { error } = editv(req.body)
        if(error){
            return res.status(200).json({message:error.details[0].message});
        }

        const author = await Author.findByIdAndUpdate(req.params.id,{$set:{
            name:req.body.name,
            age:req.body.age
        }},{ new:true });

        res.status(200).json({author});
    }
    catch(error){
        res.status(500).json({message:"somting went wrong"});
    }

    
})

/**
 * @desc find author by id
 * @route /api/authors:id
 * @method GET
 * @access public
 */

auth.get("/:id",async (req,res)=>{

    try{
        const author = await Author.findById(req.params.id);
        if(author){
            console.log(author)
            res.status(200).json(author);
        }
        else{
            res.status(404).send("author not found")
        }
    }catch(error){
        console.log("somthing is wrong, Error:",error);
        res.status(500).json({massage:"somthing is wrong"});
    }
    
})



/**
 * @desc delete author by id
 * @route /api/authors
 * @method DELETE
 * @access public
 */

auth.delete("/:id",async (req,res)=>{
    try{
        const { error } = editv(req.body)
        if(error){
            return res.status(200).json({message:error.details[0].message});
            console.log(1);
        }
        console.log(2);
        const author = await Author.findById(req.params.id);
        if(author){
            await Author.findByIdAndDelete(req.params.id);
            res.status(200).json({message:"author has been deleted"});
            console.log(3);
        }
        else{
            res.status(404).json({message:"author not found"});
            console.log(4);
        }
    }catch(error){
        console.log("somthing is wrong, Error:",error);
        res.status(500).json({massage:"somthing went wrong"})
        console.log(5);
    }

    
})






module.exports = auth;