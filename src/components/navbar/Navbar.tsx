import React, { useContext } from "react";
import "./navbar.css";
import Logo from "/immifit.svg";
import AuthContext from "../../context/AuthProvider";
import {
  useNavigate,
  useLocation,
  Location,
  NavigateFunction,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
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
    <div className="rounded-b-xl bg-[#fbc3bc]">
      <div className="flex-col-2 navbar mx-auto mb-5 flex max-w-[1200px]">
        <img src={Logo} alt="logo" className="max-w-[80px]" />
        {/* <div className="welcome"><p className="text-xl">Welcome to your exercise tracker</p></div> */}
        <div className="navbar-text flex mobile:hidden">
          <button
            onClick={handleClickHome}
            className="text-md mx-[20px] font-bold text-[#ff5757]"
          >
            Home
          </button>
          <button
            onClick={handleClickAddAc}
            className="text-md mx-[20px] font-bold text-[#ff5757]"
          >
            Add Activities
          </button>
          <button
            onClick={handleClickLogout}
            className="text-md mx-[20px] font-bold text-[#ff5757]"
          >
            Logout
          </button>
        </div>
        <div className="navbar-text-mobile flex content-center sm:hidden">
          <button onClick={handleClickHome}>
            <FontAwesomeIcon
              icon={faHouse as IconDefinition}
              size="1x"
              className="mr-7 text-[#ff5757]"
            />
          </button>
          <button onClick={handleClickAddAc}>
            <FontAwesomeIcon
              icon={faPlus as IconDefinition}
              size="1x"
              className="mr-7 text-[#ff5757]"
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
