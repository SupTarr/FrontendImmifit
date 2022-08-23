import React from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
// import { AppContext } from "../../../context/Context";
import "./header.css";
// import {handleBtns} from "../../components/container/Container";


const Header = ({user, allUsers, setUsers}) => {
  const handleBtns = (event) => {
    console.log(allUsers)
    // console.log(users)
    // console.log(setUsers)
    const value = event.target.value;
    if (value === "All") {
      const filteredUsers = allUsers
      setUsers(filteredUsers)
    } else if (value === "Run") {
      const filteredUsers = allUsers.filter(user => user.
        activity_type === "Running")
      setUsers(filteredUsers)
    } else if (value === "Swim") {
      const filteredUsers = allUsers.filter(user => user.
        activity_type === "Swimming")
      setUsers(filteredUsers)
    } else if (value === "Bike") {
      const filteredUsers = allUsers.filter(user => user.
        activity_type === "Biking")
      setUsers(filteredUsers)
    } else if (value === "Hockey") {
      const filteredUsers = allUsers.filter(user => user.
        activity_type === "Hockey")
      setUsers(filteredUsers)
    } else if (value === "Sleep") {
      const filteredUsers = allUsers.filter(user => user.
        activity_type === "Sleeping")
      setUsers(filteredUsers)
    } else if (value === "Eat") {
      const filteredUsers = allUsers.filter(user => user.
        activity_type === "Eat")
      setUsers(filteredUsers);

    }

  };
  return (
    <div className="Header mt-5">
      <div className="Container bg-white bg-opacity-50 backdrop-blur-sm rounded-full drop-shadow-lg">
        <button className="Button hover:bg-[#005B97] hover:text-white py-2 px-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-full drop-shadow-lg font-semibold" value="All" onClick={handleBtns}>
          ALL
        </button>
        <button className="Button hover:bg-[#005B97] hover:text-white py-2 px-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-full drop-shadow-lg font-semibold" value="Run" onClick={handleBtns}>
          RUN
        </button>
        <button className="Button hover:bg-[#005B97] hover:text-white py-2 px-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-full drop-shadow-lg font-semibold" value="Swim" onClick={handleBtns}>
          SWIM
        </button>
        <div className="Button rounded-full">
          <div className="dropdown inline-block relative">
            <button className="hover:bg-[#005B97] hover:text-white bg-white bg-opacity-50 backdrop-blur-sm drop-shadow-lg text-black font-semibold py-2 px-4 rounded-full inline-flex items-center">
              <button className="mr-1" value="Bike" onClick={handleBtns}>Bike</button>
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
            </button>
            <div className="dropdown-menu absolute hidden text-gray-700 pt-1">
              <button className="rounded-t bg-white hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#" value="Hockey" onClick={handleBtns}>Hockey</button>
              <button className=" bg-white hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#" value="Sleep" onClick={handleBtns}>Sleep</button>
              <button className="rounded-b bg-white hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#" value="Eat" onClick={handleBtns}>Eat</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
