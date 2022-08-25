import React from 'react'
import axios from "../../api/axios";
import './card.css'
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const config = {
  headers: {
    'Content-Type': 'application/json',
    'Aceess-Control-Allow-Origin': '*',
    'withCredentials': true,
  }
}

const Card = ({item, setAllUsers, allUsers, getUsers }, props) => {
  // const [newActivity, setNewActivity] = useState([]);
  // const title_name = item.start
  var now = new Date(item.end_time);
  var then = new Date(item.start_time);
  var datetime = new Date(item.date);
  var date = moment(datetime).format('DD/MM/YYYY');
  // console.log(datetime)
  // console.log(item.activity_id)
  
  console.log(item)
  var duration = (now - then) / 60000;
  // console.log(duration)

  // navigate
  const navigate = useNavigate();
  const location = useLocation();



  const handleClickEditCard = () => {
    const from = location.state?.from?.pathname || `/form?activity_id=${item.activity_id}`;
    navigate(from, { replace: true });
  }

  const handleDeleteClick  = async (id) => {
    try {
      // e.preventDefault();
      const id = item.activity_id;
      await axios.delete(`/activities/${item.activity_id}`, config)      
      const newActivity = allUsers.filter((item) => item.activity_id !== id);
      // console.log(setAllUsers)
      setAllUsers(newActivity); 
      // setNewActivity(newActivity); 
      
      console.log(id)
      // console.log(newActivity)
      
    } catch (error) {
      console.log(error)
    }
  }

  

  return (
    <div>
      <div className="flex justify-around mx-auto" >
        <figure className="snip1174 hover:bg-white rounded-[40px]">
          <img src={item.img.url} alt="imgcard" className='block rounded-[40px] border shadow-md hover:bg-white dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-700 sm:mx-auto ' />
          <figcaption>
            <h5 className="mb-2 tracking-tight text-md text-black font-bold">{item.title}</h5>
            <div className="grid grid-cols-2">
              <h5 className="mb-2 text-sm tracking-tight text-black">
                <b className="text-sm">Date</b> : {date}</h5>
              <h5 className="mb-2 text-sm tracking-tight text-black">
              <b className="text-sm">Duration</b> : {duration} Minutes
              </h5>
            </div>
            <div className="grid">
              <h5 className="mb-2 text-sm tracking-tight text-black">
              <b className="text-sm">Type</b> : {item.activity_type}
              </h5>
            </div>
            <div className="grid">
              <h5 className="mb-2 text-sm tracking-tight text-black">
              <b className="text-sm">Description</b> : {item.description}
              </h5>
            </div>

            <div className="grid grid-cols-3 gap-36">

              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text"></span>
                  <input type="checkbox" className="toggle toggle-accent" />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-24">
                <button href="/form/" className="bg-[#F08080] hover:bg-[#ff5757] text-white font-bold px-10 py-2 shadow-md hover:shadow-lg rounded flex justify-center" onClick={handleClickEditCard} >
                  Edit
                </button>
                <button className="
                bg-[#F08080] hover:bg-[#ff5757] text-white font-bold px-10 py-2 
                shadow-md hover:shadow-lg rounded flex justify-center" onClick={handleDeleteClick} getUsers={getUsers} >
                  Delete
                </button>
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  )
};



export default Card



