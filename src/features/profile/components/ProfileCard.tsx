import { Link } from "react-router-dom";
import { useContext } from "react";
import ProfileContext from "../context/ProfileProvider.tsx";
import useAuth from "../../auth/hooks/useAuth";
import ProfileImage from "../../../shared/components/ui/ProfileImage";
import { Profile } from "../../../shared/const/Links";
import Gender from "../../../shared/const/Gender.ts";

const Navbar = () => {
  const { auth } = useAuth();
  const { profile } = useContext(ProfileContext);

  return (
    <div className="card bg-base-100 mx-5 max-w-9/12 p-5 drop-shadow-2xl sm:min-w-100">
      <ProfileImage src={profile?.image?.url} />
      <div className="card-body">
        <div className="flex items-center justify-center">
          <h1 className="card-title text-center">{auth?.username}</h1>
        </div>
        <h2 className="mt-2 font-bold">About:</h2>
        <p>{profile?.about}</p>
        <h2 className="mt-2 font-bold">Gender:</h2>
        <p>{profile?.gender === Gender.Male ? "Male" : "Female"}</p>
        <h2 className="mt-2 font-bold">Age:</h2>
        <p>{profile?.age}</p>
        <h2 className="mt-2 font-bold">Weight:</h2>
        <p>{profile?.weight} kg</p>
        <h2 className="mt-2 font-bold">Height:</h2>
        <p>{profile?.height} m</p>
        <h2 className="mt-2 font-bold">BMI:</h2>
        <p>{profile?.bmi}</p>
        <div className="card-actions justify-end">
          <Link to={Profile}>
            <button className="btn btn-neutral">Edit Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
