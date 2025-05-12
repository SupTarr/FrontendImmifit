import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  useNavigate,
  useLocation,
  Location,
  NavigateFunction,
} from "react-router-dom";
import validator from "validator";
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import "./registerForm.css";

const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

interface RegisterResponse {
  username: string;
  email: string;
  accessToken?: string;
  id?: string;
}

const config: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    withCredentials: "true",
  },
};

interface LocationState {
  from?: {
    pathname: string;
  };
}

const Registerdetail = (): JSX.Element => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const navigate: NavigateFunction = useNavigate();
  const location = useLocation() as Location & { state: LocationState };
  const from: string = location.state?.from?.pathname || "/login";

  const [allEmail] = useState<string[]>([]);
  const [allUsername] = useState<string[]>([]);

  const [user, setUser] = useState<string>("");
  const [validUser, setValidUser] = useState<boolean>(false);
  const [userFocus, setUserFocus] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [emailFocus, setEmailFocus] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);

  const [conPass, setConPass] = useState<string>("");
  const [validConPass, setValidConPass] = useState<boolean>(false);
  const [conPassFocus, setConPassFocus] = useState<boolean>(false);

  const [errMsg, setErrMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    console.log(success);
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidUser(USER_REGEX.test(user));
    if (allUsername.find((data) => data === user) !== undefined) {
      setErrMsg("Username already exists");
      setValidUser(false);
    }
  }, [user, allUsername]);

  useEffect(() => {
    setValidEmail(validator.isEmail(email));
    if (allEmail.find((data) => data === email) !== undefined) {
      setErrMsg("Email already exists");
      setValidEmail(false);
    }
  }, [email, allEmail]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidConPass(password === conPass);
  }, [password, conPass]);

  useEffect(() => {
    setErrMsg("");
  }, [user, password, conPass]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!USER_REGEX.test(user) || !PWD_REGEX.test(password)) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response: AxiosResponse<RegisterResponse> = await axios.post(
        "https://immifit-backend.vercel.app/users",
        JSON.stringify({ username: user, email: email, password: password }),
        config,
      );
      console.log(response?.data);
      console.log(response?.data?.accessToken);
      console.log(response);
      setSuccess(true);
      setUser("");
      setEmail("");
      setPassword("");
      setConPass("");
      navigate(from, { replace: true });
    } catch (err) {
      const error = err as AxiosError;
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current?.focus();
    }
  };

  return (
    <div className="login relative sm:h-screen">
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
              Sign up
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
                className="focus:shadow-outline w-full appearance-none rounded border-b border-[#32312d] py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                id="username"
                value={user}
                ref={userRef}
                autoComplete="off"
                type="text"
                required
                placeholder="Username"
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
                  userFocus && user && !validUser ? "instructions" : "offscreen"
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
                htmlFor="email"
              >
                Email :
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validEmail && email ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validEmail || !email ? "hide" : "invalid"}
                />
              </label>
              <input
                className="appearance-non focus:shadow-outline w-full rounded border-b border-[#32312d] py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                id="email"
                value={email}
                type="email"
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="uidnote"
                autoComplete="off"
                placeholder="example@lmmifit.com"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <p
                id="uidnote"
                className={
                  emailFocus && email && !validEmail
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Invalid Email.
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
                className="appearance-non focus:shadow-outline w-full rounded border-b border-[#32312d] py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                id="password"
                value={password}
                type="password"
                required
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="pwdnote"
                placeholder="******************"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              <p
                id="pwdnote"
                className={
                  passwordFocus && !validPassword ? "instructions" : "offscreen"
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
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Confirm Password :
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validConPass && conPass ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validConPass || !conPass ? "hide" : "invalid"}
                />
              </label>
              <input
                className="appearance-non focus:shadow-outline w-full rounded border-b border-[#32312d] py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                id="confirm_password"
                type="password"
                placeholder="******************"
                value={conPass}
                required
                aria-invalid={validConPass ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setConPassFocus(true)}
                onBlur={() => setConPassFocus(false)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setConPass(e.target.value)
                }
              />
              <p
                id="confirmnote"
                className={
                  conPassFocus && !validConPass ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Invalid confirm password. <br />- Must match the first password
                input field.
              </p>
            </div>
            <p className="mb-6 text-sm text-gray-700">
              Already registered?{" "}
              <a href="/login" className="text-sm font-bold">
                Login
              </a>
            </p>
            <div className="flex items-center justify-between align-middle">
              <button
                className="focus:shadow-outline w-full rounded bg-[#E4665F] py-2 font-bold text-white hover:bg-[#EDC8D5] focus:outline-none"
                type="submit"
                disabled={
                  !validUser || !validEmail || !validPassword || !validConPass
                    ? true
                    : false
                }
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registerdetail;
