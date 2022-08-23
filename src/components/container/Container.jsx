import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import "./container.css";
import Card from "../card/Card";
import Header from "../header/Header";

const Container = (props) => {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const response = await fetch(`https://immifit-backend.vercel.app/activities/${props.username}`, {
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

  return (
    
    <div >
      <div>
        <Header user={users} allUsers={allUsers} setUsers={setUsers}/>
      </div>

      {/* ✅ check if array before calling `map()` */}
      <div className="flex flex-wrap justify-center">
        {Array.isArray(users)
          ? users.map((user, index) => (
            <Card key={index} user={user} users={users} setUsers={setUsers}/>
          ))

          : console.log("no data")}
      </div>
    </div>
     
  );
}


export default Container;
