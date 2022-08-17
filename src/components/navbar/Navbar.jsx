import React from "react";
import "./navbar.css";
import Logo from "./immifit.svg";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  return (
    <div className="bg-[#fbc3bc] rounded-b-xl">
      <div className="navbar flex flex-col-2 mx-auto max-w-[1200px] mb-5">
        <img src={Logo} alt="logo" className="max-w-[80px]" />
        {/* <div className="welcome"><p className="text-xl">Welcome to your exercise tracker</p></div> */}
        <div className="navbar-text flex mobile:hidden">
          <a href="/"><p className="font-bold text-md mx-[20px] text-[#ff5757]">Home</p></a>
          <a href="/form/"><p className="font-bold text-md mx-[20px] text-[#ff5757]">Add Activities</p></a>
          <a href="/login/"><p className="font-bold text-md mx-[20px] text-[#ff5757]">Logout</p></a>
        </div>
        <div className="navbar-text-mobile flex sm:hidden content-center">
          <a href="/"><FontAwesomeIcon icon={faHouse} size="xl" className="text-[#ff5757] mr-7" /></a>
          <a href="/form/"><FontAwesomeIcon icon={faPlus} size="xl" className="text-[#ff5757] mr-7" /></a>
          <a href="/login/"><FontAwesomeIcon icon={faRightFromBracket} size="xl" className="text-[#ff5757]" /></a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;