import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    // Fetch book data before editing
    const fetchBook = async () => {
      try {
        const response = await axios.put(`http://localhost:8000/api/books/edit/${id}`, {}, { headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` } });
        setBook(response.data);  // Set the fetched book data
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setGenre(response.data.genre);
        const formattedDate = response.data.publicationDate.slice(0, 10); // Extract yyyy-mm-dd
        setPublicationDate(formattedDate);
      } catch (error) {
        setMessage('Failed to load book details.');
        console.error(error);
      }
    };

    fetchBook();
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
      setMessage('You need to log in first.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('genre', genre);
    formData.append('publicationDate', publicationDate);
    if (image) formData.append('image', image); // Append new image if selected

    try {
      const response = await axios.put(
        `http://localhost:8000/api/books/edit/${id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage('Book updated successfully!');
        setTimeout(() => {
          navigate('/'); 
        }, 2000);
      }
    } catch (error) {
      setMessage('Failed to update book. Please try again.');
      console.error(error);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <section className="contact-section py-5">
    <div className="container">
      <div className="row contact gx-5 p-2 my-5">
        <h2 className="text-center">Edit Book</h2>
        {message && <p className="text-center text-success">{message}</p>}
        <form className="mt-5" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row row-cols-1 row-cols-md-2 gx-5">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Book Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Enter book title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="author" className="form-label">Book Author</label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  placeholder="Enter book author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="genre" className="form-label">Book Genre</label>
                <input
                  type="text"
                  className="form-control"
                  id="genre"
                  placeholder="Enter book genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="publicationDate" className="form-label">Publication Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="publicationDate"
                  value={publicationDate}
                  onChange={(e) => setPublicationDate(e.target.value)}
                  required
                />
              </div>
              <div className="my-5">
                <h5>* Upload a cover image for the book.</h5>
              </div>
            </div>
            <div className="col">
              <label htmlFor="image" className="form-label">Book Cover Image</label>
              {book.imageUrl && (
                <div className="mb-3">
                  <img
                    src={`http://localhost:8000${book.imageUrl}`} // Make sure to construct the full URL
                    alt="Book Cover"
                    style={{ maxWidth: '200px', marginBottom: '10px' }}
                  />
                </div>
              )}
              <input
                type="file"
                className="form-control"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className="pt-4">
                <button type="submit" className="btn btn-primary">Update Book</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
  );
};

export default EditBooks;
