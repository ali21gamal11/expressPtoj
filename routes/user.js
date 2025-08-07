const exp = require("express");
const router = exp.Router();
const bcrypt = require("bcryptjs");
const asyncHandler = require('express-async-handler');
const {User,validateUpdateUser } = require('../models/User')

/**
 * @desc ubdate user
 * @route /api/user/:id
 * @method PUT
 * @access private
*/

router.put("/:id",asyncHandler(async(req,res)=>{
    const { error }  = validateUpdateUser(req.body);
    if(error){
        return res.status(400)
    } 
}));

module.exports = router ;