import React from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'  
import "./header.css";

const Header = () => {
  return (
    <div id="Header-desktop" className="Header">
      <div className="Container">
        <div className="Button">ALL</div>
        <div className="Button">RUN</div>
        <div className="Button">SWIM</div>
        <select className="dropDown">
          <option value="BIKE">BIKE</option>
          <option value="WALK">WALK</option>
          <option value="STACK">STACK</option>
          <option value="HOCKEY">HOCKEY</option>
        </select>
      </div>
      <div className="Activity">
        <button className="Button-Activity">
          <Link to="/form/1">Add Activity</Link>
        </button>
      </div>
    </div>
  );
};

export default Header;
