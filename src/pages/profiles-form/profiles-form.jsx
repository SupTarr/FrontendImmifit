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
        <div className="flex tablet:flex-col max-w-[1300px] mx-auto">
          <div className="Profile w-[40%] tablet:w-[100%] mb-5">
            <Profileform />
          </div>
        </div>
      </div>
      </div>
  );
}

export default Profilesform;
