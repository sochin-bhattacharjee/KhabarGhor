import React from 'react'
import logo from "../assets/logo.png";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';

function Nav() {

    // login user
    const {userData}=useSelector(state=>state.user)
  return (
    // Navbar main div
    <div className='w-full h-[65px] md:h-[80px] flex items-center justify-between md:justify-center gap-[20px] fixed top-0 z-[100] bg-[#fff9f6] overflow-visible'>

        {/* Site name and logo div*/}
        <div className="flex items-center">
                <img src={logo} alt="Logo" className="w-9 h-9 object-contain" />
                <h1 className="text-lg md:text-2xl font-extrabold">Khabar<span className="bg-gradient-to-b from-neutral-100 to-cyan-500 text-transparent bg-clip-text">Ghor</span></h1>
        </div>

        {/* Search city and food div */}
        <div className='md:w-[60%] lg:w-[40%] h-[40px] bg-white shadow-xl rounded-lg items-center hidden md:flex gap-5'>

            {/* city name div */}
            <div className='flex gap-3 w-[30%] overflow-hidden justify-center items-center px-3 border-r-2 border-gray-600'>
                <FaLocationDot size={20} className='text-[#ff4d2d]'/>
                <div className='w-[80%] truncate text-gray-600'>Rangamati</div>
            </div>
            {/* search div */}
            <div className='w-[70%] flex items-center gap-3'>
                <IoSearch size={25} className='text-[#ff4d2d]'/>
                <input type="text" className='px-[10px] text-gray-700 outline-0 w-full' placeholder='search delicious food...' />
            </div>
        </div>

        <div className='flex items-center justify-center gap-4 pr-1'>
            <IoSearch size={25} className='text-[#ff4d2d] md:hidden'/>
        {/* cart div */}
        <div className='relative cursor-pointer'>
            <IoCartOutline size={22} className='text-[#ff4d2d]'/>
            <span className='absolute right-[-9px] top-[-12px] text-[#ff4d2d]'>0</span>
        </div>

        {/* My order button */}
        <button className="btn hidden md:block px-3 py-1 rounded-4xl bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium border-2 border-white hover:border-2 hover:border-[#ff4d2d] cursor-pointer hover:text-[#ee2c0a]">
        My Order
        </button>

        <div className='w-[30px] md:w-[35px] h-[30px] md:h-[35px] rounded-full flex justify-center items-center bg-[#ee2c0a] text-white text-lg shadow-xl font-semibold cursor-pointer'>
            {userData?.fullName.toUpperCase().slice(0,1)}
        </div>
        </div>
    </div>
  )
}

export default Nav