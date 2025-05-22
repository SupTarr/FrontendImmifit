import { Link } from "react-router-dom";
import { Profile } from "../../../shared/const/Links";
import ProfileImage from "../../../shared/components/ui/ProfileImage";

const DefaultProfileCard = () => {
  return (
    <div className="card bg-base-100 mx-5 max-w-9/12 p-5 drop-shadow-2xl sm:min-w-100">
      <ProfileImage />
      <div className="card-body">
        <p className="text-center">You have not created a profile yet.</p>
        <p className="text-center">
          Please create a profile to see your information.
        </p>
        <div className="mt-5 flex items-center justify-center">
          <Link to={Profile}>
            <button className="btn btn-neutral">Create Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DefaultProfileCard;
