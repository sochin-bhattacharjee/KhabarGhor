import axios from "axios";
import React, { useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { setMyShopData } from "../redux/slice/ownerSlice/ownerSlice";
import { toast } from "react-toastify";
import { ThreeCircles } from "react-loader-spinner";

function CreateEditShop() {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);
  const { currentCity, currentState, currentAddress } = useSelector(
    (state) => state.user
  );
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(myShopData?.name || "");
  const [address, setAddress] = useState(myShopData?.address || currentAddress);
  const [city, setCity] = useState(myShopData?.city || currentCity);
  const [state, setState] = useState(myShopData?.state || currentState);
  const [frontendImage, setFrontendImage] = useState(myShopData?.image || null);
  const [backendImage, setBackendImage] = useState(null);
  const dispatch = useDispatch();

  //   handle image function
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  //   submit/save functionality
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("address", address);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      const result = await axios.post(
        `${serverUrl}/api/shop/create-edit`,
        formData,
        { withCredentials: true }
      );
      dispatch(setMyShopData(result.data));
      setLoading(false);
      navigate("/")
      toast.success("Shop Added Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 to-white relative min-h-screen">
      {/* back button div */}
      <div
        onClick={() => navigate("/")}
        className="absolute top-[20px] left-[20px] z-[10] mb-[10px] cursor-pointer"
      >
        <IoMdArrowRoundBack size={25} className="text-[#ff4d2d]" />
      </div>

      {/* my shop main div */}
      <div className="max-w-lg w-full text-white shadow-xl rounded-2xl p-8 border-2 border-orange-100">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full mb-4">
            <FaUtensils className="text-[#ff4d2d] w-16 h-16" />
          </div>
          <div className="text-gray-900 font-extrabold text-3xl">
            {myShopData ? "Edit Shop" : "Add Shop"}
          </div>
        </div>
        {/* form div */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* name div */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg outline outline-black focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              placeholder="Enter Shop name..."
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          {/* image file div */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shop Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 rounded-lg outline outline-black focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              onChange={handleImage}
            />
            {frontendImage && (
              <div className="mt-4">
                <img
                  src={frontendImage}
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>
          {/* city and state div */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg outline outline-black focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="City..."
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg outline outline-black focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
                placeholder="State"
                onChange={(e) => setState(e.target.value)}
                value={state}
              />
            </div>
          </div>
          {/* address div */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg outline outline-black focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              placeholder="Enter Shop Address..."
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </div>
          <button
            disabled={loading}
            className={`w-full p-3 md:p-4 bg-gradient-to-r from-red-400 to-orange-500 text-white rounded-2xl font-semibold shadow-lg ${
              loading
                ? "cursor-no-drop"
                : "hover:scale-105 transition transform cursor-pointer"
            }`}
          >
            {!loading ? (
              "Save"
            ) : (
              <div className="flex justify-center">
                <ThreeCircles
                  visible={loading}
                  height="24"
                  width="24"
                  color="white"
                  ariaLabel="three-circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEditShop;
