import { Link } from "react-router-dom";
import { Login } from "../const/Links.ts";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const logout = useLogout();

  return (
    <div className="navbar bg-base-300 fixed top-0 left-0 z-50 w-full shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Immifit
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={Login} className="link" onClick={logout}>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
