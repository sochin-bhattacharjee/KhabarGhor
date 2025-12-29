import React from "react";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import { FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import { FaPen } from "react-icons/fa";

function OwnerDashboard() {
  const { myShopData, loading } = useSelector((state) => state.owner);
  const navigate = useNavigate();

  // loader
  if (loading) {
    <div className="min-h-screen">
      <ThreeCircles
        visible={loading}
        height="24"
        width="24"
        color="white"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br to-orange-50 from-white">
      {/* Navbar */}
      <Nav></Nav>

      {/* not added my shop so see this div */}
      {!myShopData && (
        <div className="flex justify-center items-center p-4 sm:p-6">
          <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
              <FaUtensils className="text-[#ff4d2d] w-16 h-16 sm:w-20 mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Add Your Restaurant
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-2">
                Join our food delivery platform and reach thousands of hungry
                customers every day.
              </p>
              <button
                onClick={() => navigate("/create-edit-shop")}
                className="bg-[#ff4d2d] text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors duration-200 cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {/* added my shop so see this div */}
      {myShopData && (
        <div className="w-full flex flex-col items-center gap-6 px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl text-gray-900 flex items-center mt-8 text-center gap-2 font-bold">
            Welcome to{" "}
            <FaUtensils className="text-[#ff4d2d] w-5 h-5 sm:w-5 mt-2 " />
            <span className="text-rotate">
              <span>
                <span className="text-blue-600">{myShopData.name}</span>
                <span className="text-green-600">{myShopData.name}</span>
                <span className="text-red-600">{myShopData.name}</span>
                <span className="text-yellow-600">{myShopData.name}</span>
                <span className="text-pink-600">{myShopData.name}</span>
                <span className="text-amber-500">{myShopData.name}</span>
              </span>
            </span>
          </h1>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-orange-100 hover:shadow-2xl transition-all duration-300 w-full max-w-3xl relative">
            <div onClick={()=>navigate("/create-edit-shop")} className="absolute top-4 right-4 bg-[#ff4d2d] text-white p-2 rounded-full shadow-md hover:bg-orange-600 transition-colors cursor-pointer">
              <FaPen size={25}/>
            </div>
            <img src={myShopData.image} alt={myShopData.name} className="w-full h-48 sm:h-64 object-cover" />
            <div className="p-4 sm:p-6">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{myShopData.name}</h1>
              <p className="text-gray-500"> {myShopData.city}, {myShopData.state}</p>
              <p className="text-gray-500 mb-4"> {myShopData.address}</p>
            </div>
          </div>

          {/* not added food so see this div */}
          {myShopData.items.length==0 &&(
            <div className="flex justify-center items-center p-4 sm:p-6">
          <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
              <FaUtensils className="text-[#ff4d2d] w-16 h-16 sm:w-20 mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Add Your Food Item
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-2">
                Share your delicious creations with our customers by adding them to the menu
              </p>
              <button
                onClick={() => navigate("/add-food")}
                className="bg-[#ff4d2d] text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors duration-200 cursor-pointer"
              >
                Add Food
              </button>
            </div>
          </div>
        </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OwnerDashboard;
