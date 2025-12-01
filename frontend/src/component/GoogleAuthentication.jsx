import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { auth } from '../../firebase';
function GoogleAuthentication() {
    const handleGoogleAuth= async () =>{
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        console.log(result)
    }
  return (
    <button onClick={handleGoogleAuth} className="flex justify-center gap-2 border border-orange-500 text-orange-500 rounded-2xl py-2  font-semibold shadow-lg hover:bg-gray-100 hover:scale-105 transition transform cursor-pointer"><FcGoogle className="text-3xl" />SignUp with Google</button>
  )
}

export default GoogleAuthentication