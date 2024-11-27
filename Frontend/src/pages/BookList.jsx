import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/books/${id}`);
            setBooks(books.filter((book) => book._id !== id));
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div className="book-list">
            <h2>Available Books</h2>
            <Link to="/add-book" className="btn">Add New Book</Link>
            <ul>
                {books.map((book) => (
                    <li key={book._id}>
                        <Link to={`/books/${book._id}`}>{book.title}</Link> - {book.author}
                        <button onClick={() => handleDelete(book._id)} className="delete-btn">
                            Delete
                        </button>
                        <Link to={`/edit-book/${book._id}`} className="edit-btn">Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
