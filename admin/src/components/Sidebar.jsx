import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/admin_assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r border-slate-200 bg-white'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

        <NavLink className={({ isActive }) => `flex item-center gap-3 border border-slate-200 border-r-0 px-3 py-2 rounded-l-lg transition-colors ${isActive ? 'bg-teal-50 text-teal-700 border-teal-200 shadow-sm' : 'hover:bg-slate-50 text-slate-700'}`} to="/users">
          <img className='w-5 h-5 opacity-70'
            src={assets.profile_icon} alt="" />
          <p className='hidden md:block font-medium'>Users</p>
        </NavLink>

        <NavLink className={({ isActive }) => `flex item-center gap-3 border border-slate-200 border-r-0 px-3 py-2 rounded-l-lg transition-colors ${isActive ? 'bg-teal-50 text-teal-700 border-teal-200 shadow-sm' : 'hover:bg-slate-50 text-slate-700'}`} to="/add">
          <img className='w-5 h-5 opacity-70'
            src={assets.add_icon} alt="" />
          <p className='hidden md:block font-medium'>Add Items</p>
        </NavLink>

        <NavLink className={({ isActive }) => `flex item-center gap-3 border border-slate-200 border-r-0 px-3 py-2 rounded-l-lg transition-colors ${isActive ? 'bg-teal-50 text-teal-700 border-teal-200 shadow-sm' : 'hover:bg-slate-50 text-slate-700'}`} to="/list">
          <img className='w-5 h-5 opacity-70'
            src={assets.order_icon} alt="" />
          <p className='hidden md:block font-medium'>List Items</p>
        </NavLink>

        <NavLink className={({ isActive }) => `flex item-center gap-3 border border-slate-200 border-r-0 px-3 py-2 rounded-l-lg transition-colors ${isActive ? 'bg-teal-50 text-teal-700 border-teal-200 shadow-sm' : 'hover:bg-slate-50 text-slate-700'}`} to="/request">
          <img className='w-5 h-5 opacity-70'
            src={assets.chemical_icon} alt="" />
          <p className='hidden md:block font-medium'>Chemical Requests</p>
        </NavLink>



      </div>
    </div>
  )
}

export default Sidebar
