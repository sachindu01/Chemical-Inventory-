import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopConext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { getCartCount, token, userRole, setToken, navigate, setCartItems } =
    useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200 && window.scrollY > lastScrollY) {
        // User is scrolling down
        setHeaderFixed(true);
      } else if (window.scrollY < lastScrollY) {
        // User is scrolling up
        setHeaderFixed(false);
      }
      // Set the last scroll position
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`flex items-center justify-between py-6 px-5 font-medium bg-white border-b border-slate-200 shadow-sm ${headerFixed ? "navbar-fixed fadeInDown" : ""
        }`}
    >
      <Link to="/">
        <div className="flex items-center">
          <img
            className="h-16 object-contain sm:h-12 xs:h-8"
            src={assets.uni_logo}
            alt="uni logo"
          />

          <div className="ml-2 hidden lg:block">
            <p className="m-0 text-slate-800 text-sm font-semibold tracking-wide">
              Department of Chemistry
            </p>
            <p className="m-0 text-slate-500 text-xs tracking-wider">University of Peradeniya</p>
          </div>
        </div>
      </Link>

      <ul className="hidden sm:flex gap-6 text-sm text-slate-600">
        <NavLink to="/" className="flex flex-col items-center gap-1 hover:text-teal-700 transition">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[2px] bg-teal-600 hidden" />
        </NavLink>

        <NavLink to="/dashboard" className="flex flex-col items-center gap-1 hover:text-teal-700 transition">
          <p>DASHBOARD</p>
          <hr className="w-2/4 border-none h-[2px] bg-teal-600 hidden" />
        </NavLink>

        <NavLink to="/inventory" className="flex flex-col items-center gap-1 hover:text-teal-700 transition">
          <p>INVENTORY</p>
          <hr className="w-2/4 border-none h-[2px] bg-teal-600 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1 hover:text-teal-700 transition">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[2px] bg-teal-600 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="Profile"
          />

          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 text-gray-500">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 transition-opacity duration-200 group-hover:opacity-100">
                <p
                  onClick={() => (token ? null : navigate("/login"))}
                  className="cursor-pointer hover:text-black"
                >
                  Login
                </p>

                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {token && userRole === "STUDENT" && (
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5 min-w-5 grayscale" alt="Request Basket" />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-teal-600 text-white aspect-square rounded-full text-[8px] font-bold">
              {getCartCount()}
            </p>
          </Link>
        )}

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      {/* Sidebar menu for small screen */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white z-index-1000 ${visible ? "w-full" : "w-0"
          }`}
      >
        <div className="flex flex-col text-gray-600 z-index-1000">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/dashboard"
          >
            DASHBOARD
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/inventory"
          >
            INVENTORY
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
