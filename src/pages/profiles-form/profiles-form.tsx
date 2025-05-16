import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./profiles-form.css";
import Profileform from "../../components/profiles-form/profiles-form";

const Profilesform: React.FC = () => {
  return (
    <div className="home max-h-[1000px] min-h-[100vh] pb-5">
      <Navbar />
      <div className="Activities tablet:mx-[2.5%] tablet:w-[95%] mx-auto my-10 w-[100%] max-w-[750px] rounded-xl bg-[#fbc3bc]">
        <Profileform />
      </div>
    </div>
  );
};

export default Profilesform;
