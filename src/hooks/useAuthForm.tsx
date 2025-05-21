import { useReducer, Reducer } from "react"; // Import Reducer type for explicitness
import * as authService from "../api/authService";
import { LoginRequest, LoginResponse } from "../models/Login";
import { RegisterRequest, RegisterResponse } from "../models/Register";

/**
 * Represents the state of the authentication form.
 */
type AuthFormState = {
  email?: string;
  password?: string;
  username?: string; // Optional, used for registration
  isLoading: boolean;
  errorMessage?: string;
};

/**
 * Defines the actions that can be dispatched to update the AuthFormState.
 */
type AuthFormAction =
  | { type: "SET_FIELD"; field: keyof Omit<AuthFormState, "isLoading" | "errorMessage">; value: string }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; error: string }
  | { type: "RESET_FORM" };

/**
 * Initial state for the authentication form.
 */
const initialState: AuthFormState = {
  email: "",
  password: "",
  username: "",
  isLoading: false,
  errorMessage: "",
};

/**
 * Reducer function for managing the authentication form's state.
 * @param state - The current state of the form.
 * @param action - The action to perform.
 * @returns The new state of the form.
 */
const authFormReducer: Reducer<AuthFormState, AuthFormAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "SET_FIELD":
      // Updates a specific field in the form state and clears any previous error messages.
      return { ...state, [action.field]: action.value, errorMessage: "" };
    case "SUBMIT_START":
      // Sets isLoading to true and clears any previous error messages when a submission starts.
      return { ...state, isLoading: true, errorMessage: "" };
    case "SUBMIT_SUCCESS":
      // Sets isLoading to false and clears error messages on successful submission.
      // Optionally, form fields can be reset here.
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
        // Optionally reset fields:
        // email: "",
        // password: "",
        // username: "",
      };
    case "SUBMIT_ERROR":
      // Sets isLoading to false and updates the errorMessage on submission failure.
      return { ...state, isLoading: false, errorMessage: action.error };
    case "RESET_FORM":
      // Resets the form to its initial state.
      // Special handling for 'username' to persist it if it was part of a successful registration.
      // Note: The condition `action.type === "SUBMIT_SUCCESS"` for username persistence seems misplaced here,
      // as RESET_FORM is a distinct action. This might be a leftover from a previous logic iteration.
      // Consider if username should always reset or if this condition needs refinement.
      return {
        ...initialState,
        username: state.username && action.type === "SUBMIT_SUCCESS" ? state.username : "",
      };
    default:
      return state;
  }
};

/**
 * Custom hook for managing authentication form logic (login or register).
 *
 * @param isRegister - Boolean flag to indicate if the form is for registration (true) or login (false).
 * @returns An object containing the form state, dispatch function, handleChange function for input fields,
 * and handleSubmit function for form submission.
 */
export const useAuthForm = (isRegister: boolean) => {
  const [state, dispatch] = useReducer(authFormReducer, initialState);

  /**
   * Handles changes in form input fields.
   * @param field - The name of the field being updated.
   * @returns A function that takes a change event and dispatches the "SET_FIELD" action.
   */
  const handleChange =
    (field: keyof Omit<AuthFormState, "isLoading" | "errorMessage">) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch({ type: "SET_FIELD", field, value: event.target.value });
    };

  /**
   * Handles form submission for both login and registration.
   * It calls the appropriate API service based on the `isRegister` flag.
   * Manages loading states and error messages.
   *
   * @param event - The form submission event.
   * @returns A promise that resolves with the API response on success, or undefined on failure.
   *          The promise does not reject directly but sets an error message in the state.
   */
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<LoginResponse | RegisterResponse | undefined> => {
    event.preventDefault(); // Prevent default form submission behavior
    dispatch({ type: "SUBMIT_START" });

    try {
      let response;
      if (isRegister) {
        // Validate required fields for registration
        if (!state.email || !state.password || !state.username) {
          throw new Error("Email, password, and username are required for registration.");
        }
        const registerData: RegisterRequest = {
          email: state.email,
          password: state.password,
          username: state.username,
        };
        response = await authService.register(registerData);
      } else {
        // Validate required fields for login
        if (!state.email || !state.password) {
          throw new Error("Email and password are required for login.");
        }
        const loginData: LoginRequest = {
          email: state.email,
          password: state.password,
        };
        response = await authService.login(loginData);
      }
      dispatch({ type: "SUBMIT_SUCCESS" });
      // Optionally, dispatch({ type: "RESET_FORM" }); // Reset form on successful submission
      return response; // Return API response
    } catch (error: any) {
      // Extract error message from API response or use a generic message
      const errorMessage =
        error.response?.data?.message || error.message || "An unknown error occurred";
      dispatch({ type: "SUBMIT_ERROR", error: errorMessage });
      // The hook currently handles the error by setting state.errorMessage.
      // It does not rethrow the error, so components should check this state for failures.
      // Consider rethrowing or returning a specific error object if components need more detailed error handling.
      return undefined; // Indicate failure by returning undefined
    }
  };

  return {
    state, // The current state of the form
    dispatch, // Dispatch function to update the form state
    handleChange, // Function to handle input field changes
    handleSubmit, // Function to handle form submission
  };
};
