import React from "react";
import "./header.css";

const Header = () => {

  return (
    <div className="Header">
      <div className="Container">
        <div className="Button">
          ALL
        </div>
        <div className="Button">
          RUN
        </div>
        <div className="Button">
          SWIM
        </div>
        <div className="Button">
          <option value="BIKE">BIKE</option>
          <option value="WALK">WALK</option>
          <option value="STACK">STACK</option>
          <option value="HOCKEY">HOCKEY</option>
        </div>
      </div>
      <div className="Activity">
        <div className="Button-Activity">
          Add Activity
        </div>
      </div>
    </div>


  )
}

export default Header;
