import { useState, FormEvent, FC } from "react"; // Import FC for functional component typing
import { Link, useNavigate, useLocation } from "react-router-dom";
import EmailInput from "../components/EmailInput.tsx";
import TextInput from "../components/TextInput.tsx";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { Login } from "../const/Links.ts";
import { useAuthForm } from "../hooks/useAuthForm.tsx";
import { RegisterResponse } from "../models/Register.ts";

/**
 * `RegisterContainer` component handles the user registration process.
 * It utilizes the `useAuthForm` hook for managing form state (email, username, password),
 * input changes, and the core submission logic.
 * It also includes local state for password confirmation and navigation logic.
 *
 * @returns A form element for user registration.
 */
const RegisterContainer: FC = () => {
  // React Router hooks for navigation and location state.
  const navigate = useNavigate();
  const location = useLocation();
  // Determines the redirect path after successful registration, defaulting to the Login page.
  const from = location.state?.from?.pathname || Login;

  // useAuthForm hook:
  // - `true` indicates this is a registration form.
  // - `state`: Contains form fields (email, username, password), isLoading, errorMessage.
  // - `handleChange`: Function generator for input field onChange handlers.
  // - `handleSubmitForm`: The core submission handler from `useAuthForm`.
  // - `dispatch`: Function to dispatch actions to the `useAuthForm` reducer (e.g., for custom errors).
  const {
    state,
    handleChange,
    handleSubmit: handleSubmitForm,
    dispatch,
  } = useAuthForm(true);

  // Local state for the "Confirm Password" field. This is not part of `useAuthForm`
  // as it's specific to the registration UI.
  const [confirmPassword, setConfirmPassword] = useState("");

  /**
   * Handles the registration form submission.
   * This function wraps `handleSubmitForm` from `useAuthForm` to include
   * password confirmation logic before calling the actual API.
   *
   * @param e - The form event.
   */
  const handleRegisterSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault(); // Prevent default form submission.

    // Check if passwords match before proceeding.
    if (state.password !== confirmPassword) {
      // Dispatch an error action to `useAuthForm` to set an error message.
      dispatch({
        type: "SUBMIT_ERROR",
        error: "Passwords do not match.",
      });
      return; // Stop submission if passwords don't match.
    }

    try {
      // Call the handleSubmitForm from `useAuthForm`.
      // This function handles the API call (authService.register) and updates isLoading/errorMessage in its state.
      // It returns the API response on success or undefined on failure.
      const response = (await handleSubmitForm(e)) as
        | RegisterResponse
        | undefined;

      // If registration was successful (response is not undefined).
      if (response) {
        // The `useAuthForm` hook's SUBMIT_SUCCESS action is dispatched internally.
        // Optionally, one could dispatch RESET_FORM here or reset specific fields like `confirmPassword`.
        // e.g., setConfirmPassword("");
        // Navigate to the 'from' path (usually Login page) after successful registration.
        navigate(from, { replace: true });
      }
      // If `response` is undefined, `handleSubmitForm` caught an error and set `state.errorMessage`.
      // The Alert component will display this message.
    } catch (error) {
      // This catch block handles unexpected errors not caught by `handleSubmitForm`.
      // `useAuthForm` is designed to catch API errors and set its own error message.
      console.error("Registration failed in RegisterContainer:", error);
      // Additional error handling or logging can be done here.
    }
  };

  return (
    // The form element uses the local handleRegisterSubmit for its onSubmit event.
    <form
      className="register-container flex h-full flex-col content-center justify-center"
      onSubmit={handleRegisterSubmit}
    >
      <h2 className="card-title">Register</h2>
      {/* Input fields for email, username, and password, managed by useAuthForm. */}
      <EmailInput
        name="Email"
        value={state.email || ""}
        onChange={handleChange("email")}
      />
      <TextInput
        name="Username"
        value={state.username || ""}
        onChange={handleChange("username")}
      />
      <PasswordInput
        name="Password"
        value={state.password || ""}
        onChange={handleChange("password")}
      />
      {/* PasswordInput for confirming the password, managed by local state. */}
      <PasswordInput
        name="Confirm Password"
        value={confirmPassword}
        onChange={(v: string) => setConfirmPassword(v)} // Updates local confirmPassword state.
      />
      {/* Submit button, shows loading state from useAuthForm. */}
      <Button name="Register" isLoading={state.isLoading} />
      {/* Alert displays error messages from useAuthForm state. */}
      {state.errorMessage && <Alert message={state.errorMessage} />}
      {/* Link to the login page for users who are already registered. */}
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
