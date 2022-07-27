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
          {/* <label for="Dropdown">BIKE</label> */}
          {/* <div class="dropdown">
            <button class="dropbtn" onclick="">Dropdown
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content" id="myDropdown">
              <option value="BIKE">BIKE</option>
              <option value="WALK">WALK</option>
              <option value="STACK">STACK</option>
              <option value="HOCKEY">HOCKEY</option>
            </div>
          </div> */}
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
