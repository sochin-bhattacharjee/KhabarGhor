import React, { useState } from "react";
import logo from "../assets/logo.png";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { TbReceiptDollar } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import { setUserData } from "../redux/slice/userSlice/userSlice";

function Nav() {
  const { userData, city } = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.owner);
  const [showSearch, setShowSearch] = useState(false);
  const [showCityPopup, setShowCityPopup] = useState(false);
  const dispatch = useDispatch();

  // logout
  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      toast.success("Log out Successfully");
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[65px] md:h-[80px] flex items-center justify-between md:justify-center gap-[20px] fixed top-0 z-[100] bg-[#fff9f6] overflow-visible ">
      {/* Small device search */}
      {showSearch && userData?.role === "user" && (
        <div className="w-[95%] h-[40px] bg-white shadow-xl rounded-lg flex gap-5 fixed top-[65px] left-[2%] lg:hidden">
          {/* city */}
          <div
            onClick={() => setShowCityPopup((prev) => !prev)}
            className="flex gap-3 w-[30%] overflow-hidden justify-center items-center px-3 border-r-2 border-gray-600 cursor-pointer"
          >
            <FaLocationDot size={20} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{city}</div>
          </div>

          {/* search */}
          <div className="w-[70%] flex items-center gap-3">
            <IoSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              className="px-[10px] text-gray-700 outline-0 w-full"
              placeholder="search delicious food..."
            />
          </div>

          {showCityPopup && (
            <div className="absolute bottom-8 left-5 bg-white p-2 shadow-2xl rounded-md">
              {city}
            </div>
          )}
        </div>
      )}

      {/* Logo and name */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-9 h-9 object-contain" />
        <h1 className="text-lg md:text-2xl font-extrabold">
          Khabar
          <span className="bg-gradient-to-b from-neutral-100 to-cyan-500 text-transparent bg-clip-text">
            Ghor
          </span>
        </h1>
      </div>

      {/* Desktop search */}
      {userData.role == "user" && (
        <div className="w-[60%] lg:w-[40%] h-[40px] bg-white shadow-xl rounded-lg items-center hidden lg:flex gap-5 relative">
          <div
            onClick={() => setShowCityPopup((prev) => !prev)}
            className="flex gap-3 w-[30%] overflow-hidden justify-center items-center px-3 border-r-2 border-gray-600 cursor-pointer"
          >
            <FaLocationDot size={20} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{city}</div>
          </div>

          <div className="w-[70%] flex items-center gap-3">
            <IoSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              className="px-[10px] text-gray-700 outline-0 w-full"
              placeholder="search delicious food..."
            />
          </div>

          {showCityPopup && (
            <div className="absolute top-12 left-3 bg-white p-3 shadow-2xl rounded-md">
              {city}
            </div>
          )}
        </div>
      )}

      {/* Right side */}
      <div className="flex items-center gap-4 pr-1">
        {/* mobile search toggle */}
        {userData?.role === "user" &&
          (showSearch ? (
            <RxCrossCircled
              size={25}
              className="text-[#ff4d2d] lg:hidden cursor-pointer"
              onClick={() => setShowSearch(false)}
            />
          ) : (
            <IoSearch
              size={25}
              className="text-[#ff4d2d] lg:hidden cursor-pointer"
              onClick={() => setShowSearch(true)}
            />
          ))}

        {/* add food item */}
        {userData.role == "owner" ? (
          <>
            {myShopData && (
              <>
                <button className="px-2 md:px-3 py-2 rounded-4xl bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium md:border-2 border-white hover:border-[#ff4d2d] cursor-pointer hidden md:flex md:gap-1">
                  <FaPlus size={20} className="text-[#ff4d2d]" />
                  <span>Add Food Item</span>
                </button>
                <button className="px-2 py-2 rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] cursor-pointer md:hidden flex items-center justify-center">
                  <FaPlus size={18} className="text-[#ff4d2d]" />
                </button>
              </>
            )}

            {/* owner my order div */}
            <div className="relative md:px-3 py-2 rounded-4xl bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium md:border-2 border-white hover:border-[#ff4d2d] cursor-pointer hidden md:flex items-center md:gap-1">
              <TbReceiptDollar size={23} className="text-[#ff4d2d]" />
              <span className="text-[#ff4d2d]">My Orders</span>
              <span className="absolute -right-1 -top-1 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px]">
                0
              </span>
            </div>
            <div className="relative px-2 py-2 rounded-4xl bg-[#ff4d2d]/10 text-[#ff4d2d] cursor-pointer flex md:hidden">
              <TbReceiptDollar size={23} className="text-[#ff4d2d]" />
              <span className="absolute -right-1 -top-1 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[5px] py-[1px]">
                0
              </span>
            </div>
          </>
        ) : (
          <>
            {/* cart div*/}
            <div className="relative cursor-pointer">
              <IoCartOutline size={22} className="text-[#ff4d2d]" />
              <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d]">
                0
              </span>
            </div>
            {/* user My order div*/}
            <button className="px-2 md:px-3 py-2 rounded-4xl bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium md:border-2 border-white hover:border-[#ff4d2d] cursor-pointer flex items-center justify-center md:gap-1 hidden md:block">
              My Order
            </button>
          </>
        )}

        {/* Profile Dropdown*/}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn border-none w-[30px] md:w-[35px] h-[30px] md:h-[35px] rounded-full flex justify-center items-center bg-[#ee2c0a] text-white text-lg shadow-xl font-semibold"
          >
            {userData?.fullName?.toUpperCase().slice(0, 1)}
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box z-[999] w-40 shadow bg-white mt-2"
          >
            <li className="font-semibold pointer-events-none px-3">
              {userData?.fullName}
            </li>

            <li className="md:hidden text-[#ff4d2d] font-semibold">
              <a>My Order</a>
            </li>

            <li onClick={handleLogOut} className="text-[#ff4d2d] font-semibold">
              <a>Log Out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;
