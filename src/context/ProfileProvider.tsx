import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import AuthContext from "./AuthProvider";
import {
  getProfile,
  updateProfile as updateProfileService,
} from "../api/profileService"; // Renamed import for clarity
import { ProfileState, ProfileContextType } from "../models/Profile.ts";

/**
 * Props for the ProfileProvider component.
 */
interface ProfileProviderProps {
  /** The child components that will have access to the profile context. */
  children: ReactNode;
}

/**
 * Default state for the profile context.
 * Used when no user is logged in or when profile data hasn't been fetched yet.
 */
const defaultProfileState: ProfileState = {
  profileId: null, // Unique identifier for the profile
  userId: null,    // Identifier of the user associated with this profile
  about: null,     // User's biography
  gender: null,    // User's gender
  age: null,       // User's age
  weight: null,    // User's weight in appropriate units
  height: null,    // User's height in appropriate units
  bmi: null,       // Calculated Body Mass Index
  image: null,     // User's profile image details (URL, ID)
  isLoading: false, // True if profile data is currently being fetched or updated
  errorMessage: null, // Error message if fetching/updating profile data fails
};

/**
 * React Context for managing user profile data.
 * Provides the profile state and functions to update and refresh it.
 */
const ProfileContext = createContext<ProfileContextType>({
  profile: defaultProfileState, // The current profile state
  updateProfile: async () => { // Placeholder for the updateProfile function
    // This async function is a placeholder and should be implemented in the provider.
    // It's intended to update the user's profile data.
    // Consumers of the context will use the actual implementation from ProfileProvider.
  },
  refreshProfile: async () => { // Placeholder for the refreshProfile function
    // Similar to updateProfile, this is a placeholder for fetching/refreshing profile data.
  },
});

/**
 * Provides profile data to its children components via the ProfileContext.
 * Manages fetching, updating, and caching of the user's profile.
 *
 * @param children - The React components that need access to the profile context.
 */
export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  // State for storing the current user's profile data
  const [profile, setProfile] = useState<ProfileState>(defaultProfileState);
  // Access authentication context to get user's auth state (e.g., accessToken)
  const { auth } = useContext(AuthContext);

  /**
   * Fetches the user's profile data from the API.
   * Requires a valid `auth.accessToken`.
   * Updates the `profile` state with the fetched data or an error message.
   */
  const fetchProfile = async () => {
    // Only fetch if user is authenticated
    if (!auth?.accessToken) {
      setProfile(defaultProfileState); // Reset profile if not authenticated
      return;
    }

    // Set loading state and clear previous errors
    setProfile((prev) => ({ ...prev, isLoading: true, errorMessage: null }));
    try {
      // Call the getProfile service function
      const response = await getProfile();
      // Update profile state with the response data
      setProfile({
        ...response.body, // Assuming response.body directly maps to ProfileState fields
        isLoading: false,
        errorMessage: null,
      });
    } catch (err) {
      console.error("Error fetching profile data", err);
      // Set error message in profile state
      setProfile((prev) => ({
        ...prev,
        isLoading: false,
        errorMessage: "Failed to fetch profile data",
      }));
    }
  };

  /**
   * Updates the user's profile data via an API call.
   * Requires a valid `auth.accessToken`.
   *
   * @param profileData - An object containing the profile fields to update.
   * @param file - A `Blob` representing the new profile image, or `null` if not changing.
   */
  const updateProfileContext = async (
    profileData: Partial<ProfileState>, // Allows partial updates to profile
    file: Blob | null // The new image file, if any
  ) => {
    if (!auth?.accessToken) {
      return; // User must be authenticated
    }

    // Set loading state. An optimistic update of local state could be done here,
    // but for simplicity, we set isLoading and wait for API response.
    setProfile((prev) => ({
      ...prev,
      isLoading: true,
      errorMessage: null,
    }));

    try {
      // Construct the full profile data to send, merging current profile with new data.
      // This is important because `updateProfileService` might expect all fields.
      const currentProfileForUpdate = { ...profile, ...profileData };

      // Call the updateProfile service function from `profileService.ts`
      const response = await updateProfileService(currentProfileForUpdate, file);

      // Update profile state with the response from the backend
      setProfile((prev) => ({
        ...prev, // Preserve any non-profile fields (though ProfileState should cover all)
        ...response.body, // Update with the latest profile data from the server
        isLoading: false,
        errorMessage: null,
      }));
    } catch (err) {
      console.error("Error updating profile data", err);
      // Set error message in profile state.
      // If an optimistic update was done, it should be reverted here.
      setProfile((prev) => ({
        ...prev,
        isLoading: false,
        errorMessage: "Failed to update profile data",
      }));
      // Optionally, the error could be rethrown if calling components need to react to it.
    }
  };

  // useEffect to fetch profile data when authentication state (accessToken) changes.
  useEffect(() => {
    if (auth?.accessToken) {
      fetchProfile(); // Fetch profile if accessToken is present
    } else {
      // If no accessToken (e.g., user logged out), reset profile to default state
      setProfile(defaultProfileState);
    }
  }, [auth?.accessToken]); // Dependency: re-run when accessToken changes

  // Provide the profile state and functions to child components
  return (
    <ProfileContext.Provider
      value={{
        profile, // The current profile data
        updateProfile: updateProfileContext, // Function to update the profile
        refreshProfile: fetchProfile, // Function to re-fetch/refresh the profile
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext; // Export the context itself for consumers
