import React from 'react';
import { Link } from 'react-router-dom';
import '../Home.css'
const Home = () => {
    return (
        <div className="home-page">
            <h1>Welcome to the E-Library</h1>
            <p>Browse, borrow, and manage your favorite eBooks anytime, anywhere.</p>
            <div>
                <Link to="/books" className="btn">
                    View Books
                </Link>
            </div>
        </div>
    );
};

export default Home;
