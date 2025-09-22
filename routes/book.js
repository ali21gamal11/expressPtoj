const exp = require("express");
const router = exp.Router();
const { AuthorizeTheAdmin}  = require('../middleware/verifyToken');
const { getAllBooks,getBookById,creatBook,editBook,deleteBook } = require("../controller/bookContriller");





/**
 * @desc get all books
 * @route api/books
 * @method GET
 * @access public
 */
router.get("/",getAllBooks);

/**
 * @desc add a new book
 * @route /api/books
 * @method POST
 * @access private only admin
 */
router.post("/",AuthorizeTheAdmin,creatBook);


/**
 * @desc find a book by id
 * @route /api/books:id
 * @method GET
 * @access public
 */
router.get("/:id",getBookById);

/**
 * @desc edit a book by id
 * @route /api/books:id
 * @method PUT
 * @access private only admin
 */
router.put("/:id",AuthorizeTheAdmin,editBook);


/**
 * @desc delete a book by id
 * @route api/books:id
 * @method DELETE
 * @access private only admin
 */
router.delete("/:id",AuthorizeTheAdmin,deleteBook);




module.exports = router;