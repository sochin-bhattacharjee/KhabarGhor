import React from "react";
import Nav from "./Nav";
import { categories } from "../category";
import CategoryCard from "./CategoryCard";
import { useSelector } from "react-redux";
import ShopMyCityCard from "./ShopMyCityCard";

function UserDashboard() {
  const {currentCity,shopInMyCity} = useSelector(state=>state.user)
  return (
    <div className="bg-gradient-to-br to-orange-50 from-white min-h-screen">
      <Nav />

      {/* Carousel div */}
      <div className="w-full max-w-6xl mx-auto mt-16 sm:mt-20 md:mt-24 lg:mt-28 px-3">
        <h1 className="text-xl text-center md:text-3xl font-bold text-gray-800 mb-3 md:mb-4 md:mb-6">
          Inspiration for your first order
        </h1>

        {/* Carousel */}
        <div className="overflow-hidden">
  <div className="flex gap-4 w-max animate-seamless-left hover:[animation-play-state:paused]">
    {[...categories, ...categories].map((cate, index) => (
      <CategoryCard
        key={index}
        name={cate.category}
        image={cate.image}
      />
    ))}
  </div>
</div>

      </div>

      {/* Best Shop city div */}
      <div className="w-full max-w-4xl mx-auto mt-5 sm:mt-20 md:mt-11 lg:mt-16 px-3">
        <h1 className="text-xl text-center md:text-3xl font-bold text-gray-800 mb-3 md:mb-4 md:mb-6">
          Best Shop in <span className="text-[#18be36]">{currentCity}</span>
        </h1>

        {/* Carousel */}
        <div className="overflow-hidden">
  <div className="flex gap-4 w-max animate-seamless-right hover:[animation-play-state:paused]">
    {shopInMyCity.map((shop, index) => (
      <ShopMyCityCard
        key={index}
        name={shop.name}
        image={shop.image}
      />
    ))}
  </div>
</div>

      </div>
    </div>
  );
}

export default UserDashboard;
