const express = require("express");
const router = express.Router();
const { getpassword } = require("../controller/passwordController")


router.route('/forgotPassword').get(getpassword);






module.exports = router

