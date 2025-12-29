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
import { AiFillCaretDown } from "react-icons/ai";

function AddItem() {
  const navigate = useNavigate();
  const { myShopData } = useSelector((state) => state.owner);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("veg");
  const categories = [
    "Snacks",
    "Starters",
    "Main Course",
    "Rice & Biryani",
    "Pizza",
    "Burger",
    "Sandwiches",
    "Rolls & Wraps",
    "Fried Chicken",
    "Noodles & Pasta",
    "Chinese",
    "South Indian",
    "Desserts",
    "Beverages",
    "Ice Cream",
    "Bakery",
    "Street Food",
    "Others",
  ];
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
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
      formData.append("category", category);
      formData.append("foodType", foodType);
      formData.append("price", price);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      const result = await axios.post(
        `${serverUrl}/api/item/add-item`,
        formData,
        { withCredentials: true }
      );
      dispatch(setMyShopData(result.data));
      setLoading(false);
      navigate("/");
      toast.success("Food Item Added Successfully");
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
            Add Food Item
          </div>
        </div>
        {/* form div */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* name div */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg outline outline-black focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              placeholder="Enter Food name..."
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          {/* image file div */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Image
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

          {/* category div start */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Category
            </label>

            {/* Selected value */}
            <div
              onClick={() => setOpen(!open)}
              className="w-full px-4 py-2 border rounded-lg cursor-pointer bg-white text-black"
            >
              {category || "Select Category"}
              {!open ? (
                <AiFillCaretDown className="absolute right-2 bottom-3 rotate-90" />
              ) : (
                <AiFillCaretDown className="absolute right-2 bottom-3" />
              )}
            </div>

            {/* Dropdown */}
            {open && (
              <div className="absolute z-10 w-full bg-white border rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
                {categories.map((cate) => (
                  <div
                    key={cate}
                    onClick={() => {
                      setCategory(cate);
                      setOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-orange-100 cursor-pointer text-black"
                  >
                    {cate}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* category div end */}

          {/* food type div */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Food Type
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg outline outline-black focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              onChange={(e) => setFoodType(e.target.value)}
              value={foodType}
            >
              <option value="veg">veg</option>
              <option value="non veg">non veg</option>
            </select>
          </div>

          {/* Price div */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded-lg outline outline-black focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
              placeholder="0"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
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

export default AddItem;
