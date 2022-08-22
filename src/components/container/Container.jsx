import React from "react";
import { useEffect, useState } from "react";
// import axios from 'axios';
import "./container.css";
import Card from "../card/Card";

const Container = () => {

  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {

    async function getUsers() {
      const response = await fetch('https://immifit-backend.vercel.app/activities', {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });
      const data = await response.json();

      setAllUsers(data)
      setUsers(data)

    } getUsers();
  }, []);

  const handleBtns = (event) => {

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
    
    <div >
      {/* ✅ check if array before calling `map()` */}
      <h1>Social Cards</h1>
      <button value="All" onClick={handleBtns}>
        All
      </button>
      <button value="Run" onClick={handleBtns}>
        Run
      </button>
      <button value="Swim" onClick={handleBtns}>
        Swim
      </button>
      <div className="flex flex-wrap mx-7">
        {Array.isArray(users)
          ? users.map((user, index) => (
            <Card key={index} user={user} />
          ))

          : console.log("no data")}
      
      </div>
      
    </div>
     
  );
}


export default Container;
// export {handleBtns};