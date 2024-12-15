const Book = require("../models/Book");
const User = require("../models/User");

exports.addBook = async (req, res) => {
  const { title, author, genre, publicationDate } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Handle optional image upload

  try {
    // Ensure user is authenticated
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    // Validate required fields
    if (!title || !author || !genre || !publicationDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newBook = new Book({
      title,
      author,
      genre,
      publicationDate,
      imageUrl,
      addedBy: req.user._id, // Associate the book with the logged-in user
    });

    await newBook.save();
    res.status(201).json({ message: "Book added successfully!", book: newBook });
  } catch (error) {
    console.error("Error adding book:", error.message);
    res.status(500).json({ message: "Failed to add the book. Please try again later." });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('borrowedBy', 'name email');
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Failed to fetch books. Please try again.' });
  }
};

exports.updateBook = async (req, res) => {
  const { title, author, genre, publicationDate } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to edit this book." });
    }
    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.publicationDate = publicationDate || book.publicationDate;
    if (imageUrl) book.imageUrl = imageUrl;

    await book.save();
    res.status(200).json({ message: "Book updated successfully.", book });
  } catch (error) {
    console.error("Error updating book:", error.message);
    res.status(500).json({ message: "Failed to update the book. Please try again." });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book:", error.message);
    res.status(500).json({ message: "Failed to fetch the book. Please try again." });
  }
};


exports.getBooksByUser = async (req, res) => {
  try {
    const books = await Book.find({ addedBy: req.user._id });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books." });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.addedBy.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "You are not authorized to delete this book" });
    }
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// bookController.js
// exports.borrowBook = async (req, res) => {
//   const userId = req.user._id; // Get the logged-in user's ID from the JWT token

//   try {
//     const book = await Book.findById(req.params.bookId);

//     if (!book) {
//       return res.status(404).json({ message: 'Book not found' });
//     }

//     // Check if the book is available for borrowing
//     if (!book.isAvailable) {
//       return res.status(400).json({ message: 'Book is already borrowed' });
//     }

//     // Update the book's borrowedBy field and availability
//     book.borrowedBy = userId;
//     book.isAvailable = false;
//     await book.save();

//     // Fetch the updated book data with `borrowedBy` populated
//     const updatedBook = await Book.findById(req.params.bookId).populate(
//       'borrowedBy',
//       'name email' // Include desired fields from the User model
//     );

//     res.status(200).json({
//       message: 'Book borrowed successfully',
//       book: updatedBook, // Include the updated book with the borrowedBy field
//     });
//   } catch (error) {
//     console.error('Error borrowing book:', error);
//     res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// };
exports.borrowBook = async (req, res) => {
  try {
    const { id } = req.params; // Book ID from URL
    const userId = req.user._id; // Authenticated user's ID

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (!book.isAvailable) {
      return res.status(400).json({ message: 'Book is already borrowed' });
    }

    book.isAvailable = false;
    book.borrowedBy = userId;
    await book.save();

    const updatedBook = await Book.findById(id).populate('borrowedBy', 'name email');
    res.status(200).json({ message: 'Book borrowed successfully', book: updatedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error borrowing book' });
  }
};


exports.getBorrowedBooks = async (req, res) => {
  const userId = req.user.id;
  try {
    const borrowedBooks = await Book.find({ borrowedBy: userId }).exec();
    console.log("You are borrowing this book " +borrowedBooks);
    if (!borrowedBooks || borrowedBooks.length === 0) {
      return res.status(404).json({ message: 'No borrowed books found' });
    }
    res.status(200).json(borrowedBooks);
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    res.status(500).json({ message: 'Failed to fetch borrowed books' });
  }
};

// Return a borrowed book
exports.returnBook = async (req, res) => {
  try {
    const { id } = req.params; // Book ID from URL
    const userId = req.user._id; // Authenticated user's ID

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.borrowedBy?.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You did not borrow this book' });
    }

    book.isAvailable = true;
    book.borrowedBy = null;
    await book.save();

    res.status(200).json({ message: 'Book returned successfully', book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error returning book' });
  }
};
