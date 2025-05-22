import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "../../auth/context/AuthProvider";
import {
  ProfileState,
  ProfileProviderProps,
  ProfileContextType,
  defaultProfileState,
} from "../types/Profile.ts";
import { useProfileApi } from "../hooks/useProfileApi";

const ProfileContext = createContext<ProfileContextType>({
  profile: defaultProfileState,
  updateProfile: async () => {},
});

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [profile, setProfile] = useState<ProfileState>(defaultProfileState);
  const { auth } = useContext(AuthContext);
  const { fetchProfile: apiFetchProfile, updateProfile: apiUpdateProfile } =
    useProfileApi();

  const fetchProfile = async () => {
    if (!auth?.accessToken) {
      return;
    }

    setProfile((prev) => ({ ...prev, isLoading: true, errorMessage: null }));

    try {
      const profileData = await apiFetchProfile();
      setProfile({
        ...profileData,
        isLoading: false,
        errorMessage: null,
      });
    } catch (err) {
      setProfile((prev) => ({
        ...prev,
        isLoading: false,
        errorMessage: "Failed to fetch profile data",
      }));
    }
  };

  const updateProfile = async (
    profileData: Partial<ProfileState>,
    imageFile: Blob | null,
  ) => {
    if (!auth?.accessToken) {
      return;
    }

    setProfile((prev) => ({
      ...prev,
      ...profileData,
      isLoading: true,
      errorMessage: null,
    }));

    try {
      const updatedProfileData = await apiUpdateProfile(profileData, imageFile);
      setProfile((prev) => ({
        ...prev,
        ...updatedProfileData,
        isLoading: false,
        errorMessage: null,
      }));
    } catch (err) {
      setProfile((prev) => ({
        ...prev,
        isLoading: false,
        errorMessage: "Failed to update profile data",
      }));
    }
  };

  useEffect(() => {
    if (auth?.accessToken) {
      fetchProfile();
    } else {
      setProfile(defaultProfileState);
    }
  }, [auth?.accessToken]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
