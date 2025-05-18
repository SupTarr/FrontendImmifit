import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import AuthContext from "./AuthProvider";
import axiosInstance from "../api/axios.js";

export interface ProfileState {
  profileId?: string | null;
  userId?: string | null;
  about?: number | null;
  gender?: number | null;
  age?: number | null;
  height?: number | null;
  weight?: number | null;
  bmi?: number | null;
  imageUrl?: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface ProfileContextType {
  profile: ProfileState;
  updateProfile: (profileData: Partial<ProfileState>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const defaultProfileState: ProfileState = {
  profileId: null,
  userId: null,
  about: null,
  gender: null,
  age: null,
  weight: null,
  height: null,
  bmi: null,
  imageUrl: null,
  isLoading: false,
  error: null,
};

const ProfileContext = createContext<ProfileContextType>({
  profile: defaultProfileState,
  updateProfile: async () => {},
  refreshProfile: async () => {},
});

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider = ({
  children,
}: ProfileProviderProps): JSX.Element => {
  const [profile, setProfile] = useState<ProfileState>(defaultProfileState);
  const { auth } = useContext(AuthContext);

  const fetchProfile = async () => {
    if (!auth?.accessToken) {
      return;
    }

    setProfile((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await axiosInstance.get("/users", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      setProfile({
        ...response.data.body,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      console.error("Error fetching profile data", err);
      setProfile((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to fetch profile data",
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

  const updateProfile = async (profileData: Partial<ProfileState>) => {
    if (!auth?.accessToken) {
      return;
    }

    setProfile((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      await axiosInstance.post("/users", profileData, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      setProfile((prev) => ({
        ...prev,
        ...profileData,
        isLoading: false,
        error: null,
      }));
    } catch (err) {
      console.error("Error updating profile data", err);
      setProfile((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to update profile data",
      }));
    }
  };

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
