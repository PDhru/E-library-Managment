import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from 'react-toastify';

const Layout = () => {
    return (
        <>
        <Header />
        <ToastContainer /> 
        <section className="header-banner bookpress-parallax" id="header-banner-id">
            <div className="container d-flex justify-content-between align-items-center text-white">
                <div className="overlay-out">
                    <h1 className="banner-title">Authors Books</h1>
                    <p className="text-white"><a href="index.html" className="text-decoration-none text-white">Home</a> /
                        <a href="products.html" className="text-decoration-none text-white">Products</a>
                    </p>
                </div>
                <img src="assets/images/banner-image.png" className="img-fluid" alt="Books" />
                <div className="parallax start-0 top-0 w-100 h-100" />
            </div>
        </section>{/* header banner end */}
        {/* blog section */}
        <Outlet/>
        <a href="#header-banner-id" className="back-to-top"><i className="fa-solid fa-arrow-up" /></a>
        <Footer/>
    </>

    )
}

export default Layout