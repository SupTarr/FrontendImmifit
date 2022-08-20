import React from "react";
import { useEffect, useState} from "react";
// import axios from 'axios';
import "./container.css";
import Card from "../card/Card";

// import {useParams} from "react-router-dom";

const Container = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    async function getUsers() {
      const response = await fetch('https://immifit-backend.vercel.app/activities', {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      });

      const data = await response.json();
      setUsers(data)
      
    } getUsers();
  }, []);

  return (
    <div>
      {/* ✅ check if array before calling `map()` */}
      {Array.isArray(users)
        ? users.map((user, index )=> (
          <Card key={index} user={user} />
        ))
        
        : console.log("no data")}
        {/* {Array.isArray(users)
        ? users.map((user, index )=> (
          <Card key={index} user={user} />
        ))
        
        : console.log("no data")} */}
    </div>
  );
}


export default Container;


