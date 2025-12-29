import React, { useEffect } from 'react'
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData, setShopInMyCity, setUserData } from '../redux/slice/userSlice/userSlice';

function useGetShopByCity() {
    // Redux dispatch function
    const dispatch=useDispatch()
    const {currentCity} = useSelector(state=>state.user)

    // Fetch current authenticated user data on component mount
    useEffect(()=>{
        const fetchShops = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/shop/get-by-city/${currentCity}`,
                    {withCredentials:true}
                )
                dispatch(setShopInMyCity(result.data))
                console.log(result.data)
            }
            catch (error) {
                dispatch(clearUserData())
                console.log(error)
            }
        }
        fetchShops()
    },[currentCity])
}

export default useGetShopByCity