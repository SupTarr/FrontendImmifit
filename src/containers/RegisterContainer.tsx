import { useReducer } from "react";
import { Link } from "react-router-dom";
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
    <form className="register-container flex flex-col justify-center content-center h-full">
      <h2 className="card-title">Register</h2>
      <TextInput
        name="Email"
        onChange={(v: string) => dispatch({ type: "setEmail", email: v })}
      />
      <TextInput
        name="Username"
        onChange={(v: string) => dispatch({ type: "setUsername", username: v })}
      />
      <PasswordInput
        name="Password"
        onChange={(v: string) => dispatch({ type: "setPassword", password: v })}
      />
      <PasswordInput
        name="Confirm Password"
        onChange={(v: string) =>
          dispatch({ type: "setConfirmPassword", confirmPassword: v })
        }
      />
      <button className="btn btn-neutral mt-4" type="submit">
        Register
      </button>
      <p className="flex-grow-0 my-3">
        Already registered?
        <span className="flex-grow-0 ml-1">
          <Link className="link" to={Login}>
            Login
          </Link>
        </span>
      </p>
    </form>
  );
};

export default RegisterContainer;
