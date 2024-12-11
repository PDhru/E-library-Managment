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
    const books = await Book.find().populate('borrowedBy', 'name email'); // Adjust fields as necessary
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Failed to fetch books. Please try again.' });
  }
};

exports.updateBook = async (req, res) => {
  const { title, author, genre, publicationDate } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Optional image upload

  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the logged-in user is the one who added the book
    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this book." });
    }

    // Send the current book details back before updating
    if (req.method === "PUT" && req.body) {
      book.title = title || book.title;
      book.author = author || book.author;
      book.genre = genre || book.genre;
      book.publicationDate = publicationDate || book.publicationDate;
      if (imageUrl) book.imageUrl = imageUrl; // Update image if a new one is uploaded

      await book.save();
      return res.status(200).json(book); // Return the updated book
    } else {
      return res.status(200).json(book); // If it's a GET-like request, return the book data without changes
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update the book. Please try again." });
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
exports.borrowBook = async (req, res) => {
  const userId = req.user._id; // Get the logged-in user's ID from the JWT token

  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if the book is available for borrowing
    if (!book.isAvailable) {
      return res.status(400).json({ message: 'Book is already borrowed' });
    }

    // Update the book's borrowedBy field and availability
    book.borrowedBy = userId;
    book.isAvailable = false; 
    await book.save();

    res.status(200).json({ 
      message: 'Book borrowed successfully', 
      borrowedBy: book.borrowedBy 
    });
  } catch (error) {
    console.error('Error borrowing book:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
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
  const { id } = req.params;
  const userId = req.user._id;

  try {
    // Find the book by ID
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Ensure the user has borrowed the book
    if (book.borrowedBy.toString() !== userId.toString()) {
      return res.status(400).json({ message: 'You can only return books that you have borrowed' });
    }

    // Mark the book as available again
    book.isAvailable = true;
    book.borrowedBy = null;

    await book.save();

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    console.error('Error returning book:', error);
    res.status(500).json({ message: 'Failed to return the book. Please try again later.' });
  }
};


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
//     book.isAvailable = false; // Mark as unavailable
//     await book.save(); // Ensure changes are saved

//     res.status(200).json({
//       message: 'Book borrowed successfully',
//       borrowedBy: userId // Send the user ID who borrowed the book
//     });
//   } catch (error) {
//     console.error('Error borrowing book:', error);
//     res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// };

// // Get Borrowed Books Controller (Show borrowed books by the current logged-in user)
// exports.getBorrowedBooks = async (req, res) => {
//   const userId = req.user._id; // Get the logged-in user's ID

//   try {
//     // Fetch books where borrowedBy is equal to the current user's ID
//     const borrowedBooks = await Book.find({ borrowedBy: userId }).exec();

//     console.log("You are borrowing these books: ", borrowedBooks); // Debugging line

//     if (!borrowedBooks || borrowedBooks.length === 0) {
//       return res.status(404).json({ message: 'No borrowed books found' });
//     }

//     res.status(200).json(borrowedBooks);  // Only return books borrowed by the user
//   } catch (error) {
//     console.error('Error fetching borrowed books:', error);
//     res.status(500).json({ message: 'Failed to fetch borrowed books' });
//   }
// };
// // Return a borrowed book Controller
// exports.returnBook = async (req, res) => {
//   const { id } = req.params;
//   const userId = req.user._id;

//   try {
//     // Find the book by ID
//     const book = await Book.findById(id);

//     if (!book) {
//       return res.status(404).json({ message: 'Book not found' });
//     }

//     // Ensure the user has borrowed the book (check borrowedBy field)
//     if (book.borrowedBy.toString() !== userId.toString()) {
//       return res.status(400).json({ message: 'You can only return books that you have borrowed' });
//     }
//     book.isAvailable = true;
//     book.borrowedBy = null;
//     await book.save();
//     res.status(200).json({ message: 'Book returned successfully' });
//   } catch (error) {
//     console.error('Error returning book:', error);
//     res.status(500).json({ message: 'Failed to return the book. Please try again later.' });
//   }
// };