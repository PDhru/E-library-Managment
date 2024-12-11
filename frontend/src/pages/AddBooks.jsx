import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const AddBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('You need to log in first.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('genre', genre);
    formData.append('publicationDate', publicationDate);
    if (image) formData.append('image', image);  // Only append image if selected

    try {
      const response = await axios.post('http://localhost:8000/api/books/add', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });

      if (response.status === 201) {
        toast.success('Book added successfully!');
        setTitle('');
        setAuthor('');
        setGenre('');
        setPublicationDate('');
        setImage(null);
      }
    } catch (error) {
      toast.error('Failed to add book. Please try again.');
      console.error(error);
    }
  };

  return (
    <section className="contact-section py-5">
      <div className="container">
        <div className="row contact gx-5 p-2 my-5">
          <h2 className="text-center">Add Books Here!</h2>
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
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
                <div className="pt-4">
                  <button type="submit" className="btn btn-primary">Add Book</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddBooks;
