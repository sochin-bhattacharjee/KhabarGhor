import React from "react";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import { FaUtensils } from "react-icons/fa";

function OwnerDashboard() {
  const { myShopData } = useSelector((state) => state.owner);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* Navbar */}
      <Nav></Nav>

      {/* my shop div */}
      {!myShopData && (
        <div className="flex justify-center items-center p-4 sm:p-6">
          <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
              <FaUtensils className="text-[#ff4d2d] w-16 h-16 sm:w-20 mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Add Your Restaurant</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-2">Join our food delivery platform and reach thousands of hungry customers every day.</p>
              <button className="bg-[#ff4d2d] text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors duration-200 cursor-pointer">Get Started</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OwnerDashboard;
