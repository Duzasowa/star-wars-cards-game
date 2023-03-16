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

        <label class="navbar-toggler" for="toggle">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </label>

        <ul class="nav-list">
          <div class="nav-item">
            <Link to={"/"} class="nav-link">
              Home page
            </Link>
          </div>
          <div class="nav-item">
            <Link class="nav-link">In progress...</Link>
          </div>
          <div class="nav-item">
            <Link to={"/cart-list"} class="nav-link">
              Collection cart
            </Link>
          </div>
          <div class="nav-item">
            <Link to={"*"} class="nav-link">
              Contact
            </Link>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
