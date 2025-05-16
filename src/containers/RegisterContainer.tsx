import { useReducer, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AxiosResponse, AxiosError } from "axios";
import axiosInstance from "../api/axios.js";
import EmailInput from "../components/EmailInput.tsx";
import TextInput from "../components/TextInput.tsx";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { Login } from "../const/Links.ts";

type RegisterAction =
  | { type: "setEmail"; email: string }
  | { type: "setUsername"; username: string }
  | { type: "setPassword"; password: string }
  | { type: "setConfirmPassword"; confirmPassword: string }
  | {
      type: "setHandleSubmit";
      isLoading: boolean;
      errorMessage: string | null;
    };

type RegisterState = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  errorMessage: string | null;
};

interface RegisterResponse {
  status: string;
}

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
    dispatch({ type: "setHandleSubmit", isLoading: true, errorMessage: null });
    e.preventDefault();
    try {
      const response: AxiosResponse<RegisterResponse> =
        await axiosInstance.post("/auth/register", {
          email: state.email,
          username: state.username,
          password: state.password,
        });

      if (response.data.status !== "SUCCESS") {
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

      console.error("Login error:", error.response || error.message);
    }
  };

  return (
    <form
      className="register-container flex h-full flex-col content-center justify-center"
      onSubmit={handleSubmit}
    >
      <h2 className="card-title">Register</h2>
      <EmailInput
        name="Email"
        value={state.email}
        onChange={(v: string) => dispatch({ type: "setEmail", email: v })}
      />
      <TextInput
        name="Username"
        value={state.username}
        onChange={(v: string) => dispatch({ type: "setUsername", username: v })}
      />
      <PasswordInput
        name="Password"
        value={state.password}
        onChange={(v: string) => dispatch({ type: "setPassword", password: v })}
      />
      <PasswordInput
        name="Confirm Password"
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
