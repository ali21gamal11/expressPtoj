const exp = require("express");
const router = exp.Router();
const { getAllUser,getUserById,editUser,deleteUser,creatUser } = require("../controller/usersController")
const { verifyTokenTheAuthorize,AuthorizeTheAdmin}  = require('../middleware/verifyToken');



/**
 * @desc create user
 * @route /api/user/
 * @method POST
 * @access public
*/
router.post('/',creatUser)

/**
 * @desc ubdate user
 * @route /api/user/:id
 * @method PUT
 * @access private
*/

router.put("/:id",verifyTokenTheAuthorize,editUser);

/**
 * @desc get all users user
 * @route /api/user/
 * @method GET
 * @access private only admin
*/
router.get("/", AuthorizeTheAdmin,getAllUser);


/**
 * @desc get user by id
 * @route /api/user/id
 * @method GET
 * @access private
*/
router.get("/:id",verifyTokenTheAuthorize,AuthorizeTheAdmin,getUserById);


/**
 * @desc delete user by id
 * @route /api/user/id
 * @method GET
 * @access private
*/
router.delete("/:id",verifyTokenTheAuthorize,deleteUser);


module.exports = router ;