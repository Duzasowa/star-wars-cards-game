import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <input type="checkbox" id="toggle"></input>
      <nav>
        <Link to={`/`}>
          <Logo />
        </Link>

        <label className="navbar-toggler" htmlFor="toggle">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </label>

        <ul className="nav-list">
          <Link to={"/"} className="offDecorationLine">
            <div className="nav-item">
              <div className="nav-link">Home page</div>
            </div>
          </Link>
          <Link to={"/"} className="offDecorationLine">
            <div className="nav-item">
              <div className="nav-link">Featured</div>
            </div>
          </Link>
          <Link to={"/cart-list"} className="offDecorationLine">
            <div className="nav-item">
              <div className="nav-link">Collection cart</div>
            </div>
          </Link>
          <Link to={"*"} className="offDecorationLine">
            <div className="nav-item">
              <div className="nav-link">Contact</div>
            </div>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
