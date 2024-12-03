import React from 'react'

const Header = () => {
    return (
        <header id="navbar_top" className="bg-white">
            <div className="container">
                <nav className="navbar navbar-expand-lg  py-3">
                    {/*site logo */}
                    <a className="navbar-brand" href="index.html">
                        <img src="assets/images/logo.png" alt="Site Logo" width={200} />
                    </a>
                    <button className="navbar-toggler me-3 ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item"><a className="nav-link" aria-current="page" href="/">Home</a></li>
                            <li className="nav-item"><a className="nav-link" aria-current="page" href="/addbooks">Add Books</a></li>
                            <li className="nav-item"><a className="nav-link" aria-current="page" href="index.html">Borrowed Books</a></li>
                        </ul>
                        <button className='btn btn-primary'>Logout</button>
                    </div>
                    {/* .collapse */}
                    <div className="header-seperator" />
                </nav>
            </div>
        </header>

    )
}

export default Header