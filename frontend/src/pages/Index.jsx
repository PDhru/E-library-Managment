// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// const currentUserId = localStorage.getItem('userId');

// const formatDate = (dateString) => {
//   const options = { year: 'numeric', month: 'long', day: 'numeric' };
//   return new Date(dateString).toLocaleDateString(undefined, options);
// };

// const Index = () => {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/books');
//         setBooks(response.data);
//       } catch (error) {
//         console.error('Error fetching books:', error);
//       }
//     };
//     fetchBooks();
//   }, []);

//   const handleBorrow = async (bookId) => {
//     try {
//       const response = await fetch(`http://localhost:8000/api/books/borrow/${bookId}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//         },
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert('Book borrowed successfully');
//         // Refetch books after borrowing to ensure the state is up-to-date
//         const updatedBooksResponse = await axios.get('http://localhost:8000/api/books');
//         setBooks(updatedBooksResponse.data); // Update the state with the fresh book data
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error('Error borrowing book:', error);
//       alert('Error borrowing book');
//     }
//   };

//   const handleReturn = async (bookId) => {
//     try {
//       const response = await fetch(`http://localhost:8000/api/books/return/${bookId}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//         },
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert('Book returned successfully');
//         setBooks((prevBooks) =>
//           prevBooks.map((book) =>
//             book._id === bookId ? { ...book, isAvailable: true, borrowedBy: null } : book
//           )
//         );
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error('Error returning book:', error);
//       alert('Error returning book');
//     }
//   };
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Index = () => {
  const [books, setBooks] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null); // Store the current user ID
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error('No auth token found');
          return;
        }
        const response = await axios.get('http://localhost:8000/api/auth/current-user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userId = response.data._id; // Store the fetched user ID in a variable
        setCurrentUserId(userId); // Update state
        console.log(userId); // Log the fetched user ID directly
      } catch (error) {
        console.error('Error fetching current user:', error.response || error.message);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);
  const handleBorrow = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/books/borrow/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ borrowedBy: currentUserId }),
      });
      const data = await response.json();
      console.log(data)
      if (response.ok) {

        alert('Book borrowed successfully');
        // Refetch books after borrowing to ensure the state is up-to-date
        const updatedBooksResponse = await axios.get('http://localhost:8000/api/books');
        setBooks(updatedBooksResponse.data); // Update the state with the fresh book data
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error borrowing book:', error);
      alert('Error borrowing book');
    }
  };

  const handleReturn = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/books/return/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        alert('Book returned successfully');
        const updatedBooksResponse = await axios.get('http://localhost:8000/api/books');
        setBooks(updatedBooksResponse.data); // Update the state with the fresh book data
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error returning book:', error);
      alert('Error returning book');
    }
  };

  return (
    <section id="section-blog" className="blog-section">
      <div className="container mb-3">
        <div className="row gx-5 gy-4">
          {/* Books Listing */}
          <div className="col-md-9">
            <div className="row row-cols-2 row-cols-md-3 gx-4 gy-4">
              {books.length > 0 ? (
                books.map((book) => (
                  <div className="col" key={book._id}>
                    <div className="bg-white p-3 bordered-shadow">
                      <img
                        src={book.imageUrl ? `http://localhost:8000${book.imageUrl}` : "assets/images/default-book.png"}
                        alt={book.title}
                        className="img-fluid"
                      />
                      <p className="py-2">{book.genre}</p>
                      <a href={`product-single/${book._id}`} className="text-decoration-none">
                        <h3>{book.title}</h3>
                      </a>
                      <span className='publicationDate'>{formatDate(book.publicationDate)}</span>
                      <div className="d-flex justify-content-between pt-3">
                        <h4 className="fs-6">Written By: {book.author}</h4>
                      </div>
                      {book.isAvailable ? (
                        <button
                          className="btn btn-primary mt-4"
                          onClick={() => handleBorrow(book._id)}
                        >
                          Borrow
                        </button>
                      ) : book.borrowedBy._id === currentUserId ? (
                        <button
                          className="btn btn-success mt-4"
                          onClick={() => handleReturn(book._id)}
                        >
                          Return
                        </button>
                      ) : (
                        <button className="btn btn-secondary mt-4" disabled>
                          Not Available
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No books available</p>
              )}
            </div>
          </div>
        {/* Sidebar */}
        < div className="col-md-3 d-flex flex-column gap-4 border rounded-2 p-4 sidebar" >
          {/* Search Box */}
          <div div className="search-box" >
            <input type="search" className="form-control ps-4" name="s" placeholder="Search..." />
            <i className="bi bi-search" />
          </div>
          {/* Popular Category */}
          <div className="blog-category">
            <h3 className="py-3 border-bottom">Popular Category</h3>
            <ul className="mt-3 ps-0">
              <li className="list-unstyled"><a href="#" className="ms-2">Biography</a></li>
              <li className="list-unstyled"><a href="#" className="ms-2">Uncategorized</a></li>
              <li className="list-unstyled"><a href="#" className="ms-2">Art &amp; Design</a></li>
              <li className="list-unstyled"><a href="#" className="ms-2">Romance</a></li>
              <li className="list-unstyled"><a href="#" className="ms-2">Drama</a></li>
              <li className="list-unstyled"><a href="#" className="ms-2">Sports</a></li>
            </ul>
          </div>
          {/* Tags */}
          <div>
            <h3 className="py-3 border-bottom">BookPress Tags</h3>
            <span className="d-block mt-3">Biography, bestseller, adventure, biography Design, Fiction, Novel, Books</span>
          </div>
          {/* Social Links */}
          <div className="social-links">
            <h3 className="py-3 border-bottom">Follow Us:</h3>
            <ul className="mt-3 d-flex gap-4 ps-0">
              <li className="list-unstyled"><a href="#" target="_blank"><i className="fa-brands fa-facebook-f" /></a></li>
              <li className="list-unstyled"><a href="#" target="_blank"><i className="fa-brands fa-twitter" /></a></li>
              <li className="list-unstyled"><a href="#" target="_blank"><i className="fa-brands fa-linkedin-in" /></a></li>
              <li className="list-unstyled"><a href="#" target="_blank"><i className="fa-brands fa-instagram" /></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div >
    </section >
  );
};

export default Index;
