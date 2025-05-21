import { FormEvent, FC } from "react"; // Import FC for functional component typing
import { Link, useNavigate, useLocation } from "react-router-dom";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { Register, Home } from "../const/Links.ts";
import useAuth from "../hooks/useAuth";
import { useAuthForm } from "../hooks/useAuthForm.tsx";
import { LoginResponse } from "../models/Login";

/**
 * `LoginContainer` component handles the user login process.
 * It uses the `useAuthForm` hook to manage form state and submission logic,
 * and the `useAuth` hook to update the global authentication state upon successful login.
 *
 * @returns A form element for user login.
 */
const LoginContainer: FC = () => {
  // useAuth hook provides access to the authentication context (auth state and setAuth function).
  const { auth, setAuth } = useAuth();
  // useNavigate hook for programmatic navigation (e.g., after login).
  const navigate = useNavigate();
  // useLocation hook to get the current location object, used here to redirect users
  // back to the page they were trying to access before being prompted to log in.
  const location = useLocation();
  // Determine the 'from' path: where to redirect after successful login.
  // Defaults to Home page if no previous location state is found.
  const from = location.state?.from?.pathname || Home;

  // useAuthForm hook manages the form's state (email, password, isLoading, errorMessage)
  // and provides handleChange and handleSubmitForm (aliased from handleSubmit) functions.
  // `false` indicates this form is for login, not registration.
  const {
    state, // Contains form fields (email, password), isLoading, and errorMessage.
    handleChange, // Function generator for input field onChange handlers.
    handleSubmit: handleSubmitForm, // The submission handler from the useAuthForm hook.
  } = useAuthForm(false);

  /**
   * Handles the login form submission.
   * This function wraps the `handleSubmitForm` from `useAuthForm` to perform
   * actions specific to the login container after a successful API call,
   * such as updating the auth context and navigating the user.
   *
   * @param e - The form event, used to prevent default submission if not already handled.
   */
  const handleLoginSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault(); // Ensure default form submission is prevented.
    try {
      // Call the handleSubmitForm function from useAuthForm.
      // This function internally calls the authService.login API.
      // It returns the API response on success, or undefined if an error occurred (error is handled within the hook by setting errorMessage).
      const response = (await handleSubmitForm(e)) as LoginResponse | undefined;

      // If the login was successful and an accessToken is present in the response body.
      if (response && response.body.accessToken) {
        // Update the global authentication state with the new accessToken.
        setAuth({ ...auth, accessToken: response.body.accessToken });
        // Navigate the user to the 'from' path (previous page or home).
        // `replace: true` replaces the current entry in the history stack,
        // so the user doesn't return to the login page by pressing the back button.
        navigate(from, { replace: true });
      }
      // If `response` is undefined or lacks an `accessToken`, it means `handleSubmitForm`
      // caught an error and set `state.errorMessage`. The UI will display this error via the Alert component.
    } catch (error) {
      // This catch block is primarily for unexpected errors not caught by `handleSubmitForm`
      // or for additional component-specific error handling.
      // The `useAuthForm` hook is designed to catch API errors and set `state.errorMessage`.
      console.error("Login failed in LoginContainer:", error);
      // Further actions could be taken here if needed, e.g., logging to an external service.
    }
  };

  return (
    // The form element uses the local handleLoginSubmit for its onSubmit event.
    <form
      className="login-container flex h-full flex-col content-center justify-center"
      onSubmit={handleLoginSubmit}
    >
      <h2 className="card-title">Login</h2>
      {/* EmailInput component for the email field. */}
      <EmailInput
        name="Email"
        value={state.email || ""} // Value is bound to state.email from useAuthForm.
        onChange={handleChange("email")} // onChange uses the handleChange function from useAuthForm.
      />
      {/* PasswordInput component for the password field. */}
      <PasswordInput
        name="Password"
        value={state.password || ""} // Value is bound to state.password.
        onChange={handleChange("password")} // onChange uses handleChange.
      />
      {/* Button component for submitting the form, shows loading state. */}
      <Button name="Login" isLoading={state.isLoading} />
      {/* Alert component displays any error messages from the form submission. */}
      {state.errorMessage && <Alert message={state.errorMessage} />}
      {/* Link to the registration page for users who don't have an account. */}
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
