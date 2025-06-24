const exp = require("express");
const auth = exp.Router();
const joi = require('joi');

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
auth.get("/",(req,res)=>{
    res.status(200).json(authors);
})


/**
 * @desc add a new author 
 * @route /api/authors
 * @method POST
 * @access public
 */
auth.post("/",(req,res)=>{
    const author = {
        id:authors.length+1,
        name:req.body.name,
        age:parseInt(req.body.age)
    }

    const { error } = addv(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }

    console.log(author);
    authors.push(author);
    res.status(201).json(author);
    

})

/**
 * @desc update author by id
 * @route /api/authors
 * @method PUT
 * @access public
 */

auth.put("/",(req,res)=>{
    const { error } = editv(req.body)
        if(error){
            return res.status(200).json({message:error.details[0].message});
        }

        const author = authors.find(b => b.id === parseInt(req.body.id));
        if(author){res.status(200).send("author has been updated")}
        else{res.status(404).send("author not found")}

    
})

/**
 * @desc find author by id
 * @route /api/authors:id
 * @method GET
 * @access public
 */

auth.get("/:id",(req,res)=>{
    const author = authors.find(b => b.id === parseInt(req.params.id));
    if(author){
        console.log(author)
        res.status(200).json(author);
    }
    else{
        res.status(404).send("author not found")
    }
})



/**
 * @desc delete author by id
 * @route /api/authors
 * @method DELETE
 * @access public
 */

auth.delete("/:id",(req,res)=>{
    const { error } = editv(req.body)
        if(error){
            return res.status(200).json({message:error.details[0].message});
        }

        const author = authors.find(b => b.id === parseInt(req.params.id));
        if(author){res.status(200).send("author has been deleted")}
        else{res.status(404).send("author not found")}

    
})


function addv(obj){
    const schema = joi.object({
        name:joi.string().min(3).max(20).trim().required(),
        age:joi.number().min(18).max(120).required()
    })
    return schema.validate(obj);
}


function editv(obj){
    const schema = joi.object({
        id: joi.number().required(),
        name:joi.string().min(3).max(20).trim(),
        age:joi.number().min(18).max(120)
    })
    return schema.validate(obj);
}



module.exports = auth;