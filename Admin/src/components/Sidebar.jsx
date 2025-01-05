import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'


import { MdHome } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import { MdOutlinePeopleAlt } from "react-icons/md";


const Sidebar = () => {
    const {aToken} = useContext(AdminContext)


  return (
    <div className='min-h-screen bg-white border-r'>
     {
        aToken && <ul className='text-gray-600'>
            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-slate-200 border-r-4 border-primary" : ""}`} to={'/admin-dashboard'}>
               <MdHome className='text-4xl ml-1' />
                <p className='hidden md:block '>Dashboard</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-slate-200 border-r-4 border-primary" : ""}`} to={'/all-appointments'}>
                <FaCalendarAlt className='text-3xl ml-1 ' />
                <p className='hidden md:block '>Appointments</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-slate-200 border-r-4 border-primary" : ""}`} to={'/add-doctor'}>
                <MdAddBox className='text-4xl' />
                <p className='hidden md:block '>Add Doctor</p>
            </NavLink>
            <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-slate-200 border-r-4 border-primary" : ""}`} to={'/doctor-list'}>
                <MdOutlinePeopleAlt className='text-4xl' />
                <p className='hidden md:block '>Doctors List</p>
            </NavLink>
        </ul>
     }
  
    </div>
  )
}

export default Sidebar
