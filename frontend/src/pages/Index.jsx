import React, { useEffect, useState } from 'react';
import axios from 'axios';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Index = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await axios.get('http://localhost:8000/api/books');
        setBooks(books.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);


  const handleBorrow = async (bookId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Please login first!');
        return;
      }
  
      const response = await axios.put(
        `http://localhost:8000/api/books/${bookId}/borrow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        // Success message
        alert(response.data.message);
  
        // Update the availability of the book and assign it to the user
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === bookId
              ? { ...book, isAvailable: false, borrowedBy: response.data.borrowedBy }
              : book
          )
        );
      } else {
        alert('Failed to borrow the book.');
      }
    } catch (error) {
      console.error('Error borrowing book:', error.response ? error.response.data.message : error.message);
      alert(error.response ? error.response.data.message : 'Error borrowing book');
    }
  };
  
  return (
    <section id="section-blog" className="blog-section">
      <div className="container">
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
                      <button className="btn btn-primary mt-4" onClick={() => handleBorrow(book._id)} disabled={!book.isAvailable}>
                        {book.isAvailable ? 'Borrow' : 'Not Available'}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No books available</p>
              )}
            </div>
          </div>
          {/* Sidebar */}
          <div className="col-md-3 d-flex flex-column gap-4 border rounded-2 p-4 sidebar">
            {/* Search Box */}
            <div className="search-box">
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

        {/* Pagination */}
        <div className="pagination-wrap my-7">
          <ul className="d-flex justify-content-start align-items-center gap-3 ps-0">
            <li><a href="#">1</a></li>
            <li className="active"><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Index;
