import React from 'react'
import { useState } from 'react';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { ThreeCircles } from 'react-loader-spinner';

function ForgotPassword() {
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // forgot password functionality
    // step 1 -- Send OTP
    const handleSendOtp= async () =>{
      setLoading(true)
      try {
        const result = await axios.post(`${serverUrl}/api/auth/send-otp`,{email},{withCredentials:true})
        setError("")
        toast.success(`${result.data.message}`)
        setLoading(false)
        setStep(2)
      } catch (error) {
        setLoading(false)
        setError(error.response.data.message)
      }
    }

    // step 2 -- Verify OTP
    const handleVerifyOtp= async () =>{
      setLoading(true)
      try {
        const result = await axios.post(`${serverUrl}/api/auth/verify-otp`,{email,otp},{withCredentials:true})
        setError("")
        toast.dismiss();
        toast.success(`${result.data.message}`)
        setLoading(false)
        setStep(3)
      } catch (error) {
        setLoading(false)
        setError(error.response.data.message)
      }
    }
    
    // step 3 -- Reset password
    const handleResetPassword= async () =>{
      if(newPassword!=confirmPassword){
        return null
      }
      setLoading(true)
      try {
        const result = await axios.post(`${serverUrl}/api/auth/reset-password`,{email,newPassword},{withCredentials:true})
        toast.dismiss();
        toast.success("Password reset successfully")
        setLoading(false)
        setTimeout(() => {
              navigate("/signIn");
        }, 1200);
      } catch (error) {
        setLoading(false)
        setError(error.response.data.message)
      }
    }

  return (
    <div className='bg-gradient-to-br from-yellow-100/20 to-yellow-100/30 flex justify-center items-center min-h-screen'>
        <div className='max-w-[300px] md:max-w-5xl bg-yellow-50 sm:rounded-xl shadow-2xl overflow-hidden p-5 md:p-10 rounded-2xl'>
            <div className='flex items-center gap-3 mb-2 md:mb-5'>
            <button className='cursor-pointer text-xl md:text-2xl text-orange-600 animate-pulse' onClick={()=>navigate("/signIn")}><FaArrowAltCircleLeft /></button>
                <h1 className='text-orange-600 text-xl md:text-2xl font-bold'>Forgot Password</h1>
            </div>
            {/* site name and site logo */}
            <div className="flex items-center space-x-2 md:space-x-4 md:mb-6">
            <img src={logo} alt="Logo" className="w-10 md:w-16 h-16 object-contain" />
            <h1 className="text-xl md:text-4xl font-extrabold">Khabar<span className="bg-gradient-to-b from-neutral-300 to-cyan-500 text-transparent bg-clip-text">Ghor</span></h1>
          </div>

          {/* forgot password step 1 */}
            {step == 1 && 
            <div className='space-y-3'>
            <div>
          <input
          onChange={(e)=>setEmail(e.target.value)} value={email}
            type="email"
            placeholder="Enter your Email"
            className="w-full p-3 md:p-4 rounded-2xl bg-white text-gray-800 outline-none shadow-md placeholder-gray-400 focus:ring-2 focus:ring-orange-300 mt-1"
          />
          </div>
          <p className="text-red-600">{error}</p>
          <button disabled={loading} onClick={handleSendOtp} className={`w-full p-3 md:p-4 bg-gradient-to-r from-red-400 to-orange-500 text-white rounded-2xl font-semibold shadow-lg ${loading ? "cursor-no-drop" :"hover:scale-105 transition transform cursor-pointer"}`}>
            {!loading ? "Send OTP" : 
            <div className='flex justify-center'>
              <ThreeCircles
                visible={loading}
                height="24"
                width="24"
                color="white"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
            </div>
            }
          </button>
          </div>
            }

            {/* forgot password step 2 */}
            {step == 2 && 
            <div className='space-y-3'>
            <div>
          <input
          onChange={(e)=>setOtp(e.target.value)} value={otp}
            type="text"
            placeholder="Enter OTP"
            className="w-full p-3 md:p-4 rounded-2xl bg-white text-gray-800 outline-none shadow-md placeholder-gray-400 focus:ring-2 focus:ring-orange-300 mt-1"
          />
          </div>
          <p className="text-red-600">{error}</p>
          <button disabled={loading} onClick={handleVerifyOtp} className={`w-full p-3 md:p-4 bg-gradient-to-r from-red-400 to-orange-500 text-white rounded-2xl font-semibold shadow-lg ${loading ? "cursor-no-drop" :"hover:scale-105 transition transform cursor-pointer"}`}>
            {!loading ? "Verify OTP" : 
            <div className='flex justify-center'>
              <ThreeCircles
                visible={loading}
                height="24"
                width="24"
                color="white"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
            </div>
            }
          </button>
          </div>
            }

            {/* forgot password step 3 */}
            {step == 3 && 
            <div className='space-y-3'>
            <div className='mb-3'>
              <label className='text-orange-600 font-bold' htmlFor="">New Password</label>
          <input
          required
          onChange={(e)=>setNewPassword(e.target.value)} value={newPassword}
            type="password"
            placeholder="Enter New Password"
            className="w-full p-3 md:p-4 rounded-xl md:rounded-2xl bg-white text-gray-800 outline-none shadow-md placeholder-gray-400 focus:ring-2 focus:ring-orange-300 mt-1"
          />
          </div>
            <div>
              <label className='text-orange-600 font-bold' htmlFor="">Confirm Password</label>
          <input
          required
          onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}
            type="password"
            placeholder="Enter Confirm Password"
            className="w-full p-3 md:p-4 rounded-xl md:rounded-2xl bg-white text-gray-800 outline-none shadow-md placeholder-gray-400 focus:ring-2 focus:ring-orange-300 mt-1"
          />
          </div>
          <p className="text-red-600">{error}</p>
          <button disabled={loading} onClick={handleResetPassword} className={`w-full p-3 md:p-4 bg-gradient-to-r from-red-400 to-orange-500 text-white rounded-2xl font-semibold shadow-lg ${loading ? "cursor-no-drop" :"hover:scale-105 transition transform cursor-pointer"}`}>
            {!loading ? "Reset Password" : 
            <div className='flex justify-center'>
              <ThreeCircles
                visible={loading}
                height="24"
                width="24"
                color="white"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
            </div>
            }
          </button>
          </div>
            }
          
        </div>
    </div>
  )
}

export default ForgotPassword