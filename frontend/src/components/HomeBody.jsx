import React from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { Link } from 'react-router-dom';

const HomeBody = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <Link to='/inventory'>
          <img
            src={assets.chemical_icon}
            className='w-12 m-auto mb-5 transition-transform duration-300 transform hover:scale-125 cursor-pointer'
            alt="Inventory Request Icon"
          />
          <p className='font-semibold hover:underline'>Request chemicals</p> {/* Added hover:underline class */}
        </Link>
        <p className='text-gray-400'>Easily request and manage chemicals</p>
      </div>
    </div>
  );
};

export default HomeBody;
