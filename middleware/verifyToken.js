const jwt = require("jsonwebtoken");


//verify token
function verifyToken(req,res,next){
    const token = req.headers.token

    if(token){
        try{
            const decoded = jwt.verify(token,process.env.secKay);
            req.user = decoded;
            next();
        }catch(error){
            res.status(401).json({message: "invalid token",
                error:`${error}`
            }
            )
        }
    }
    else{
        res.status(401).json({message : "no token"});
    }
}


//verify token & Authorize the user 
function verifyTokenTheAuthorize(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return res.status(403).json({message:"you are not allowed..(wtf you think your are)"})
        }
    })
}


//verify token & Authorize admins 
function AuthorizeTheAdmin(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            return res.status(403).json({message:"you are not Admin"})
        }
    })
}

module.exports = {verifyToken,verifyTokenTheAuthorize,AuthorizeTheAdmin};