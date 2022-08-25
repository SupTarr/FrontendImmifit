import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import "./container.css";
import Card from "../card/Card";
import Header from "../header/Header";
import FormDetail from "../form-component/FormDetail"

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
    console.log(data);
    setAllUsers(data)
    // setUsers(data)
  } 
  useEffect(() => {
    getUsers();
  }, []);

  // const [activities, setActivities] = useState([])
  // const updateActivity = async (id) => {
  //   try {
  //     const idx = activities.findIndex((activity) => activity._id === id);
  //     const newActivity = [...activities];

  //     let updateData = {
  //       img: {
  //         name: selectedImgFile.name,
  //       },
  //       title: title,
  //       activity_type: type,
  //       date: date,
  //       start_time: new Date(`${date} ${startTime}`),
  //       end_time: new Date(`${date} ${endTime}`),
  //       description: description,
  //     };

  //     const res = await axios.put(`/activity_id/${id}`, updateData);
  //     newActivity[idx] = res.data;
  //     setActivities(newActivity);
  //     getUsers();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };


  return (
    
    <div >
      <div className="w-[100%] mx-auto flex justify-center">
        <Header allUsers={allUsers} getUsers={getUsers} setAllUsers={setAllUsers}/>
      </div>

      {/* ✅ check if array before calling `map()` */}
      <div className="flex flex-wrap justify-center">
        {Array.isArray(allUsers)
          ? allUsers.map((item, index) => (
            <Card key={index} item={item} setAllUsers={setAllUsers} newActivity={newActivity} allUsers={allUsers}/>
          ))

          : console.log("no data")}
      </div>
     
    </div>
     
  );
}


export default Container;
