import { useReducer } from "react";
import { Link } from "react-router-dom";
import EmailInput from "../components/EmailInput.tsx";
import TextInput from "../components/TextInput.tsx";
import PasswordInput from "../components/PasswordInput";
import { Login } from "../Links.tsx";

type RegisterAction =
  | { type: "setEmail"; email: string }
  | { type: "setUsername"; username: string }
  | { type: "setPassword"; password: string }
  | { type: "setConfirmPassword"; confirmPassword: string };

type RegisterState = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const RegisterContainer = () => {
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
        default:
          return state;
      }
    },
    {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  );

  return (
    <form className="register-container flex h-full flex-col content-center justify-center">
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
      <button className="btn btn-neutral mt-4" type="submit">
        Register
      </button>
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
