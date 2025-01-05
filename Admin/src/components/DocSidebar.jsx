import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { DoctorContext } from '../context/DoctorContext'
import { MdHome } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";



const DocSidebar = () => {
   
    const {dToken} = useContext(DoctorContext)

  return (
    <div className='min-h-screen bg-white border-r'>
      {
        dToken && <ul className='text-gray-600'>
            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-slate-200 border-r-4 border-primary" : ""}`} to={'/doctor-dashboard'}>
            <MdHome className='text-4xl ml-1' />
                <p className='hidden md:block '>Dashboard</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-slate-200 border-r-4 border-primary" : ""}`} to={'/doctor-appointments'}>
            <FaCalendarAlt className='text-3xl ml-1 ' />
                <p  className='hidden md:block '>Appointments</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-slate-200 border-r-4 border-primary" : ""}`} to={'/doctor-profile'}>
            <MdAddBox className='text-4xl' />
                <p  className='hidden md:block '>Doctors Profile</p>
            </NavLink>
        </ul>
     }
    </div>
  )
}

export default DocSidebar
