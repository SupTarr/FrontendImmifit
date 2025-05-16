import { useReducer, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AxiosResponse, AxiosError } from "axios";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { Register, Home } from "../const/Links.ts";
import axiosInstance from "../api/axios.js";
import useAuth from "../hooks/useAuth";

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
  status: string;
  body: {
    accessToken: string;
  };
}

const LoginContainer = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || Home;

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

      if (response.data.status !== "SUCCESS") {
        throw new Error("Registration failed");
      }

      dispatch({ type: "setEmail", email: "" });
      dispatch({ type: "setPassword", password: "" });
      dispatch({
        type: "setHandleSubmit",
        isLoading: false,
        errorMessage: null,
      });

      setAuth({ ...auth, accessToken: response.data.body.accessToken });
      navigate(from, { replace: true });
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
      className="login-container flex h-full flex-col content-center justify-center"
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
      {state.errorMessage && <Alert message={state.errorMessage} />}
      <p className="my-3 flex-grow-0">
        Don't have an account?
        <span className="ml-1 flex-grow-0">
          <Link className="link" to={Register}>
            Sign up
          </Link>
        </span>
      </p>
    </form>
  );
};

export default LoginContainer;
