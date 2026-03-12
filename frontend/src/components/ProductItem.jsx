import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, availability }) => {
  return (
    <Link className="text-slate-800 cursor-pointer group" to={`/product/${id}`}>
      <div className="w-full h-48 overflow-hidden flex items-center justify-center bg-white border border-slate-200 rounded-lg group-hover:border-teal-400 transition-colors">
        <img
          className="w-full h-full object-cover p-2 transition-transform duration-300 ease-in-out group-hover:scale-105"
          src={image[0]}
          alt={name}
        />
      </div>
      <p className="pt-3 pb-1 text-sm font-medium text-center text-slate-700 group-hover:text-teal-700 transition-colors">{name}</p>
      <p className={`text-xs text-center font-medium ${availability ? 'text-teal-600' : 'text-rose-500'}`}>
        {availability ? "In Stock" : "Out of Stock"}
      </p>
    </Link>
  );
};

export default ProductItem;
