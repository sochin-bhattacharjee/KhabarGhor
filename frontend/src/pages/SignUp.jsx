import React, { useRef, useState } from "react";
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.js";
import { ToastContainer, toast } from 'react-toastify';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState("user");
  const roleArray = ["user","owner","deliveryBoy"]
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mobile, setMobile] = useState("")
  const [error,setError] = useState("")
  const mobileRef = useRef(null)

  // signUp functionality
  const handleSignUp = async() =>{
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`,{
        fullName, email, password, mobile, role
      },{withCredentials:true})
      toast.success("SignUp Successfully")
      setError("")
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  // Google Authentication
  const handleGoogleAuth= async () =>{
        if (!mobile || mobile.length !== 11) {
            setError("Mobile number is required")
            mobileRef.current.focus();
            return;
        }
        setError("")
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        try {
            const data = await axios.post(`${serverUrl}/api/auth/google-auth`,{
                fullName:result.user.displayName,
                email:result.user.email,
                role,
                mobile
            },{withCredentials:true})
            toast.success("SignUp Successfully")
        } catch (error) {
            setError(error.response.data.message)
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
            Already have an account ?
          </p>
          <div>
            <Link to="/signin">
          <button className="px-6 py-3 mt-4 bg-white text-orange-500 font-semibold rounded-2xl shadow-lg hover:scale-105 transition transform w-fit cursor-pointer">
            Sign In
          </button>
          </Link>
          </div>
          
        </div>

        {/* right & bottom side div */}
        <div className="p-4 sm:p-12 flex flex-col justify-center space-y-3">
          <div>
            <label htmlFor="" className="font-medium">Full Name</label>
          <input
          onChange={(e)=>setFullName(e.target.value)} value={fullName}
            type="text"
            placeholder="Full Name"
            required
            className="w-full p-4 rounded-2xl bg-white text-gray-800 outline-none shadow-md placeholder-gray-400 focus:ring-2 focus:ring-orange-300 mt-1"
          />
          </div>
          <div>
            <label htmlFor="" className="font-medium">Email</label>
          <input
          onChange={(e)=>setEmail(e.target.value)} value={email}
            type="email"
            placeholder="Email"
            required
            className="w-full p-4 rounded-2xl bg-white text-gray-800 outline-none shadow-md placeholder-gray-400 focus:ring-2 focus:ring-orange-300 mt-1"
          />
          </div>
          <div>
            <label htmlFor="" className="font-medium">Number</label>
          <input
          onChange={(e)=>setMobile(e.target.value)} value={mobile}
          ref={mobileRef}
            type="number"
            required
            placeholder="Mobile Number"
            className="w-full p-4 rounded-2xl bg-white text-gray-800 outline-none shadow-md placeholder-gray-400 focus:ring-2 focus:ring-orange-300 mt-1"
          />
          </div>
          <div>
            <label htmlFor="" className="font-medium">Password</label>
          <div className="relative">
            <input
            onChange={(e)=>setPassword(e.target.value)} value={password}
            type={`${showPassword ? " text" : "password"}`}
            placeholder="Password"
            required
            className="w-full p-4 rounded-2xl bg-white text-gray-800 outline-none shadow-md placeholder-gray-400 focus:ring-2 focus:ring-orange-300 mt-1"
          />
          <button onClick={()=>setShowPassword(!showPassword)} className="absolute top-6.5 right-2.5 cursor-pointer">
          {!showPassword?<FaEye />:<FaEyeSlash />}
          </button>
          </div>
          </div>

          <div>
            <label htmlFor="" className="font-medium">Role : (<span className="text-orange-500">{role}</span>)</label>
          <div className="flex items-center justify-around mt-1">
            {roleArray.map((r)=>(
            <button onClick={()=> setRole(r)} className={`px-3 lg:px-8 py-2 lg:py-3 rounded-xl cursor-pointer font-medium hover:scale-105 transition transform ${role == r ? "bg-orange-500 text-white ":"border-2 border-orange-500"}`}>{r}</button>
          ))}
          </div>
          </div>
          <button onClick={handleSignUp} className="w-full p-4 bg-gradient-to-r from-red-400 to-orange-500 text-white rounded-2xl font-semibold shadow-lg hover:scale-105 transition transform cursor-pointer">
            Sign Up
          </button>
          <p className="text-red-600">{error}</p>
          <button onClick={handleGoogleAuth} className="flex justify-center gap-2 border border-orange-500 text-orange-500 rounded-2xl py-2  font-semibold shadow-lg hover:bg-gray-100 hover:scale-105 transition transform cursor-pointer"><FcGoogle className="text-3xl" />SignUp with Google</button>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default SignUp;