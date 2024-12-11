const express = require('express');
const {
  addBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
  getBooksByUser,
  getAllBooks,  
  getBorrowedBooks,
} = require('../controllers/bookController');
const { authMiddleware,authenticateUser } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();

router.get("/" , getAllBooks)
router.post('/add', authMiddleware, upload.single('image'), addBook); 
router.put('/edit/:id', authMiddleware, updateBook); 

router.get('/my-books', authMiddleware, getBooksByUser); 
router.delete('/:id', authMiddleware, deleteBook);

router.put('/:bookId/borrow', authenticateUser, borrowBook);
router.get('/borrowed', authenticateUser, getBorrowedBooks);

router.put('/:id/return', authenticateUser, returnBook);;

module.exports = router;