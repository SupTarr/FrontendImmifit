import React from "react";
import "./navbar.css";
import Logo from "./immifit.svg";

function Navbar() {
  return (
    <div className="navbar flex flex-col-2">
      <img src={Logo} alt="logo" className="max-w-[80px]"/>
      {/* <div className="welcome"><p className="text-xl">Welcome to your exercise tracker</p></div> */}
      <div className="navbar-text flex">
      <p className="text-md mx-[20px] text-white">Sign Up</p>
      <p className="text-md mx-[20px] text-white">Login</p>
      <p className="text-md mx-[20px] text-white">Profile</p>
      </div>
      
    </div>
  );
}

export default Navbar;