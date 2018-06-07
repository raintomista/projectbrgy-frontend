import React from 'react';
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav className="navbar navbar-expand-md fixed-top navbar-dark">
    <div className="mx-auto order-0">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="navbar-nav">
          <Link to="/login" className="navbar-brand">Logo</Link>
        </div>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        </form>
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="#">Menu
            <span className="sr-only">(current)</span>
          </a>
        </div>
      </div>
    </div>
  </nav>
);

export default NavBar;