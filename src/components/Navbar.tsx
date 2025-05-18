import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../const/Links.ts";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async (): Promise<void> => {
    setIsLoggingOut(true);

    try {
        await axios
          .post(
            "/auth/logout",
            {},
            { headers: { Authorization: `Bearer ${auth.accessToken}` } }
          )
          .catch((error) => {

            console.error("Logout API error:", error);
          });
      

      setAuth({});
      localStorage.removeItem("authData");
      navigate(Login);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="navbar bg-base-300 fixed top-0 left-0 z-50 w-full shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Immifit
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {auth?.accessToken ? (
            <li>
              <button
                className="link"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Logging out...
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            </li>
          ) : (
            <li>
              <Link className="link" to={Login}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
