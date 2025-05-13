import { useReducer } from "react";
import { Link } from "react-router-dom";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import { Register } from "../Links";

type LoginAction =
  | { type: "setEmail"; email: string }
  | { type: "setPassword"; password: string };

type LoginState = {
  email: string;
  password: string;
};

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
        default:
          return state;
      }
    },
    {
      email: "",
      password: "",
    },
  );

  return (
    <form className="login-container flex flex-col justify-center content-center h-full">
      <h2 className="card-title">Login</h2>
      <TextInput
        name="Email"
        onChange={(v: string) => dispatch({ type: "setEmail", email: v })}
      />
      <PasswordInput
        name="Password"
        onChange={(v: string) => dispatch({ type: "setPassword", password: v })}
      />
      <button className="btn btn-neutral mt-4" type="submit">
        Login
      </button>
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
