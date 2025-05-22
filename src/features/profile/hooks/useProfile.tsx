import { useContext } from "react";
import ProfileContext from "../context/ProfileProvider.tsx";
import { ProfileContextType } from "../types/Profile.ts";

const useProfile = (): ProfileContextType => {
  return useContext(ProfileContext);
};

export default useProfile;
