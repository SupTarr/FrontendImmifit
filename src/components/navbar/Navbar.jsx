import React from "react";
import "./navbar.css";
import Logo from "./immifit.svg";

function Navbar() {
  return (
    <div className="bg-[#fbc3bc]">
      <div className="navbar flex flex-col-2 mx-auto max-w-[1200px]">
        <img src={Logo} alt="logo" className="max-w-[80px]" />
        {/* <div className="welcome"><p className="text-xl">Welcome to your exercise tracker</p></div> */}
        <div className="navbar-text flex">
          <a href="/"><p className="font-bold text-md mx-[20px] text-[#ff5757]">Home</p></a>
          <a href="/login/:id"><p className="font-bold text-md mx-[20px] text-[#ff5757]">Login</p></a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;