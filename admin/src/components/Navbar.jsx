import React from "react";
import { assets } from "../assets/admin_assets/assets";

const Navbar = ({ setToken }) => {
  return (

    <div className="bg-white border-b border-slate-200 shadow-sm flex item-center py-3 px-[4%] justify-between">

      <div className="flex items-center">
        <img
          className="h-16 object-contain sm:h-12 xs:h-8"
          src={assets.uni_logo}
          alt="uni logo"
        />

        <div className="ml-2 hidden lg:block tracking-wide">
          <p className="m-0 text-slate-800 text-m font-bold">
            Department of Chemistry
          </p>
          <p className="m-0 text-slate-600 text-sm font-semibold">University of Peradeniya</p>
        </div>
      </div>

      <button
        onClick={() => {
          setToken("");
          localStorage.removeItem("token");
        }}
        className="bg-slate-600 hover:bg-slate-700 transition text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide shadow-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
