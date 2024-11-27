import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BookForm = ({ mode }) => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        genre: '',
        publicationDate: '',
        availability: true,
    });
    const [error, setError] = useState('');
    const { id } = useParams(); // To get the book id for editing
    const navigate = useNavigate();

    // Fetch book details if in "Edit" mode
    useEffect(() => {
        if (mode === 'edit' && id) {
            axios
                .get(`http://localhost:5000/api/books/${id}`)
                .then((response) => {
                    setBook(response.data);
                })
                .catch((err) => {
                    console.error('Error fetching book details:', err);
                });
        }
    }, [mode, id]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, author, genre, publicationDate, availability } = book;

        // Validate form
        if (!title || !author || !genre || !publicationDate) {
            setError('All fields are required!');
            return;
        }

        const bookData = { title, author, genre, publicationDate, availability };

        if (mode === 'edit') {
            axios
                .put(`http://localhost:5000/api/books/${id}`, bookData)
                .then(() => {
                    navigate('/books');
                })
                .catch((err) => {
                    console.error('Error updating book:', err);
                });
        } else {
            axios
                .post('http://localhost:5000/api/books', bookData)
                .then(() => {
                    navigate('/books');
                })
                .catch((err) => {
                    console.error('Error adding book:', err);
                });
        }
    };

    const handleChange = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="book-form">
            <h2>{mode === 'edit' ? 'Edit Book' : 'Add New Book'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={book.title}
                    placeholder="Title"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="author"
                    value={book.author}
                    placeholder="Author"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="genre"
                    value={book.genre}
                    placeholder="Genre"
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="publicationDate"
                    value={book.publicationDate}
                    onChange={handleChange}
                />
                <div>
                    <label>
                        Available:
                        <input
                            type="checkbox"
                            name="availability"
                            checked={book.availability}
                            onChange={(e) => setBook({ ...book, availability: e.target.checked })}
                        />
                    </label>
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">{mode === 'edit' ? 'Update Book' : 'Add Book'}</button>
            </form>
        </div>
    );
};

export default BookForm;
