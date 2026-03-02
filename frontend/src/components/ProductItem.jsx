import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, availability }) => {
  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="w-full h-48 overflow-hidden flex items-center justify-center bg-gray-100">
        <img
          className="w-full h-full object-cover transition-transform duration-200 ease-in-out hover:scale-110"
          src={image[0]}
          alt={name}
        />
      </div>
      <p className="pt-3 pb-1 text-sm font-medium text-center">{name}</p>
      <p className="text-xs text-center">
        {availability ? "In Stock" : "Out of Stock"}
      </p>
    </Link>
  );
};

export default ProductItem;
