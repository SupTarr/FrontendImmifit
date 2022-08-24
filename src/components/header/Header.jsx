import React from "react";
import { useContext } from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
//  Context
// import { NewActContext } from "../card/Card";
import "./header.css";
// import {handleBtns} from "../../components/container/Container";
import Card from "../card/Card";
import { useEffect, useState } from "react";
import axios from "../../api/axios";




const Header = ({ allUsers, getUsers, setAllUsers }, props) => {
  // const { newActivity, setNewActivity} = useContext(NewActContext);

  // const [isDeleted, setIsDeleted] = useState([])
  console.log("this is allusers",allUsers)

  const fetchDataByType =  async (type) => {
    console.log("this is users",allUsers)
    console.log("This is type",type)
  
    try {
      
      // 
      // const filterType = allUsers
      const res = await axios.get(`/activities/${props.username}`)
      console.log("fetchDatabyType", res.data);
      setAllUsers(res.data);
      // setAllUsers(filterType);
    } catch (e) {
      console.log(e);
    }
  };
  
  useEffect(() => {
    fetchDataByType();
  }, []);

    const handleClickSortAll = (e) => {
      e.preventDefault();
      getUsers();
    }
    const handleClickSortRun = (e) => {
      e.preventDefault();
      fetchDataByType("Running")
    }
    const handleClickSortSwim = (e) => {
      e.preventDefault();
      fetchDataByType("Swimming")
    }
    const handleClickSortOther = (e) => {
      e.preventDefault();
      fetchDataByType(e.target.value)
    }

  return (

    // filter
    // ["Running", "Cycling", "Swimming", "Weight training", "Walking"]
    <div className="Header mt-5 flex justify-between flex-wrap xl:w-[700px] md:w-[450px] relative z-40">
      <div className="Container bg-white bg-opacity-50 backdrop-blur-sm rounded-full drop-shadow-lg">
        <button className="Button hover:bg-[#005B97] hover:text-white py-2 px-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-full drop-shadow-lg font-semibold" value="All" onClick={handleClickSortAll} >
          ALL
        </button>
        <button className="Button hover:bg-[#005B97] hover:text-white py-2 px-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-full drop-shadow-lg font-semibold" value="Running" onClick={handleClickSortRun} >
          RUN
        </button>
        <button className="Button hover:bg-[#005B97] hover:text-white py-2 px-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-full drop-shadow-lg font-semibold" value="Swimming" onClick={handleClickSortSwim} >
          SWIM
        </button>
        <div className="Button rounded-full">
          <div className="dropdown inline-block relative">
            <div className="hover:bg-[#005B97] hover:text-white bg-white bg-opacity-50 backdrop-blur-sm drop-shadow-lg text-black font-semibold py-2 px-4 rounded-full inline-flex items-center">
              <button className="mr-1" value="Bike">Other</button>
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
            </div>

            <div className="dropdown-menu absolute hidden text-gray-700 pt-1">
              <button className=" bg-white hover:bg-gray-400 py-2 px-4 w-[150px] block whitespace-no-wrap" href="#" value="Weight" onClick={handleClickSortOther} >Weight training</button>
              <button className=" bg-white hover:bg-gray-400 py-2 px-4 w-[150px] block whitespace-no-wrap" href="#" value="Cycling" onClick={handleClickSortOther} >Cycling</button>
              <button className="rounded-b bg-white hover:bg-gray-400 py-2 px-4 w-[150px] block whitespace-no-wrap" href="#" value="Walk" onClick={handleClickSortOther} >Walking</button>

            </div>
          </div>
        </div>
      </div>


     {/* ✅ check if array before calling `map()`
      <div className="Card flex flex-row flex-wrap ">
        {allUsers.map((user, index) => (
            <Card 
            key={index} 
            user={user}
             />
          ))}
      </div>  */}
    </div>

  );
};

export default Header;
