import React from "react";
import "./navbar.css";
import Logo from "./immifit.svg";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClickHome = () => {
    const from = location.state?.from?.pathname || "/";
    navigate(from, { replace: true });
  }

  const handleClickAddAc = () => {
    const from = location.state?.from?.pathname || "/form";
    navigate(from, { replace: true });
  }

  const handleClickLogout = () => {
    setAuth({});
    const from = location.state?.from?.pathname || "/login";
    navigate(from, { replace: true });
  }

  return (
    <div className="bg-[#fbc3bc] rounded-b-xl">
      <div className="navbar flex flex-col-2 mx-auto max-w-[1200px] mb-5">
        <img src={Logo} alt="logo" className="max-w-[80px]" />
        {/* <div className="welcome"><p className="text-xl">Welcome to your exercise tracker</p></div> */}
        <div className="navbar-text flex mobile:hidden">
          <button onClick={handleClickHome} className="font-bold text-md mx-[20px] text-[#ff5757]">Home</button>
          <button onClick={handleClickAddAc} className="font-bold text-md mx-[20px] text-[#ff5757]">Add Activities</button>
          <button onClick={handleClickLogout} className="font-bold text-md mx-[20px] text-[#ff5757]">Logout</button>
        </div>
        <div className="navbar-text-mobile flex sm:hidden content-center">
          <button onClick={handleClickHome}><FontAwesomeIcon icon={faHouse} size="xl" className="text-[#ff5757] mr-7" /></button>
          <button onClick={handleClickAddAc}><FontAwesomeIcon icon={faPlus} size="xl" className="text-[#ff5757] mr-7" /></button>
          <button onClick={handleClickLogout}><FontAwesomeIcon icon={faRightFromBracket} size="xl" className="text-[#ff5757]" /></button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;