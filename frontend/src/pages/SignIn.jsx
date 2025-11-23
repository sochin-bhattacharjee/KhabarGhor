import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { serverUrl } from "../App.jsx";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  // signIn functionality
  const handleSignIn = async() =>{
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signin`,{
        email, password
      },{withCredentials:true})
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100/20 to-yellow-100/30 md:p-4 sm:p-8">
      <div className="w-full max-w-5xl bg-yellow-50 sm:rounded-xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* left & top side div */}
        <div className="p-3 sm:p-12 flex flex-col justify-center bg-gradient-to-b from-orange-400 to-red-400 text-white 
                      lg:rounded-tr-full md:rounded-br-full md:rounded-tl-md md:rounded-bl-md">
          <div className="flex items-center space-x-4 mb-6">
            <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
            <h1 className="text-4xl font-extrabold">Khabar<span className="bg-gradient-to-b from-neutral-50 to-cyan-300 text-transparent bg-clip-text">Ghor</span></h1>
          </div>

          <h2 className="text-3xl font-bold mb-3">Create Account</h2>
          <p className="text-gray-100 mb-6">
            Join KhabarGhor and explore fresh, trending food deliveries every day.
          </p>
          <div>
            <Link to="/signup">
          <button className="px-6 py-3 mt-4 bg-white text-orange-500 font-semibold rounded-2xl shadow-lg hover:scale-105 transition transform w-fit cursor-pointer">
            Sign Up
          </button>
          </Link>
          </div>
          
        </div>

        {/* right & bottom side div */}
        <div className="p-4 sm:p-12 flex flex-col justify-center space-y-3">
          {/* email */}
          <div>
            <label htmlFor="" className="font-medium">Email</label>
          <input
          onChange={(e)=>setEmail(e.target.value)} value={email}
            type="email"
            placeholder="Email"
            className="w-full p-4 rounded-2xl bg-white text-gray-800 outline-none shadow-md placeholder-gray-400 focus:ring-2 focus:ring-orange-300 mt-1"
          />
          </div>
          {/* password */}
          <div>
            <label htmlFor="" className="font-medium">Password</label>
          <div className="relative">
            <input
            onChange={(e)=>setPassword(e.target.value)} value={password}
            type={`${showPassword ? " text" : "password"}`}
            placeholder="Password"
            className="w-full p-4 rounded-2xl bg-white text-gray-800 outline-none shadow-md placeholder-gray-400 focus:ring-2 focus:ring-orange-300 mt-1"
          />
          <button onClick={()=>setShowPassword(!showPassword)} className="absolute top-6.5 right-2.5 cursor-pointer">
          {!showPassword?<FaEye />:<FaEyeSlash />}
          </button>
          </div>
          </div>
          {/* forgot password */}
          <div className="flex justify-between">
            <div></div>
            <p className="text-orange-600 text-right font-medium hover:underline hover:text-blue-700 cursor-pointer" onClick={() => navigate("/forgot-password")}>forgot password</p>
          </div>
          <button onClick={handleSignIn} className="w-full p-4 bg-gradient-to-r from-red-400 to-orange-500 text-white rounded-2xl font-semibold shadow-lg hover:scale-105 transition transform cursor-pointer">
            Sign In
          </button>
          <button className="flex justify-center gap-2 border border-orange-500 text-orange-500 rounded-2xl py-2  font-semibold shadow-lg hover:bg-gray-100 hover:scale-105 transition transform cursor-pointer"><FcGoogle className="text-3xl" />SignIn with Google</button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;