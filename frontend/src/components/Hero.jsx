import React from 'react'
import { assets } from '../assets/frontend_assets/assets';

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-slate-200 bg-white shadow-sm overflow-hidden rounded-lg'>
      {/*Hero left side*/}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-slate-800 p-8'>
          <div className='flex items-center gap-2 mb-2'>
            <p className='w-8 md:w-11 h-[3px] bg-teal-600'></p>
            <p className='font-semibold text-sm md:text-base text-teal-700 tracking-wider uppercase'>Research & Teaching</p>
          </div>
          <h1 className='prata-regular text-4xl sm:py-3 lg:text-6xl leading-tight text-slate-900'>Cheminventory</h1>
          <div className='flex items-center gap-2 mt-4'>
            <p className='font-medium text-sm md:text-base text-slate-500 tracking-widest'>SMART CHEMICAL MANAGEMENT</p>
            <p className='w-8 md:w-11 h-[2px] bg-slate-300'></p>
          </div>
        </div>
      </div>
      {/*Hero Right Side*/}
      <img className='w-full sm:w-1/2' src={assets.hero_img} alt="" />

    </div>
  )
}

export default Hero