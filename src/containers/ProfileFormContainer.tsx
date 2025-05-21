import { FormEvent, FC } from "react"; // Import FC for functional component typing
import { useNavigate, useLocation } from "react-router-dom";
import TextareaInput from "../components/TextareaInput.tsx";
import NumberInput from "../components/NumberInput.tsx";
import SelectInput from "../components/SelectInput.tsx";
import Button from "../components/Button.tsx";
import Alert from "../components/Alert.tsx";
import ImageInput from "../components/ImageInput.tsx";
import { Home } from "../const/Links.ts";
import useProfile from "../hooks/useProfile.tsx";
import { GENDER_MALE, GENDER_FEMALE } from "../const/genderConstants.ts";
import { useProfileForm } from "../hooks/useProfileForm.tsx";

/**
 * `ProfileFormContainer` component handles the user's profile creation and updates.
 * It uses the `useProfile` hook to get current profile data and the update function,
 * and the `useProfileForm` hook to manage form state, validation, and submission logic.
 *
 * @returns A form element for editing the user profile.
 */
const ProfileFormContainer: FC = () => {
  // React Router hooks for navigation and location state.
  const navigate = useNavigate();
  const location = useLocation();
  // Determines the redirect path after successful profile update, defaulting to the Home page.
  const from = location.state?.from?.pathname || Home;

  // `useProfile` hook provides the current profile data (`initialProfileData`)
  // and the `updateProfile` function from `ProfileContext`.
  const { profile: initialProfileData, updateProfile } = useProfile();

  // `useProfileForm` hook manages the form's state and core submission logic.
  // - `initialProfileData`: Used to populate the form when it loads.
  // - `onFormSubmit`: The `updateProfile` function from `ProfileContext` is passed here
  //   to be called by the hook upon successful validation and submission.
  const {
    state, // Contains form field values (about, gender, age, etc.), isLoading, and errorMessage.
    dispatch, // Function to dispatch actions to the `useProfileForm` reducer (e.g., for field changes).
    setProfileImageBlob, // Function to set the profile image Blob, managed by `useProfileForm`.
    handleSubmit: handleFormSubmit, // The core submission handler from `useProfileForm`.
  } = useProfileForm({
    initialProfileData,
    onFormSubmit: updateProfile,
  });

  /**
   * Wraps the `handleFormSubmit` from `useProfileForm` to add navigation logic
   * after the form submission is processed by the hook.
   *
   * @param e - The form event.
   */
  const containerSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    try {
      // Call the handleSubmit function from `useProfileForm`.
      // This function handles form validation, API call (via `onFormSubmit`),
      // and updates `isLoading` and `errorMessage` in its state.
      await handleFormSubmit(e);
      // If `handleFormSubmit` resolves, it means the update was successful.
      // Navigate to the 'from' path.
      navigate(from, { replace: true });
    } catch (error) {
      // If `handleFormSubmit` rejects, an error occurred during the process.
      // The `useProfileForm` hook sets `state.errorMessage`, which is displayed by the Alert component.
      // This catch block is for any additional component-specific error handling, like logging.
      console.error("Profile update failed in ProfileFormContainer:", error);
    }
  };

  return (
    // Form submission is handled by `containerSubmit`.
    <form
      className="profile-form-container card-body flex h-full w-full flex-1 flex-col flex-wrap content-center justify-center"
      onSubmit={containerSubmit}
    >
      <div className="flex items-center justify-center">
        <h1 className="card-title">Profile</h1>
      </div>
      {/* ImageInput for uploading/displaying the profile image. */}
      <div className="flex max-w-[400px] items-center justify-center">
        <ImageInput
          name="Profile Image"
          aspect={1} // Aspect ratio for the image cropper.
          initialImageUrl={state.image?.url || ""} // Initial image URL from form state.
          onImageChange={(blob) => setProfileImageBlob(blob)} // Callback to update image Blob in `useProfileForm`.
        />
      </div>
      {/* Input fields for profile details. Values are bound to `state` from `useProfileForm`.
          onChange handlers use `dispatch` from `useProfileForm` to update specific fields. */}
      <TextareaInput
        name="About"
        value={state.about || ""}
        onChange={(value) => dispatch({ type: "setAbout", about: value })}
      />
      <SelectInput
        name="Gender"
        options={["Male", "Female"]}
        value={state.gender === GENDER_MALE ? "Male" : "Female"}
        onChange={(value) =>
          dispatch({
            type: "setGender",
            gender: value === "Male" ? GENDER_MALE : GENDER_FEMALE,
          })
        }
      />
      <NumberInput
        name="Age"
        min="1"
        max="200"
        value={state.age?.toString() || ""}
        onChange={(value) => dispatch({ type: "setAge", age: Number(value) })}
      />
      <NumberInput
        name="Weight"
        min="1"
        max="500"
        step="0.1" // Allows decimal input for weight.
        value={state.weight?.toString() || ""}
        onChange={(value) =>
          dispatch({ type: "setWeight", weight: Number(value) })
        }
      />
      <NumberInput
        name="Height"
        min="1"
        max="5" // Assuming height is in meters.
        step="0.01" // Allows decimal input for height.
        value={state.height?.toString() || ""}
        onChange={(value) =>
          dispatch({ type: "setHeight", height: Number(value) })
        }
      />
      {/* Submit button displays loading state from `useProfileForm`. */}
      <Button name="Submit" isLoading={state.isLoading} />
      {/* Alert displays any error messages from `useProfileForm` state. */}
      {state.errorMessage && <Alert message={state.errorMessage} />}
    </form>
  );
};

export default ProfileFormContainer;
