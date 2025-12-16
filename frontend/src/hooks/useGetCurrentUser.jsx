import React, { useEffect } from 'react'
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/slice/userSlice/userSlice';

function useGetCurrentUser() {
    // Redux dispatch function
    const dispatch=useDispatch()

    // Fetch current authenticated user data on component mount
    useEffect(()=>{
        const fetchUser = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/user/current`,
                    {withCredentials:true}
                )
                dispatch(setUserData(result.data))
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    },[])
}

export default useGetCurrentUser