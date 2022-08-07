import React from "react";
import "./header.css";

const Header = () => {

  return (
    <div className="Header">
      <div className="Container bg-white bg-opacity-50 backdrop-blur-xl rounded-full drop-shadow-lg">
        <div className="Button hover:bg-[#005B97] hover:text-white py-2 px-4 bg-white bg-opacity-50 backdrop-blur-xl rounded-full drop-shadow-lg font-semibold">
          ALL
        </div>
        <div className="Button hover:bg-[#005B97] hover:text-white py-2 px-4 bg-white bg-opacity-50 backdrop-blur-xl rounded-full drop-shadow-lg font-semibold">
          RUN
        </div>
        <div className="Button hover:bg-[#005B97] hover:text-white py-2 px-4 bg-white bg-opacity-50 backdrop-blur-xl rounded-full drop-shadow-lg font-semibold">
          SWIM
        </div>
        <div className="Button rounded-full">
          <div className="dropdown inline-block relative">
            <button className="hover:bg-[#005B97] hover:text-white bg-white bg-opacity-50 backdrop-blur-xl drop-shadow-lg text-black font-semibold py-2 px-4 rounded-full inline-flex items-center">
              <span className="mr-1">Bike</span>
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
            </button>
            <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
              <li className=""><a className="rounded-t bg-white hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Hockey</a></li>
              <li className=""><a className="bg-white hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Sleep</a></li>
              <li className=""><a className="rounded-b bg-white hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Eat</a></li>
            </ul>
          </div>

        </div>
      </div>
      <div className="Activity">
        <div className="Button-Activity mr-10 hover:bg-[#005B97] hover:text-white text-black font-semibold bg-white bg-opacity-50 backdrop-blur-xl rounded-ful drop-shadow-lg">
          Add Activity
        </div>
      </div>

    </div>


  )
}

export default Header;
