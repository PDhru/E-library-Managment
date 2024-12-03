const express = require("express");
const {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
} = require("../controllers/bookController");
const {
  authMiddleware,
  authenticateUser,
} = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();

router.post("/add", upload.single("image"), addBook);
router.put("/:id", upload.single("image"), updateBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.delete("/:id", deleteBook);
router.put("/:id/borrow", authenticateUser, borrowBook);
router.put("/return/:id", authMiddleware, returnBook);

module.exports = router;
