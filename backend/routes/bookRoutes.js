const express = require('express');
const {
  addBook,
  updateBook,
  deleteBook,
  borrowBook, returnBook,
  getBooksByUser,
  getAllBooks,  
  getBookById
  // getBorrowedBooks,
} = require('../controllers/bookController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.get('/my-books', authMiddleware, getBooksByUser); 
router.get('/:id', authMiddleware, getBookById);
router.get("/" , getAllBooks)
router.post('/add', authMiddleware, upload.single('image'), addBook); 
router.put("/edit/:id", authMiddleware, upload.single("image"), updateBook);
router.delete('/:id', authMiddleware, deleteBook);
router.patch('/borrow/:id', authMiddleware, borrowBook);
router.patch('/return/:id', authMiddleware, returnBook);

module.exports = router;