import useAuth from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";

const Navbar = () => {
  const { auth } = useAuth();
  const { profile } = useProfile();

  return (
    <div className="card bg-base-100 p-5 shadow-sm min-w-100">
      <figure className="avatar">
        <div className="w-32 rounded-full">
          <img
            src={
              profile?.imageUrl ||
              "https://img.daisyui.com/images/profile/demo/superperson@192.webp"
            }
          />
        </div>
      </figure>
      <div className="card-body">
        <div className="flex items-center justify-center">
          <h1 className="card-title text-center">{auth?.username}</h1>
        </div>
        <h2 className="mt-2 font-bold">About:</h2>
        <p>{profile?.about}</p>
        <h2 className="mt-2 font-bold">Gender:</h2>
        <p>{profile?.gender === 1000 ? "Male" : "Female"}</p>
        <h2 className="mt-2 font-bold">Age:</h2>
        <p>{profile?.age}</p>
        <h2 className="mt-2 font-bold">Weight:</h2>
        <p>{profile?.weight} kg</p>
        <h2 className="mt-2 font-bold">Height:</h2>
        <p>{profile?.height} m</p>
        <h2 className="mt-2 font-bold">BMI:</h2>
        <p>{profile?.bmi}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
