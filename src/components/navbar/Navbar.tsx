import React, { useContext } from "react";
import "./navbar.css";
import Logo from "./immifit.svg";
import AuthContext from "../../context/AuthProvider";
import { useNavigate, useLocation, Location, NavigateFunction } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPlus, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface AuthContextType {
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
}

interface LocationState {
  from?: {
    pathname?: string;
  };
}

function Navbar(): JSX.Element {
  const { setAuth } = useContext(AuthContext) as AuthContextType;

  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const state = location.state as LocationState;

  const handleClickHome = (): void => {
    const from: string = state?.from?.pathname || "/";
    navigate(from, { replace: true });
  };

  const handleClickAddAc = (): void => {
    const from: string = state?.from?.pathname || "/form";
    navigate(from, { replace: true });
  };

  const handleClickLogout = (): void => {
    setAuth({});
    const from: string = state?.from?.pathname || "/login";
    navigate(from, { replace: true });
  };
  
  return (
    <div className="bg-[#fbc3bc] rounded-b-xl">
      <div className="navbar flex flex-col-2 mx-auto max-w-[1200px] mb-5">
        <img src={Logo} alt="logo" className="max-w-[80px]" />
        {/* <div className="welcome"><p className="text-xl">Welcome to your exercise tracker</p></div> */}
        <div className="navbar-text flex mobile:hidden">
          <button
            onClick={handleClickHome}
            className="font-bold text-md mx-[20px] text-[#ff5757]"
          >
            Home
          </button>
          <button
            onClick={handleClickAddAc}
            className="font-bold text-md mx-[20px] text-[#ff5757]"
          >
            Add Activities
          </button>
          <button
            onClick={handleClickLogout}
            className="font-bold text-md mx-[20px] text-[#ff5757]"
          >
            Logout
          </button>
        </div>
        <div className="navbar-text-mobile flex sm:hidden content-center">
          <button onClick={handleClickHome}>
            <FontAwesomeIcon
              icon={faHouse as IconDefinition}
              size="1x"
              className="text-[#ff5757] mr-7"
            />
          </button>
          <button onClick={handleClickAddAc}>
            <FontAwesomeIcon
              icon={faPlus as IconDefinition}
              size="1x"
              className="text-[#ff5757] mr-7"
            />
          </button>
          <button onClick={handleClickLogout}>
            <FontAwesomeIcon
              icon={faRightFromBracket as IconDefinition}
              size="1x"
              className="text-[#ff5757]"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

