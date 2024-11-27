import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import BookForm from './components/BookForm';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/add-book" element={<BookForm mode="add" />} />
        <Route path="/edit-book/:id" element={<BookForm mode="edit" />} />
      </Routes>
    </Router>
  );
}

export default App;
