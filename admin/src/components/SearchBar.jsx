import React from "react";
import { assets } from "../assets/admin_assets/assets";


const SearchBar = ({ search, setSearch }) => {
  
  return (
    <div className="border-t border-b bg-yellow-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value.toUpperCase())}
          className="flex-1 outline-none border-none bg-transparent text-sm"
          type="text"
          placeholder="Enter Verification Key"
        />
        <img className="w-4" src={assets.search_icon} alt="" />
      </div>
    </div>
  );
};

export default SearchBar;
