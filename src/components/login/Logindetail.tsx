import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import {
  useNavigate,
  useLocation,
  Location,
  NavigateFunction,
} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./logindetail.css";
import axios from "../../api/axios";
import { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";

const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

interface AuthResponse {
  user_id: string;
  accessToken: string;
  roles: string[];
}

const config: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin":
      "http://127.0.0.1:5173,https://immifit.vercel.app/",
    withCredentials: "true",
  },
};

interface LocationState {
  from?: {
    pathname: string;
  };
}

const Logindetail = (): JSX.Element => {
  const { setAuth } = useAuth();

  const navigate: NavigateFunction = useNavigate();
  const location = useLocation() as Location & { state: LocationState };
  const from: string = location.state?.from?.pathname || "/";

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState<string>("");
  const [validUser, setValidUser] = useState<boolean>(false);
  const [userFocus, setUserFocus] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState<string>("");

  useEffect(() => {
    setValidUser(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response: AxiosResponse<AuthResponse> = await axios.post(
        "/auth/login",
        JSON.stringify({ email: user, password: password }),
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
      const error = err as AxiosError;
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current?.focus();
    }
  };

  return (
    <div className="login relative sm:h-screen">
      {/* <button className='w-[50px]'>
          <img src={Back} alt="" />
        </button> */}
      <div className="flex h-[100%] flex-col items-center justify-center sm:pt-16">
        <div className="flex max-w-5xl flex-col justify-center mobile:m-10 sm:flex-row">
          <img
            className="object-cover shadow-md sm:max-w-[200px] sm:rounded-l-xl md:max-w-sm lg:max-w-lg xl:max-w-xl"
            src="../../imagecard2.jpg"
            alt="imagecard"
          ></img>
          <form
            className="flex flex-col justify-center bg-white px-5 py-5 shadow-md sm:rounded-r-xl md:max-w-[250px] xl:max-w-[350px]"
            onSubmit={handleSubmit}
          >
            <div className="mb-10 flex text-2xl font-bold text-gray-700">
              Log in
            </div>
            <p
              ref={errRef}
              className={errMsg ? "errmsg mb-5 text-red-500" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
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
                className="focus:shadow-outline mb-3 w-full appearance-none rounded border-b border-[#32312d] py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUser(e.target.value)
                }
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
                className="mb-2 block text-sm font-bold text-gray-700"
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
                className="appearance-non focus:shadow-outline mb-3 w-full rounded border-b border-[#32312d] py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                id="password"
                value={password}
                type="password"
                placeholder="******************"
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
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
                <span className="text-xs font-semibold">@ # $ %</span>
              </p>
            </div>
            <div className="flex items-center justify-between align-middle">
              <button
                className="focus:shadow-outline w-full rounded bg-[#6971f2] py-2 font-bold text-white hover:bg-[#5960cc] focus:outline-none"
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
