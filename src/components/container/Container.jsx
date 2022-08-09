import React from "react";
import "./container.css";

const Container = () => {
  return (

    <div className="mb-4">
      <div className="flex justify-around flex-wrap" >
        <a href="#" className="block p-6 max-w-sm bg-white bg-opacity-50 rounded-[40px] border shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-700 sm:mx-auto my-2">
          <div className="grid grid-cols-2">
            <h5 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">image</h5>
            <h5 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">Topic</h5>
          </div>
          <div className="grid grid-cols-2">
            <h5 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">Datetime</h5>
            <h5 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">Duration</h5>
          </div>
          <div className="grid">
            <h5 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">Type</h5>
          </div>
          <div className="grid">
            <h5 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">Description</h5>
          </div>

          <div className="grid grid-cols-3 gap-36">
            <h5 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">Status</h5>
            <div className="grid grid-cols-2 gap-24">
              <button className="bg-[#F08080] hover:bg-[#ff5757] text-white px-10 py-2 rounded-full flex justify-center">
                Edit
              </button>
              <button className="bg-[#F08080] hover:bg-[#ff5757] text-white px-10 py-2 rounded-full flex justify-center">
                Delete
              </button>
            </div>

          </div>
        </a>
      </div>


    </div>

  )

}

export default Container;
