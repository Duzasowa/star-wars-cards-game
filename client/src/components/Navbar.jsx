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
          <li>
            <Link to={"/"} className="offDecorationLine nav-item">
              <div className="nav-link">Home page</div>
            </Link>
          </li>
          <li>
            <Link to={"/"} className="offDecorationLine nav-item">
              <div className="nav-link">Featured</div>
            </Link>
          </li>
          <li>
            <Link to={"/cart-list"} className="offDecorationLine nav-item">
              <div className="nav-link">Collection cart</div>
            </Link>
          </li>
          <li>
            <Link to={"*"} className="offDecorationLine nav-item">
              <div className="nav-link">Contact</div>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
