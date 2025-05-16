import { useReducer, FormEvent } from "react";
import { Link } from "react-router-dom";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import { Register } from "../Links";
import { AxiosResponse, AxiosError } from "axios";
import axiosInstance from "../api/axios.js";

type LoginAction =
  | { type: "setEmail"; email: string }
  | { type: "setPassword"; password: string }
  | {
      type: "setHandleSubmit";
      isLoading: boolean;
      errorMessage: string | null;
    };

type LoginState = {
  email: string;
  password: string;
  isLoading: boolean;
  errorMessage: string | null;
};

interface LoginResponse {
  accessToken: string;
}

const LoginContainer = () => {
  const [state, dispatch] = useReducer(
    (state: LoginState, action: LoginAction): LoginState => {
      switch (action.type) {
        case "setEmail":
          return {
            ...state,
            email: action.email,
          };
        case "setPassword":
          return {
            ...state,
            password: action.password,
          };
        case "setHandleSubmit":
          return {
            ...state,
            isLoading: action.isLoading,
            errorMessage: action.errorMessage,
          };
        default:
          return state;
      }
    },
    {
      email: "",
      password: "",
      isLoading: false,
      errorMessage: null,
    },
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    dispatch({ type: "setHandleSubmit", isLoading: true, errorMessage: null });
    e.preventDefault();
    try {
      const response: AxiosResponse<LoginResponse> = await axiosInstance.post(
        "/auth/login",
        {
          email: state.email,
          password: state.password,
        },
      );

      setTimeout(() => {
        dispatch({ type: "setEmail", email: "" });
        dispatch({ type: "setPassword", password: "" });
        dispatch({
          type: "setHandleSubmit",
          isLoading: false,
          errorMessage: null,
        });
      }, 500);
      console.log(response);
    } catch (err) {
      const error = err as AxiosError<any>;
      dispatch({
        type: "setHandleSubmit",
        isLoading: false,
        errorMessage:
          error?.response?.data?.message || "Login Failed. Please try again.",
      });

      console.error("Login error:", error.response || error.message);
    }
  };

  return (
    <form
      className="login-container flex flex-col justify-center content-center h-full"
      onSubmit={handleSubmit}
    >
      <h2 className="card-title">Login</h2>
      <EmailInput
        name="Email"
        value={state.email}
        onChange={(v: string) => dispatch({ type: "setEmail", email: v })}
      />
      <PasswordInput
        name="Password"
        value={state.password}
        onChange={(v: string) => dispatch({ type: "setPassword", password: v })}
      />
      <Button name="Login" isLoading={state.isLoading} />
      {state.errorMessage && (
        <div role="alert" className="alert alert-error mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{state.errorMessage}</span>
        </div>
      )}
      <p className="flex-grow-0 my-3">
        Don't have an account?
        <span className="flex-grow-0 ml-1">
          <Link className="link" to={Register}>
            Sign up
          </Link>
        </span>
      </p>
    </form>
  );
};

export default LoginContainer;
