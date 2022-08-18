import React from 'react'



const Card = ({user}) => {
  
  return (
    <div>
       <div className="flex justify-around flex-wrap" >
              <a href="#" className="block p-6 max-w-sm bg-white bg-opacity-50 rounded-[40px] border shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-700 sm:mx-auto my-2">
                <div className="grid grid-cols-2">
                  <h5 className="mb-2 text-lg tracking-tight text-gray-900 dark:text-white">
                    <img src={user.img.url} alt="" />
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
              </a>
            </div>
    </div>
  )
}

export default Card