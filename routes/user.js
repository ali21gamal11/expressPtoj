const exp = require("express");
const router = exp.Router();
const bcrypt = require("bcryptjs");
const asyncHandler = require('express-async-handler');
const {User,validateUpdateUser } = require('../models/User')
const { verifyToken }  = require('../middleware/verifyToken')

/**
 * @desc ubdate user
 * @route /api/user/:id
 * @method PUT
 * @access private
*/

router.put("/:id",verifyToken,asyncHandler(async(req,res)=>{
    const { error }  = validateUpdateUser(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }

    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrybt.hash(req.body.password,salt);
    }
    


    const userUbdate = await User.findByIdAndUpdate(req.params.id,{
        $set:{
            username:req.body.username,
            age: req.body.age ,
            email: req.body.email,
            password: req.body.password,
        }
    },{new:true})

    res.status(200).json(userUbdate);
}));

module.exports = router ;