import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import "./container.css";
import Card from "../card/Card";
import Header from "../header/Header";

const Container = (props, {newActivity}) => {
  // const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  async function getUsers() {
    const response = await fetch(`https://immifit-backend.vercel.app/activities/${props.username}`, {
        method: 'GET',
        headers: {
        accept: 'application/json',
      },
    });
    const data = await response.json();

    setAllUsers(data)
    // setUsers(data)
    
  } 
  useEffect(() => {
    getUsers();
  }, []);

  return (
    
    <div >
      <div>
        <Header allUsers={allUsers} getUsers={getUsers}/>
      </div>

      {/* ✅ check if array before calling `map()` */}
      {/* <div className="flex flex-wrap justify-center">
        {Array.isArray(allUsers)
          ? allUsers.map((item, index) => (
            <Card key={index} item={item} setAllUsers={setAllUsers} newActivity={newActivity} allUsers={allUsers}/>
          ))

          : console.log("no data")}
      </div> */}
    </div>
     
  );
}


export default Container;
