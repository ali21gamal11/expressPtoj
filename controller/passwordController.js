const asyncHandler = require("express-async-handler");


getpassword = asyncHandler ((req,res)=>{
    res.render('forgotPassword')
});



module.exports = {
    getpassword
}