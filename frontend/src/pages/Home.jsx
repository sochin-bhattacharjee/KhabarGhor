import React from "react";
import { useSelector } from 'react-redux';
import UserDashboard from "../component/UserDashboard";
import OwnerDashboard from "../component/OwnerDashboard";
import DeliveryBoyDashboard from "../component/DeliveryBoyDashboard";

function Home() {
    const {userData}=useSelector(state=>state.user)
    return(
        <div>
            {userData.role=="user"&&<UserDashboard/>}
            {userData.role=="owner"&&<OwnerDashboard/>}
            {userData.role=="deliveryBoy"&&<DeliveryBoyDashboard/>}
        </div>
    );
}

export default Home;
