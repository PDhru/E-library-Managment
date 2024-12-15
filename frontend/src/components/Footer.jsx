import React from 'react'

const Footer = () => {
    return (
<footer id="footer" className="footer pt-5">
  <div className="container">
    <div className="row g-4">
      <div className="col-md-4">
        <a href="#"><img src="assets/images/library-logo.png" alt="Footer logo" width={150} className="img-fluid mb-3" /></a>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, eius ipsum dolor sit amet, consectetur
          adipiscing eliteius.</p>
        <ul className="d-flex gap-3 ps-0 pt-4 social-icons">
          <li><a href="#" target="_blank"><i className="fa-brands fa-facebook-f" /></a></li>
          <li><a href="#" target="_blank"><i className="fa-brands fa-twitter" /></a></li>
          <li><a href="#" target="_blank"><i className="fa-brands fa-linkedin-in" /></a></li>
          <li><a href="#" target="_blank"><i className="fa-brands fa-instagram" /></a></li>
        </ul>
      </div>
      <div className="col-md-2">
        <h4 className="mb-4">Download</h4>
        <ul className="ps-0 footer-content">
          <li className="list-unstyled mb-3"><a href="#">Company</a></li>
          <li className="list-unstyled mb-3"><a href="#">Android App</a></li>
          <li className="list-unstyled mb-3"><a href="#">ios App</a></li>
          <li className="list-unstyled mb-3"><a href="#">Desktop</a></li>
        </ul>
      </div>
      <div className="col-md-2">
        <h4 className="mb-4">Help?</h4>
        <ul className="ps-0 footer-content">
          <li className="list-unstyled mb-3"><a href="#">FAQ</a></li>
          <li className="list-unstyled mb-3"><a href="#">Privacy</a></li>
          <li className="list-unstyled mb-3"><a href="#">Terms &amp; Condition</a></li>
          <li className="list-unstyled mb-3"><a href="#">Reporting</a></li>
        </ul>
      </div>
      <div className="col-md-4">
        <h4 className="mb-4">Get In Touch</h4>
        <ul className="ps-0">
          <li className="list-unstyled mb-3">
            <i className="bi bi-geo-alt" />
            <span className="ms-1">1428 Callison Laney Buoy Building 201/VRY Virginia, VA 22902</span>
          </li>
          <li className="list-unstyled">
            <i className="bi bi-telephone" />
            <span className="ms-1">+62 9282739-44-539</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>

    )
}

export default Footer