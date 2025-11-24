import React from 'react'
import { useState } from 'react';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

function ForgotPassword() {
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()
  return (
    <div className='bg-gradient-to-br from-yellow-100/20 to-yellow-100/30 flex justify-center items-center min-h-screen'>
        <div className='max-w-[300px] md:max-w-5xl bg-yellow-50 sm:rounded-xl shadow-2xl overflow-hidden p-5 md:p-10 rounded-2xl'>
            <div className='flex items-center gap-3 mb-2 md:mb-5'>
            <button className='cursor-pointer text-xl md:text-2xl text-orange-600 animate-pulse' onClick={()=>navigate("/signIn")}><FaArrowAltCircleLeft /></button>
                <h1 className='text-orange-600 text-xl md:text-2xl font-bold'>Forgot Password</h1>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4 md:mb-6">
            <img src={logo} alt="Logo" className="w-10 md:w-16 h-16 object-contain" />
            <h1 className="text-xl md:text-4xl font-extrabold">Khabar<span className="bg-gradient-to-b from-neutral-300 to-cyan-500 text-transparent bg-clip-text">Ghor</span></h1>
          </div>

            {step == 1 && 
            <div>
            <div>
          <input
          onChange={(e)=>setEmail(e.target.value)} value={email}
            type="email"
            placeholder="Enter your Email"
            className="w-full p-3 md:p-4 rounded-2xl bg-white text-gray-800 outline-none shadow-md placeholder-gray-400 focus:ring-2 focus:ring-orange-300 mt-1"
          />
          </div>
          <button className='w-full p-3 md:p-4 bg-gradient-to-r from-red-400 to-orange-500 text-white rounded-2xl font-semibold shadow-lg hover:scale-105 transition transform cursor-pointer mt-5'>
            Send OTP
          </button>
          </div>
            }
            {step == 2 && 
            <div>
            <div>
          <input
          onChange={(e)=>setOtp(e.target.value)} value={otp}
            type="text"
            placeholder="Enter OTP"
            className="w-full p-3 md:p-4 rounded-2xl bg-white text-gray-800 outline-none shadow-md placeholder-gray-400 focus:ring-2 focus:ring-orange-300 mt-1"
          />
          </div>
          <button className='w-full p-3 md:p-4 bg-gradient-to-r from-red-400 to-orange-500 text-white rounded-2xl font-semibold shadow-lg hover:scale-105 transition transform cursor-pointer mt-5'>
            Verify
          </button>
          </div>
            }
            {step == 3 && 
            <div>
            <div className='mb-3'>
              <label className='text-orange-600 font-bold' htmlFor="">New Password</label>
          <input
          onChange={(e)=>setNewPassword(e.target.value)} value={newPassword}
            type="text"
            placeholder="Enter New Password"
            className="w-full p-3 md:p-4 rounded-xl md:rounded-2xl bg-white text-gray-800 outline-none shadow-md placeholder-gray-400 focus:ring-2 focus:ring-orange-300 mt-1"
          />
          </div>
            <div>
              <label className='text-orange-600 font-bold' htmlFor="">Confirm Password</label>
          <input
          onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}
            type="text"
            placeholder="Enter Confirm Password"
            className="w-full p-3 md:p-4 rounded-xl md:rounded-2xl bg-white text-gray-800 outline-none shadow-md placeholder-gray-400 focus:ring-2 focus:ring-orange-300 mt-1"
          />
          </div>
          <button className='w-full p-3 md:p-4 bg-gradient-to-r from-red-400 to-orange-500 text-white rounded-2xl font-semibold shadow-lg hover:scale-105 transition transform cursor-pointer mt-5'>
            Reset Password
          </button>
          </div>
            }
          
        </div>
    </div>
  )
}

export default ForgotPassword