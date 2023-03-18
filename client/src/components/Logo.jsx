import React from "react";
import logoImage from "../assets/images/logo.png";

function Logo() {
  return (
    <img style={{ width: 50, height: 50 }} src={logoImage} alt="My Logo" />
  );
}

export default Logo;
