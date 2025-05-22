import { useReducer, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AxiosResponse, AxiosError } from "axios";
import axiosInstance from "../../../shared/api/axios.js";
import EmailInput from "../../../shared/components/form/EmailInput.tsx";
import TextInput from "../../../shared/components/form/TextInput.tsx";
import PasswordInput from "../../../shared/components/form/PasswordInput";
import Button from "../../../shared/components/ui/Button";
import Alert from "../../../shared/components/ui/Alert";
import { Login } from "../../../shared/const/Links.ts";
import { Success } from "../../../shared/const/Status.ts";
import {
  RegisterState,
  RegisterAction,
  RegisterResponse,
} from "../types/Register.ts";

const RegisterContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || Login;

  const [state, dispatch] = useReducer(
    (state: RegisterState, action: RegisterAction): RegisterState => {
      switch (action.type) {
        case "setEmail":
          return {
            ...state,
            email: action.email,
          };
        case "setUsername":
          return {
            ...state,
            username: action.username,
          };
        case "setPassword":
          return {
            ...state,
            password: action.password,
          };
        case "setConfirmPassword":
          return {
            ...state,
            confirmPassword: action.confirmPassword,
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
      username: "",
      password: "",
      confirmPassword: "",
      isLoading: false,
      errorMessage: null,
    },
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    dispatch({ type: "setHandleSubmit", isLoading: true, errorMessage: null });
    if (state.password !== state.confirmPassword) {
      dispatch({
        type: "setHandleSubmit",
        isLoading: false,
        errorMessage: "Passwords do not match.",
      });

      return;
    }

    try {
      const response: AxiosResponse<RegisterResponse> =
        await axiosInstance.post("/auth/register", {
          email: state.email,
          username: state.username,
          password: state.password,
        });

      if (response.data.status !== Success) {
        throw new Error("Login failed");
      }

      dispatch({ type: "setEmail", email: "" });
      dispatch({ type: "setUsername", username: "" });
      dispatch({ type: "setPassword", password: "" });
      dispatch({ type: "setConfirmPassword", confirmPassword: "" });
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
          error?.response?.data?.message ||
          "Register Failed. Please try again.",
      });

      console.error("Register error:", error.response || error.message);
    }
  };

  return (
    <form
      className="register-container flex h-full flex-col content-center justify-center"
      onSubmit={handleSubmit}
    >
      <h2 className="card-title">Register</h2>
      <EmailInput
        label="Email"
        name="email"
        value={state.email}
        onChange={(v: string) => dispatch({ type: "setEmail", email: v })}
      />
      <TextInput
        label="Username"
        name="username"
        value={state.username}
        onChange={(v: string) => dispatch({ type: "setUsername", username: v })}
      />
      <PasswordInput
        label="Password"
        name="password"
        value={state.password}
        onChange={(v: string) => dispatch({ type: "setPassword", password: v })}
      />
      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        value={state.confirmPassword}
        onChange={(v: string) =>
          dispatch({ type: "setConfirmPassword", confirmPassword: v })
        }
      />
      <Button name="Register" isLoading={state.isLoading} />
      {state.errorMessage && <Alert message={state.errorMessage} />}
      <p className="my-3 flex-grow-0">
        Already registered?
        <span className="ml-1 flex-grow-0">
          <Link className="link" to={Login}>
            Login
          </Link>
        </span>
      </p>
    </form>
  );
};

export default RegisterContainer;
