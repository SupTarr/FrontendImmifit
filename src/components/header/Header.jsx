import React from "react";
import { useContext } from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
//  Context
// import { NewActContext } from "../card/Card";
import "./header.css";
// import {handleBtns} from "../../components/container/Container";
import Card from "../card/Card";
import { useEffect, useState } from "react";




const Header = ({ item, allUsers, getUsers }) => {
  // const { newActivity, setNewActivity} = useContext(NewActContext);

  // const [isDeleted, setIsDeleted] = useState([])


  const handleBtns = (event) => {
    // console.log(users)
    console.log(allUsers)
    // const allUsers = ["Running", "Cycling", "Swimming", "Weight training", "Walking", "Biking", "Hockey", "Sleeping", "Eat" ]
    // console.log(users)
    event.preventDefault();
    const value = event.target.value;
    if (value === "All") {
      const users = allUsers.filter((user) => user.activity_type)
      // users.map((user, index) => {<Card key={index} user={user} />})
      console.log(users)
    }
    else if (value === "Run") {
      const users = allUsers.filter((user) => user.activity_type === "Running")
      console.log(users)
    }
    else if (value === "Swim") {
      const users = allUsers.filter((user) => user.activity_type === "Swimming")
      console.log(users)
    }
    else if (value === "Walk") {
      const users = allUsers.filter((user) => user.activity_type === "Walking")
      console.log(users)
    }
    else if (value === "Cycling") {
      const users = allUsers.filter((user) => user.activity_type === "Cycling")
      console.log(users)
    }
    else if (value === "Weight") {
      const users = allUsers.filter((user) => user.activity_type === "Weight training")
      console.log(users)
    }

  };
  return (

    // filter
    // ["Running", "Cycling", "Swimming", "Weight training", "Walking"]
    <div className="Header mt-5 flex justify-between flex-wrap xl:w-[800px] md:w-[500px] relative z-40">
      <div className="Container bg-white bg-opacity-50 backdrop-blur-sm rounded-full drop-shadow-lg">
        <button className="Button hover:bg-[#005B97] hover:text-white py-2 px-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-full drop-shadow-lg font-semibold" value="All" onClick={handleBtns} getUsers={getUsers}>
          ALL
        </button>
        <button className="Button hover:bg-[#005B97] hover:text-white py-2 px-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-full drop-shadow-lg font-semibold" value="Run" onClick={handleBtns} getUsers={getUsers}>
          RUN
        </button>
        <button className="Button hover:bg-[#005B97] hover:text-white py-2 px-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-full drop-shadow-lg font-semibold" value="Swim" onClick={handleBtns} getUsers={getUsers}>
          SWIM
        </button>
        <div className="Button rounded-full">
          <div className="dropdown inline-block relative">
            <div className="hover:bg-[#005B97] hover:text-white bg-white bg-opacity-50 backdrop-blur-sm drop-shadow-lg text-black font-semibold py-2 px-4 rounded-full inline-flex items-center">
              <button className="mr-1" value="Bike">Other</button>
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
            </div>
            <div className="dropdown-menu absolute hidden text-gray-700 pt-1">
              <button className=" bg-white hover:bg-gray-400 py-2 px-4 w-[150px] block whitespace-no-wrap" href="#" value="Weight" onClick={handleBtns} getUsers={getUsers}>Weight training</button>
              <button className=" bg-white hover:bg-gray-400 py-2 px-4 w-[150px] block whitespace-no-wrap" href="#" value="Cycling" onClick={handleBtns} getUsers={getUsers}>Cycling</button>
              <button className="rounded-b bg-white hover:bg-gray-400 py-2 px-4 w-[150px] block whitespace-no-wrap" href="#" value="Walk" onClick={handleBtns} getUsers={getUsers}>Walking</button>

            </div>
          </div>
        </div>
      </div>


      {/* ✅ check if array before calling `map()` */}
      {/* <div className="Card flex flex-row flex-wrap ">
        {allUsers.map((user, index) => (
            <Card 
            key={index} 
            user={user}
             />
          ))}
      </div>   */}
    </div>

  );
};

export default Header;
