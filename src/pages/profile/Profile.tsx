import React from "react";
import useAuth from "../../hooks/useAuth";
import {
  useNavigate,
  useLocation,
  NavigateFunction,
  Location,
} from "react-router-dom";
import { AuthState } from "../../context/AuthProvider";

interface ProfileData {
  about?: string;
  gender?: string;
  age?: number;
  height?: number;
  weight?: number;
  bmi?: number;
  [key: string]: any;
}

interface ProfileProps {
  username: string;
  createdProfile: boolean;
  profile: ProfileData;
}

interface LocationState {
  from?: {
    pathname: string;
  };
}

const Profile: React.FC<ProfileProps> = (props) => {
  const { auth } = useAuth() as { auth: AuthState };
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation() as Location & { state: LocationState };

  const handleClickCreateProfile = (): void => {
    const from: string = location.state?.from?.pathname || "/form_profile";
    navigate(from, { replace: true });
  };

  const handleClickEditProfile = (): void => {
    const from: string = location.state?.from?.pathname || "/form_profile";
    navigate(from, { replace: true });
  };

  return (
    <div>
      {props.createdProfile ? (
        <div className="tablet:mx-[2.5%] tablet:mb-5 relative h-[100%] rounded-xl bg-[#fbc3bc] pb-10 md:ml-5">
          <p className="max-w-[100%] p-5 text-gray-700">
            <b>Username</b> : {props.username}{" "}
          </p>
          <p className="max-w-[750px] px-5 pb-5 text-gray-700">
            <b>About</b> : {props.profile.about}{" "}
          </p>
          <p className="px-5 pb-5 text-gray-700">
            <b>Gender</b> : {props.profile.gender}{" "}
          </p>
          <p className="px-5 pb-5 text-gray-700">
            <b>Age</b> : {props.profile.age} years{" "}
          </p>
          <p className="px-5 pb-5 text-gray-700">
            <b>Height</b> : {props.profile.height} centimeters{" "}
          </p>
          <p className="px-5 pb-5 text-gray-700">
            <b>Weight</b> : {props.profile.weight} kilograms{" "}
          </p>
          <p className="px-5 pb-5 text-gray-700">
            <b>BMI</b> : {props.profile.bmi}{" "}
          </p>
          <button
            className="mx-5 rounded-lg bg-[#ff5757] p-3 font-bold text-white"
            onClick={handleClickEditProfile}
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="tablet:mx-[2.5%] tablet:mb-5 relative h-[100%] rounded-xl bg-[#fbc3bc] pb-10 md:ml-5">
          <div className="pt-10">
            <p className="pb-10 text-center text-gray-700">
              Login first time? <span className="font-bold">{auth.user}</span>
            </p>
            <button
              onClick={handleClickCreateProfile}
              className="mx-auto mb-5 flex justify-center rounded-full bg-[#F08080] px-10 py-2 font-bold text-white shadow-md hover:bg-[#ff5757] hover:shadow-lg"
            >
              Create Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
