import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./profiles-form.css";
import Profileform from "../../components/profiles-form/profiles-form";

const Profilesform: React.FC = () => {
  return (
    <div className="home min-h-[100vh] max-h-[1000px] pb-5">
      <Navbar />
      <div className="Activities max-w-[750px] w-[100%] tablet:w-[95%] tablet:mx-[2.5%] mx-auto my-10 bg-[#fbc3bc] rounded-xl">
        <Profileform />
      </div>
    </div>
  );
};

export default Profilesform;
