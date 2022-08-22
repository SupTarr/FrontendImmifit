import React from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import "./header.css";
// import {handleBtns} from "../../components/container/Container";

const Header = () => {
  
  return (
    <div className="Header mt-5">
      <div className="Container bg-white bg-opacity-50 backdrop-blur-sm rounded-full drop-shadow-lg">
        <button className="Button hover:bg-[#005B97] hover:text-white py-2 px-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-full drop-shadow-lg font-semibold" value="All" onClick="">
          ALL
        </button>
        <button className="Button hover:bg-[#005B97] hover:text-white py-2 px-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-full drop-shadow-lg font-semibold" value="Run" onClick="">
          RUN
        </button>
        <button className="Button hover:bg-[#005B97] hover:text-white py-2 px-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-full drop-shadow-lg font-semibold" value="Swim" onClick="">
          SWIM
        </button>
        <div className="Button rounded-full">
          <div className="dropdown inline-block relative">
            <button className="hover:bg-[#005B97] hover:text-white bg-white bg-opacity-50 backdrop-blur-sm drop-shadow-lg text-black font-semibold py-2 px-4 rounded-full inline-flex items-center">
              <button className="mr-1" value="Bike" onClick="">Bike</button>
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
            </button>
            <div className="dropdown-menu absolute hidden text-gray-700 pt-1">
              <button className="rounded-t bg-white hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#" value="Hockey" onClick="">Hockey</button>
              <button className=" bg-white hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#" value="Sleep" onClick="">Sleep</button>
              <button className="rounded-b bg-white hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#" value="Eat" onClick="">Eat</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
