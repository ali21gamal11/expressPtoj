const { Author,addv,editv } = require('../models/Author');


getAllAuthors = async (req,res)=>{
    try{
        const { PageNumber } = req.query
        const allauth = await Author.find().select("firstName lastName age nationality -_id").skip((PageNumber*2)-2 || 0).limit(2);
        res.status(200).json(allauth);
    }catch(error){
        conole.log("somthing went wrong, Error:",error);
        res.status(500).json({message:"somthing went wrong, Error:",error})
    }
}

creatAuthors =  async (req,res)=>{


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
}

getAuthorById = async (req,res)=>{

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
    
}

editAuthor = async (req,res)=>{
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

    
}

deleteAuthor = async (req,res)=>{
    try{
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

    
}

module.exports = {
    deleteAuthor,editAuthor,getAuthorById,creatAuthors,getAllAuthors
}