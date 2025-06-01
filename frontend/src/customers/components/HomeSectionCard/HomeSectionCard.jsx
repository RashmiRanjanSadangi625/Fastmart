import React from "react";
import { useNavigate } from "react-router-dom";

const HomeSectionCard = ({ product }) => {

  const navigate = useNavigate(); 

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  // console.log(product)

  return (
    <div  onClick={handleProductClick}
    className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 
  transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/50">
      <div className="h-[13rem] w-[12rem] overflow-hidden">
        <img
          className="object-cover object-top w-full h-full rounded-t-2xl transition-transform duration-300 hover:scale-110"
          src={product.imageUrl}
          alt={product.title}
        />
      </div>

      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-900">{product.brand}</h3>
        <p className="mt-1 text-sm text-gray-600">{product.title}</p>
      </div>
    </div>
  );
};

export default HomeSectionCard;
