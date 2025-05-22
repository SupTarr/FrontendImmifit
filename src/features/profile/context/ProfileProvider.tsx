import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import AuthContext from "../../auth/context/AuthProvider";
import axiosInstance from "../../../shared/api/axios.js";
import {
  ProfileState,
  ProfileContextType,
  defaultProfileState,
} from "../types/Profile.ts";

interface ProfileProviderProps {
  children: ReactNode;
}

const ProfileContext = createContext<ProfileContextType>({
  profile: defaultProfileState,
  updateProfile: async () => {},
  refreshProfile: async () => {},
});

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [profile, setProfile] = useState<ProfileState>(defaultProfileState);
  const { auth } = useContext(AuthContext);

  const fetchProfile = async () => {
    if (!auth?.accessToken) {
      return;
    }

    setProfile((prev) => ({ ...prev, isLoading: true, errorMessage: null }));
    try {
      const response = await axiosInstance.get("/profile");
      setProfile({
        ...response.data.body,
        isLoading: false,
        errorMessage: null,
      });
    } catch (err) {
      console.error("Error fetching profile data", err);
      setProfile((prev) => ({
        ...prev,
        isLoading: false,
        errorMessage: "Failed to fetch profile data",
      }));
    }
  };

  const updateProfile = async (
    profileData: Partial<ProfileState>,
    file: Blob | null,
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

    const formData = new FormData();
    formData.append("about", profileData.about || "");
    formData.append("gender", profileData.gender?.toString() || "");
    formData.append("age", profileData.age?.toString() || "");
    formData.append("weight", profileData.weight?.toString() || "");
    formData.append("height", profileData.height?.toString() || "");
    if (file) {
      formData.append("imageId", profileData.image?.id || "");
      formData.append("file", file, `${crypto.randomUUID()}.png`);
    }

    try {
      const response = await axiosInstance.post("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProfile((prev) => ({
        ...prev,
        ...response.data.body,
        isLoading: false,
        errorMessage: null,
      }));
    } catch (err) {
      console.error("Error updating profile data", err);
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
        refreshProfile: fetchProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
