const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationDate: { type: Date, required: true },
    imageUrl: { type: String }, 
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    isAvailable: { type: Boolean, default: true },
    borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },  
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;