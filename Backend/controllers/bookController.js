const Book = require('../models/Book');

// Add a new book
exports.addBook = async (req, res) => {
    const { title, author, genre, publicationDate } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;  // Get image path from Multer
  
    try {
      const newBook = new Book({
        title,
        author,
        genre,
        publicationDate,
        imageUrl,  // Save image URL to the database
      });
      await newBook.save();
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update book details
exports.updateBook = async (req, res) => {
    const { title, author, genre, publicationDate } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;
  
    try {
      const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        { title, author, genre, publicationDate, imageUrl },
        { new: true }
      );
      res.status(200).json(updatedBook);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (!book.isAvailable) {
      return res.status(400).json({ message: 'Book is already borrowed' });
    }

    book.isAvailable = false;
    book.borrowedBy = req.user.id;  // Assuming req.user contains authenticated user details
    await book.save();

    res.status(200).json({ message: 'Book borrowed successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};


  
  // Return a book
  exports.returnBook = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      if (book.isAvailable) {
        return res.status(400).json({ message: 'Book is not borrowed' });
      }
  
      if (book.borrowedBy.toString() !== req.user.id) {
        return res.status(401).json({ message: 'You cannot return a book you did not borrow' });
      }
  
      book.isAvailable = true;
      book.borrowedBy = null;  // Remove the association with the user
      await book.save();
  
      res.status(200).json({ message: 'Book returned successfully', book });
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
