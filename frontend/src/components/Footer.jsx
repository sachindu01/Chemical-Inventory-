import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <div>
            <div className="flex items-center">
              <img
                className="h-16 object-contain "
                src={assets.uni_logo}
                alt="uni logo"
              />

              <div className="ml-2">
                <p className="m-0 text-slate-800 text-sm font-bold tracking-wide">
                  Department of Chemistry
                </p>
                <p className="m-0 text-slate-700 text-xs font-semibold">
                  Faculty of Science
                </p>
                <p className="m-0 text-slate-600 text-xs">
                  University of Peradeniya
                </p>
              </div>
            </div>
          </div>
          <p className="w-full md:w-2/3 text-slate-500 mt-2">
            Smart chemical invnetory management system
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">Cheminventory</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About us</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-slate-500">
            <li>
              <a href="tel:+94812388693" className="hover:text-teal-600 transition">Tel: 94 81 238 8693 / 9151 / 9152</a>
            </li>
            <li>
              <a href="mailto:deansci@pdn.ac.lk" className="hover:text-teal-600 transition">deansci@pdn.ac.lk</a>
            </li>
          </ul>
        </div>
        <div className="col-span-3">
          <hr className="my-4 border-slate-200" />
          <p className="py-5 text-sm text-center text-slate-500">
            Copyright 2024 @ Faculty of Science - University of Peradeniya -
            All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
