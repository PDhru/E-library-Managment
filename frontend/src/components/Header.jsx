import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
    return (
        <header id="navbar_top" className="bg-white">
            <div className="container">
                <nav className="navbar navbar-expand-lg  py-3">
                    <a className="navbar-brand" href="index.html">
                        <img src="assets/images/logo.png" alt="Site Logo" width={200} />
                    </a>
                    <button className="navbar-toggler me-3 ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link className="nav-link" aria-current="page" to={"/"}>Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" aria-current="page" to={"/addbooks"}>Add Books</Link></li>
                            <li className="nav-item"><Link className="nav-link" aria-current="page" to={"/borrowed-books"}>Borrowed Books</Link></li>
                            <li className="nav-item"><Link className="nav-link" aria-current="page" to={"/my-books"}>My Books</Link></li>
                        </ul>
                        <button className='btn btn-primary' onClick={handleLogout} >Logout</button>
                    </div>
                    <div className="header-seperator" />
                </nav>
            </div>
        </header>

    )
}

export default Header