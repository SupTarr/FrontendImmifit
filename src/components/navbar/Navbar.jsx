import React from "react";
import "./navbar.css";
import Logo from "./immifit.svg";

function Navbar() {
  return (
    <div className="navbar ">
      <img src={Logo} alt="logo" />
      <h1>Welcome <span>to your exercise tracker</span></h1>
    </div>
  );
}

export default Navbar;