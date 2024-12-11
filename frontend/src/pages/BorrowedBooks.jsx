import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          alert('Please log in to view your borrowed books.');
          return;
        }

        // Fetch only books borrowed by the logged-in user
        const response = await axios.get('http://localhost:8000/api/books/borrowed', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update state with the list of borrowed books
        setBorrowedBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
        setLoading(false);
      }
    };

    fetchBorrowedBooks();
  }, []);  // Empty dependency array ensures this runs once when the component mounts

  const handleReturn = async (bookId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Please log in to return a book.');
        return;
      }

      const response = await axios.put(
        `http://localhost:8000/api/books/${bookId}/return`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Book returned successfully');
        // Remove the returned book from the list
        setBorrowedBooks(borrowedBooks.filter(book => book._id !== bookId));
      }
    } catch (error) {
      console.error('Error returning the book:', error);
      alert('Failed to return the book. Please try again later.');
    }
  };

  if (loading) {
    return <p>Loading borrowed books...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Your Borrowed Books</h2>
      {borrowedBooks.length === 0 ? (
        <p>You have not borrowed any books yet.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publication Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map(book => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{new Date(book.publicationDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleReturn(book._id)}
                  >
                    Return Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BorrowedBooks;
