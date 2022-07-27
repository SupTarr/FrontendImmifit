import React from "react";
import "./navbar.css";
import Logo from "./immifit.svg";

function Navbar() {
  return (
    <div className="navbar">
      <img src={Logo} alt="logo" />
      <h1>Welcome to your exercise tracker</h1>
    </div>
  );
}

export default Navbar;