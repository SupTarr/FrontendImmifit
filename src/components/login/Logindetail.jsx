import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./logindetail.css";
import axios from "../../api/axios";
// import Facebook from './facebook.png'
// import Line from './line.png'
// import Tel from './telephone.png'
// import Back from './previous.png'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": [
      "http://127.0.0.1:5173",
      "https://immifit.vercel.app/",
    ],
    withCredentials: "true",
  },
};

const Logindetail = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidUser(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/auth",
        JSON.stringify({ username: user, password: password }),
        config,
      );
      console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response));
      console.log(response);
      const user_id = response?.data?.user_id;
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, user_id, password, roles, accessToken });
      setUser("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="login relative sm:h-screen">
      {/* <button className='w-[50px]'>
          <img src={Back} alt="" />
        </button> */}
      <div className="flex flex-col justify-center items-center sm:pt-16 h-[100%]">
        <div className="max-w-5xl flex flex-col justify-center sm:flex-row mobile:m-10">
          <img
            className="shadow-md sm:rounded-l-xl object-cover  sm:max-w-[200px] md:max-w-sm lg:max-w-lg xl:max-w-xl"
            src="../../imagecard2.jpg"
            alt="imagecard"
          ></img>
          <form
            className="flex flex-col justify-center bg-white shadow-md sm:rounded-r-xl px-5 md:max-w-[250px] xl:max-w-[350px] py-5"
            onSubmit={handleSubmit}
          >
            <div className="flex text-gray-700 text-2xl font-bold mb-10">
              Log in
            </div>
            <p
              ref={errRef}
              className={errMsg ? "errmsg text-red-500 mb-5" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username :
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validUser && user ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validUser || !user ? "hide" : "invalid"}
                />
              </label>
              <input
                className="shadow appearance-none border-b border-[#32312d] rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={user}
                ref={userRef}
                id="username"
                type="text"
                autoComplete="off"
                placeholder="Username"
                required
                aria-invalid={validUser ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                onChange={(e) => setUser(e.target.value)}
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validUser
                    ? "instructions mb-5"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Invalid username. <br />
                - 4 to 24 characters. <br />
                - Must begin with a letter. <br />- Letters, numbers,
                underscores, hyphens allowed.
              </p>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password :
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPassword && password ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPassword || !password ? "hide" : "invalid"}
                />
              </label>
              <input
                className="appearance-non rounded border-b border-[#32312d] w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                value={password}
                type="password"
                placeholder="******************"
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p
                id="pwdnote"
                className={
                  passwordFocus && !validPassword
                    ? "instructions mb-5"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Invalid password. <br />
                - 8 to 24 characters.
                <br />
                - Must include uppercase and lowercase letters, a number and a
                special character.
                <br />- Allowed special characters:{" "}
                <span className="font-semibold text-xs">@ # $ %</span>
              </p>
            </div>
            <div className="flex items-center justify-between align-middle">
              <button
                className="bg-[#6971f2] hover:bg-[#5960cc] text-white font-bold w-full py-2 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Log in
              </button>
            </div>
            {/* <div className="flex flex-col-3 mt-4 justify-around">
              <a href="#"><img src={Facebook} alt="facebook" className='w-[50px]' /></a>
              <a href="#"><img src={Line} alt="Line" className='w-[50px]' /></a>
              <a href="#"><img src={Tel} alt="Tel" className='w-[50px]' /></a>
            </div> */}
            <div className="mt-8 flex flex-1 justify-center">
              <p className="text-sm text-gray-700">
                Don't have an account?{" "}
                <a className="font-[600]" href="/register">
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Logindetail;
