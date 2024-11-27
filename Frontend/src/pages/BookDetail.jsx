import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../Book.css'

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/books/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBook();
    }, [id]);

    if (!book) {
        return (
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <h2 className="card-title text-center mb-4">{book.title}</h2>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="text-muted">Author</label>
                                        <p className="h5">{book.author}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="text-muted">Genre</label>
                                        <p className="h5">{book.genre}</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="text-muted">Publication Date</label>
                                        <p className="h5">{new Date(book.publicationDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="text-muted">Status</label>
                                        <p className={`h5 ${book.availability ? 'text-success' : 'text-danger'}`}>
                                            {book.availability ? 'Available' : 'Not Available'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <Link to="/" className="btn btn-primary">
                                    Back to Book List
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
