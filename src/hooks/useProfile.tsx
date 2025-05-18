import { useContext } from "react";
import ProfileContext, {
  ProfileContextType,
} from "../context/ProfileProvider.tsx";

const useProfile = (): ProfileContextType => {
  return useContext(ProfileContext);
};

export default useProfile;
