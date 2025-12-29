import React, { useEffect } from 'react'
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import {setMyShopData } from '../redux/slice/ownerSlice/ownerSlice';

function useGetMyShop() {
    // Redux dispatch function
    const dispatch=useDispatch()

    // Fetch current authenticated user data on component mount
    useEffect(() => {
  const fetchShop = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/shop/get-my`,
        { withCredentials: true }
      );
      dispatch(setMyShopData(result.data));
    } catch (error) {
      if (error.response?.status === 404) {
        dispatch(setMyShopData(null));
      } else {
        console.log(error);
      }
    }
  };

  fetchShop();
}, []);

}

export default useGetMyShop;