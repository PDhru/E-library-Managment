import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav classname="navbar">
      <h1>E-Library</h1>
      <div>
        <link to="/" />
        Home
        <link to="/books" />
        Books
      </div>
    </nav>
  );
};

export default Navbar;
