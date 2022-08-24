import React from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from 'react-router-dom';

function Profile(props) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickCreateProfile = () => {
    const from = location.state?.from?.pathname || "/form_profile";
    navigate(from, { replace: true });
  }
  
  const handleClickEditProfile = () => {
    const from = location.state?.from?.pathname || "/form_profile";
    navigate(from, { replace: true });
  }

  return (
    <div>
      {
        props.createdProfile ? (
          <div className="h-[100%] bg-[#fbc3bc] rounded-xl md:ml-5 tablet:mx-[2.5%] relative pb-10 tablet:mb-5">
            <p className="text-gray-700 p-5"><b>Username</b> : {props.username} </p>
            <p className="text-gray-700 px-5 pb-5"><b>About</b> : {props.profile.about} </p>
            <p className="text-gray-700 px-5 pb-5"><b>Gender</b> : {props.profile.gender} </p>
            <p className="text-gray-700 px-5 pb-5"><b>Age</b> : {props.profile.age} years </p>
            <p className="text-gray-700 px-5 pb-5"><b>Height</b> : {props.profile.height} centimeters </p>
            <p className="text-gray-700 px-5 pb-5"><b>Weight</b> : {props.profile.weight} kilograms </p>
            <p className="text-gray-700 px-5 pb-5"><b>BMI</b> : {props.profile.bmi} </p>
            <button className="bg-[#ff5757] p-3 rounded-lg mx-5" onClick={handleClickEditProfile}>Edit</button>
          </div>
        ) : (
          <div className="h-[100%] bg-[#fbc3bc] rounded-xl md:ml-5 tablet:mx-[2.5%] relative pb-10 tablet:mb-5">
            <div className="pt-10">
              <p className="text-center text-gray-700 pb-10">Login first time? <span className="font-bold">{auth.user}</span></p >
              <button onClick={handleClickCreateProfile} className="mx-auto bg-[#F08080] hover:bg-[#ff5757] shadow-md hover:shadow-lg text-white font-bold px-10 py-2 rounded-full flex justify-center mb-5">
                Create Profile
              </button>
            </div >
          </div >
        )
      }
    </div>
  );
}

export default Profile;