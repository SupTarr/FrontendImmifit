import React from 'react'
import './logindetail.css'
const Logindetail = () => {
  return (
    <div className='login h-screen relative'>
      <div className='flex justify-center pt-16'>
        <div className="max-w-5xl flex justify-center">
          <img className="shadow-md rounded-l-xl object-cover max-w-xl" src="../../public/imagecard2.jpg" alt="imagecard"></img>
          <form className="bg-white shadow-md rounded-r-xl px-6 w-[350px] pt-16">
            <div className="flex text-gray-700 text-2xl font-bold mb-10">
              Log in
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                Username
              </label>
              <input className="shadow appearance-none border-b border-[#32312d] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
              </label>
              <input className="appearance-non rounded border-b border-[#32312d] w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
              <p className="text-red-500 text-xs italic">Please choose a password.</p>
            </div>
            <div className="flex items-center justify-between align-middle">
              <button className="bg-[#6971f2] hover:bg-[#5960cc] text-white font-bold w-full py-2 rounded focus:outline-none focus:shadow-outline" type="button">
                Log in
              </button>
              {/* <a className="inline-block align-baseline font-bold text-sm text-[#6971f2] hover:text-[#5960cc]" href="#">
              Forgot Password?
            </a> */}
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            {/* &copy;2020 Acme Corp. All rights reserved. */}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Logindetail