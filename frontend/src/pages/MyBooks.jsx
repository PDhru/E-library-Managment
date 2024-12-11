import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyBooks = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:8000/api/books/my-books', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBooks(response.data);
            } catch (error) {
                toast.error('Failed to fetch books. Please try again.');
            }
        };
        fetchBooks();
    }, []);

    const handleDelete = async (bookId) => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`http://localhost:8000/api/books/${bookId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Book deleted successfully.');
            setBooks(books.filter(book => book._id !== bookId)); // Remove deleted book from state
        } catch (error) {
            toast.error('Failed to delete the book.');
        }
    };

    const handleUpdate = (bookId) => {
        navigate(`/update-book/${bookId}`); // Redirect to the update page
    };

    return (
        <div className="container">
            <h2 className="text-center my-5">My Books</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.length > 0 ? (
                        books.map((book) => (
                            <tr key={book._id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.genre}</td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleUpdate(book._id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-danger ms-2"
                                        onClick={() => handleDelete(book._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                No books available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyBooks;
