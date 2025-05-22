import { useReducer, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AxiosResponse, AxiosError } from "axios";
import EmailInput from "../../../shared/components/form/EmailInput";
import PasswordInput from "../../../shared/components/form/PasswordInput";
import Button from "../../../shared/components/ui/Button";
import Alert from "../../../shared/components/ui/Alert";
import { Register, Home } from "../../../shared/const/Links.ts";
import axiosInstance from "../../../shared/api/axios.js";
import useAuth from "../hooks/useAuth";
import { Success } from "../../../shared/const/Status.ts";
import { LoginState, LoginAction, LoginResponse } from "../types/Login";

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
    e.preventDefault();
    dispatch({ type: "setHandleSubmit", isLoading: true, errorMessage: null });
    try {
      const response: AxiosResponse<LoginResponse> = await axiosInstance.post(
        "/auth/login",
        {
          email: state.email,
          password: state.password,
        },
      );

      if (response.data.status !== Success) {
        throw new Error("Registration failed");
      }

      setAuth({ ...auth, accessToken: response.data.body.accessToken });
      dispatch({ type: "setEmail", email: "" });
      dispatch({ type: "setPassword", password: "" });
      dispatch({
        type: "setHandleSubmit",
        isLoading: false,
        errorMessage: null,
      });

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
        label="Email"
        name="email"
        value={state.email}
        onChange={(v: string) => dispatch({ type: "setEmail", email: v })}
      />
      <PasswordInput
        label="Password"
        name="password"
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
