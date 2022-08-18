import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./profiles-form.css";
import Profileform from "../../components/profiles-form/profiles-form";
import axios from "axios";
import cors from "cors";

function Profilesform() {
  return (
    <div className="home">
      <div>
        <Navbar />
        <div className="Activities w-[30%] tablet:w-[95%] tablet:mx-[2.5%] mx-auto mb-5 bg-[#fbc3bc] rounded-xl">
        <Profileform />
          </div>
      </div>
      </div>
  );
}

export default Profilesform;
