const express = require("express");
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
} = require("../controllers/bookController");

const router = express.Router();

// Routes
router.get("/", getBooks); // Get all books
router.get("/:id", getBookById); // Get book by ID
router.post("/", createBook); // Add a new book
router.put("/:id", updateBook); // Update book details
router.delete("/:id", deleteBook); // Delete a book
router.post("/:id/borrow", borrowBook); // Borrow a book
router.post("/:id/return", returnBook); // Return a book

module.exports = router;
