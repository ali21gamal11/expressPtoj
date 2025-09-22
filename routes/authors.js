const exp = require("express");
const auth = exp.Router();
const { AuthorizeTheAdmin}  = require('../middleware/verifyToken');
const { deleteAuthor,editAuthor,getAuthorById,creatAuthors,getAllAuthors } = require("../controller/authorsController")


/**
 * @desc get all authors 
 * @route /api/authors
 * @method GET
 * @access public
 */
auth.get("/",getAllAuthors)

/**
 * @desc add a new author 
 * @route /api/authors
 * @method POST
 * @access private only admin
 */
auth.post("/",AuthorizeTheAdmin,creatAuthors)

/**
 * @desc update author by id
 * @route /api/authors
 * @method PUT
 * @access private only admin
 */

auth.put("/:id", AuthorizeTheAdmin,editAuthor)

/**
 * @desc find author by id
 * @route /api/authors:id
 * @method GET
 * @access public
 */

auth.get("/:id",getAuthorById)

/**
 * @desc delete author by id
 * @route /api/authors
 * @method DELETE
 * @access private only admin
 */

auth.delete("/:id",AuthorizeTheAdmin,deleteAuthor)

module.exports = auth;