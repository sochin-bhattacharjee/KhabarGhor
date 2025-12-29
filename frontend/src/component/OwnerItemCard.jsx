import React from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function OwnerItemCard({ data }) {
     const navigate = useNavigate();
  return (
    <div className="group flex w-full max-w-2xl bg-white border border-orange-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden my-2">
      
      {/* Image */}
      <div className="w-28 md:w-40 shrink-0 bg-gray-100 overflow-hidden">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-4">
        
        {/* name */}
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-800">
            {data.name}
          </h2>

          {/* category */}
          <p className="text-sm text-gray-600">
            <span className="font-medium">Category:</span> {data.category}
          </p>

          {/* food type */}
          <p className="text-sm text-gray-600">
            <span className="font-medium">Food Type:</span> {data.foodType}
          </p>
        </div>

        {/* Price & Actions div */}
        <div className="flex items-center justify-between mt-3">
          <p className="text-lg font-semibold text-orange-500">
            ₹ {data.price}
          </p>

          <div className="flex gap-3">
            {/* Edit */}
            <button
              onClick={() => navigate(`/edit-item/${data._id}`)}
              className="cursor-pointer p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-500 hover:text-white transition-all duration-200 hover:scale-110"
            >
              <FaPen />
            </button>

            {/* Delete */}
            <button
              onClick={() => (del)}
              className="cursor-pointer p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-200 hover:scale-110"
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerItemCard;
