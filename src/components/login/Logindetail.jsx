import React from 'react'
import './logindetail.css'
import Facebook from './facebook.png'
import Line from './line.png'
import Tel from './telephone.png'
// import Back from './previous.png'

const Logindetail = () => {
  return (
    <div className='login relative sm:h-screen'>
      {/* <button className='w-[50px]'>
          <img src={Back} alt="" />
        </button> */}
      <div className='flex flex-col justify-center items-center sm:pt-16 h-[100%]'>
        <div className="max-w-5xl flex flex-col justify-center sm:flex-row mobile:m-10">
            <img className="shadow-md sm:rounded-l-xl object-cover  sm:max-w-[200px] md:max-w-sm lg:max-w-lg xl:max-w-xl" src="../../public/imagecard2.jpg" alt="imagecard"></img>
          <form className="flex flex-col justify-center bg-white shadow-md sm:rounded-r-xl px-5 md:max-w-[250px] xl:max-w-[350px] py-5">
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
            </div>
            <div className="flex flex-col-3 mt-6 justify-around">
              <a href="#"><img src={Facebook} alt="facebook" className='w-[50px]' /></a>
              <a href="#"><img src={Line} alt="Line" className='w-[50px]' /></a>
              <a href="#"><img src={Tel} alt="Tel" className='w-[50px]' /></a>
            </div>
            <div className="mt-8 flex flex-1 justify-center">
              <a className="text-sm" href="#">Don't have an account? <sapn className="font-[600]">Sign up</sapn></a>
            </div>
          </form>

        </div>
      </div>
    </div>

  )
}

export default Logindetail