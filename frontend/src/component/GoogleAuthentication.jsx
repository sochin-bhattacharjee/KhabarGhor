import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { auth } from '../../firebase';
import axios from 'axios';
import { serverUrl } from '../App';
function GoogleAuthentication({mobile,mobileRef,role}) {
    
    const handleGoogleAuth= async () =>{
        if (!mobile || mobile.length !== 11) {
            alert(`mobile no not found`)
            mobileRef.current.focus();
            return;
        }
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        try {
            const data = await axios.post(`${serverUrl}/api/auth/google-auth`,{
                fullName:result.user.displayName,
                email:result.user.email,
                role,
                mobile
            },{withCredentials:true})
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <button onClick={handleGoogleAuth} className="flex justify-center gap-2 border border-orange-500 text-orange-500 rounded-2xl py-2  font-semibold shadow-lg hover:bg-gray-100 hover:scale-105 transition transform cursor-pointer"><FcGoogle className="text-3xl" />SignUp with Google</button>
  )
}

export default GoogleAuthentication;