import React from "react";

function CategoryCard({ data }) {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer relative">
      {/* Image wrapper */}
      <div className="relative w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] lg:w-[160px] lg:h-[160px] rounded-2xl overflow-hidden group lg:hover:border lg:hover:border-orange-500">
        <img
          src={data.image}
          alt={data.category}
          className="w-full h-full object-cover lg:transition lg:duration-300 lg:group-hover:scale-110"
        />

        {/* Category name ONLY large device */}
        <div className="hidden lg:block absolute inset-0 bg-black/0 lg:group-hover:bg-black/40 transition duration-300"></div>

        {/* Center text on hover (ONLY large device) */}
        <div className="hidden lg:flex absolute inset-0 items-center justify-center opacity-0 lg:group-hover:opacity-100 transition duration-300">
          <h2 className="text-white text-lg font-bold">{data.category}</h2>
        </div>
      </div>

      {/* Category name for small & medium device */}
      <h2 className="lg:hidden text-sm sm:text-base font-semibold text-gray-800 absolute bottom-0 border-b border-orange-500 bg-white rounded-b-2xl w-full text-center">
        {data.category}
      </h2>
    </div>
  );
}

export default CategoryCard;
