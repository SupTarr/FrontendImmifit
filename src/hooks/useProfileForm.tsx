import {
  useReducer,
  useEffect,
  useState,
  FormEvent,
  // Dispatch, // Dispatch type is inferred or can be imported from 'react' if needed for explicit typing
  Reducer, // Import Reducer for explicit typing of the reducer function
} from "react";
import { AxiosError } from "axios";
import { ProfileState, ProfileAction } from "../models/Profile";

/**
 * Reducer function for managing the profile form's state.
 * This function is adapted from the logic previously in `ProfileFormContainer`.
 *
 * @param state - The current state of the profile form.
 * @param action - The action to perform, defining how to update the state.
 * @returns The new state of the profile form.
 */
const profileFormReducer: Reducer<ProfileState, ProfileAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "setAbout":
      return { ...state, about: action.about };
    case "setGender":
      return { ...state, gender: action.gender };
    case "setAge":
      return { ...state, age: action.age };
    case "setWeight":
      return { ...state, weight: action.weight };
    case "setHeight":
      return { ...state, height: action.height };
    case "updateProfile": // This action is used to populate the form with existing profile data
      return {
        ...state, // Preserve existing state fields like isLoading, errorMessage
        // Update form fields with data from action.profile
        image: action.profile?.image || null,
        about: action.profile?.about || null,
        gender: action.profile?.gender || null,
        age: action.profile?.age || null,
        weight: action.profile?.weight || null,
        height: action.profile?.height || null,
        // BMI is typically calculated from weight and height, so not directly set here
        // profileId and userId are also typically part of the profile data loaded
        profileId: action.profile?.profileId || null,
        userId: action.profile?.userId || null,
      };
    case "setHandleSubmit": // Manages state during form submission (loading and error messages)
      return {
        ...state,
        isLoading: action.isLoading,
        errorMessage: action.errorMessage,
      };
    default:
      // If an unknown action type is received, return the current state unchanged
      return state;
  }
};

/**
 * Initial state for the profile form.
 * Includes all fields from `ProfileState` set to their default/empty values.
 */
const initialFormState: ProfileState = {
  profileId: null, // Will be populated from existing profile data
  userId: null,    // Will be populated from existing profile data
  image: null,     // Represents the current profile image details (URL, ID)
  about: null,     // Text field for user's biography
  gender: null,    // User's gender (e.g., using constants like GENDER_MALE, GENDER_FEMALE)
  age: null,       // User's age
  weight: null,    // User's weight
  height: null,    // User's height
  bmi: null,       // Calculated BMI; not directly part of form input but part of ProfileState
  isLoading: false, // Flag to indicate if the form is currently submitting
  errorMessage: null, // Error message to display in case of submission failure
};

/**
 * Props for the `useProfileForm` hook.
 */
interface UseProfileFormProps {
  /** Initial profile data to populate the form. This usually comes from a context or API call. */
  initialProfileData: ProfileState;
  /**
   * Callback function to execute when the form is submitted.
   * This function is responsible for making the API call to update the profile.
   * @param profileData - The current state of the profile form.
   * @param imageBlob - The new profile image file (Blob) if selected, otherwise null.
   * @returns A promise that resolves if the submission is successful, and rejects otherwise.
   */
  onFormSubmit: (
    profileData: ProfileState,
    imageBlob: Blob | null
  ) => Promise<void>;
}

/**
 * Custom hook for managing the state and submission logic of the profile form.
 *
 * @param initialProfileData - The initial data to populate the form fields.
 * @param onFormSubmit - A callback function that handles the actual submission (e.g., API call).
 * @returns An object containing:
 *  - `state`: The current state of the form (including field values, isLoading, errorMessage).
 *  - `dispatch`: The dispatch function from `useReducer` to update form state via `ProfileAction`.
 *  - `profileImageBlob`: The currently selected image file (Blob) for the profile picture, or null.
 *  - `setProfileImageBlob`: Function to update `profileImageBlob`.
 *  - `handleSubmit`: Async function to handle form submission, which calls `onFormSubmit`.
 */
export const useProfileForm = ({
  initialProfileData,
  onFormSubmit,
}: UseProfileFormProps) => {
  // useReducer manages the form's data state (text fields, numbers, etc.)
  const [state, dispatch] = useReducer(profileFormReducer, initialFormState);
  // useState manages the profile image file (Blob) separately
  const [profileImageBlob, setProfileImageBlob] = useState<Blob | null>(null);

  // useEffect hook to populate the form when initialProfileData changes (e.g., loaded from context)
  useEffect(() => {
    if (initialProfileData) {
      dispatch({
        type: "updateProfile", // Action to load profile data into the form state
        profile: initialProfileData,
      });
    }
  }, [initialProfileData]); // Dependency array: re-run effect if initialProfileData changes

  /**
   * Handles the form submission process.
   * Prevents default form behavior, sets loading state, calls the `onFormSubmit` callback,
   * and handles success or error responses.
   *
   * @param e - The HTML form event.
   * @returns A promise that resolves on successful submission or rejects if an error occurs
   *          (by rethrowing the error from `onFormSubmit`).
   */
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault(); // Prevent the browser's default form submission
    // Dispatch action to indicate submission start and clear previous errors
    dispatch({ type: "setHandleSubmit", isLoading: true, errorMessage: null });

    try {
      // Call the provided onFormSubmit function with the current form state and image blob
      await onFormSubmit(state, profileImageBlob);
      // If onFormSubmit resolves, dispatch success action
      dispatch({
        type: "setHandleSubmit",
        isLoading: false,
        errorMessage: null,
      });
      // The promise from handleSubmit will resolve here
    } catch (error) {
      // If onFormSubmit rejects, handle the error
      const axiosError = error as AxiosError<any>; // Type assertion for Axios errors
      // Dispatch action to indicate submission failure and set error message
      dispatch({
        type: "setHandleSubmit",
        isLoading: false,
        errorMessage:
          axiosError?.response?.data?.message || // Use error message from API if available
          "Update profile failed. Please try again.", // Generic fallback message
      });
      throw error; // Rethrow the error so the calling component can also handle it (e.g., for navigation)
    }
  };

  // Return the state, dispatch function, image blob and its setter, and the submit handler
  return {
    state,
    dispatch,
    profileImageBlob,
    setProfileImageBlob,
    handleSubmit,
  };
};
