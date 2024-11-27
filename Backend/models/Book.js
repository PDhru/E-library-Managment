const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true, // True if the book is available for borrowing
  },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user who borrowed the book
    default: null,
  },
});

module.exports = mongoose.model("Book", bookSchema);
