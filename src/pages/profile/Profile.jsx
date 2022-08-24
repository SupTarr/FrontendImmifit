import React from "react";

function Profile() {
  return (
    <div className="h-[100%] bg-[#fbc3bc] rounded-xl md:ml-5 tablet:mx-[2.5%] relative pb-10">
      <div className="flex items-end w-[100%] h-[300px] bg-[#5F576C] rounded-t-xl">
        <div className="w-[125px] h-[125px] mx-auto lg:ml-10 rounded-lg bg-[#FFFFFF]">
        </div>
      </div>
      <div className="pt-10">
        <p className="text-center pb-10">Login first time? <a className="font-bold">Create Profile</a></p>
        <button className="mx-auto bg-[#F08080] hover:bg-[#ff5757] shadow-md hover:shadow-lg text-white font-bold px-10 py-2 rounded-full flex justify-center">
          Create Profile
        </button>
        
      </div>
    </div>
  );
}

export default Profile;