import React from "react";
import { assets } from "../assets/admin_assets/assets";

const Navbar = ({ setToken }) => {
  return (

    <div className="bg-yellow-100 flex item-center py-2 px-[4%] justify-between">

      <div className="flex items-center">
        <img
          className="h-16 object-contain sm:h-12 xs:h-8"
          src={assets.uni_logo}
          alt="uni logo"
        />

        <div className="ml-2 hidden lg:block">
          <p className="m-0 text-black text-m" style={{ fontWeight: 'bold' }}>
            Department of Chemistry
          </p>
          <p className="m-0 text-black text-sm" style={{ fontWeight: 'bold' }}>University of Peradeniya</p>
        </div>
      </div>

      <button
        onClick={() => {
          setToken("");
          localStorage.removeItem("token");
        }}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
