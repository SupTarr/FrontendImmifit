import React from 'react'
import './card.css'
import Stretching from '../../../public/Stretching.png'
import moment from 'moment';

const Card = ({ user }) => {
// const title_name = user.start
var now  = new Date(user.end_time);
var then = new Date(user.start_time);
var datetime = new Date(user.date);
var date = moment(datetime).format('DD/MM/YYYY');
// console.log(datetime)

var duration = (now-then) / 60000;
// console.log(duration)
  return (
    <div>
      <div className="flex justify-around flex-wrap" >
      <figure className="snip1174 hover:bg-white rounded-[40px]">
            <img src={user.img.url} alt="imgcard" className='block rounded-[40px] border shadow-md hover:bg-white dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-700 sm:mx-auto ' />
            <figcaption>
            <div className="grid grid-cols-5 ">
            <h5 className="mb-2 text-sm tracking-tight text-black dark:text-white col-span-1">
            <img src={Stretching} alt=""  />
            </h5>
            <h5 className="col-span-4 mb-2 text-sm tracking-tight text-black dark:text-white">{user.title}</h5>
          </div>
          <div className="grid grid-cols-2">
            <h5 className="mb-2 text-sm tracking-tight text-black dark:text-white">Date: {date}</h5>
            <h5 className="mb-2 text-sm tracking-tight text-black dark:text-white">
              Duration: {duration} Minutes
            </h5>
          </div>
          <div className="grid">
            <h5 className="mb-2 text-sm tracking-tight text-black dark:text-white">
             Type: {user.activity_type}
            </h5>
          </div>
          <div className="grid">
            <h5 className="mb-2 text-sm tracking-tight text-black dark:text-white">
              Description: {user.description}
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
              <button href="/form/" className="bg-[#F08080] hover:bg-[#ff5757] text-white font-bold px-10 py-2 shadow-md hover:shadow-lg rounded flex justify-center">
                Edit
              </button>
              <button className="bg-[#F08080] hover:bg-[#ff5757] text-white font-bold px-10 py-2 shadow-md hover:shadow-lg rounded flex justify-center">
                Delete
              </button>
            </div>
          </div>
            </figcaption>
          </figure>

      </div>
    </div>
  )
}

export default Card


// <a href="#" className="block p-6 max-w-sm bg-white bg-opacity-50 rounded-[40px] border shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-700 sm:mx-auto my-2">

          


{/* <div className="grid grid-cols-2">
  <h5 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">
  </h5>
  <h5 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">Title: {user.title}</h5>
</div>
<div className="grid grid-cols-2">
  <h5 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">Date time: {user.date}</h5>
  <h5 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">
    Duration:
  </h5>
</div>
<div className="grid">
  <h5 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">
    Activity type: {user.activity_type}
  </h5>
</div>
<div className="grid">
  <h5 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">
    Description: {user.description}
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
    <button href="/form/" className="bg-[#F08080] hover:bg-[#ff5757] text-white font-bold px-10 py-2 shadow-md hover:shadow-lg rounded flex justify-center">
      Edit
    </button>
    <button className="bg-[#F08080] hover:bg-[#ff5757] text-white font-bold px-10 py-2 shadow-md hover:shadow-lg rounded flex justify-center">
      Delete
    </button>
  </div>
</div>
</a> */}