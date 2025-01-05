import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  // Redirect to login if the user is not authorized
  useEffect(() => {
    if (!aToken && !dToken) {
      navigate("/login"); // Redirect to login page if neither token exists
    }
  }, [aToken, dToken, navigate]);

  // Logout function
  const logout = () => {
    navigate("/login"); // Redirect to home or login page after logout
    if (aToken) {
      setAToken(""); // Clear admin token
      localStorage.removeItem("aToken"); // Remove from localStorage
    }
    if (dToken) {
      setDToken(""); // Clear doctor token
      localStorage.removeItem("dToken"); // Remove from localStorage
    }
  };

  return (
    <div className='flex justify-between items-center px-4 border-b bg-white'>
    <div className='flex items-center gap-2 text-xs'>
        <img className='w-72 cursor-pointer' src={assets.admin_logo} alt="Admin Logo" />
        <p className='border border-gray-300 text-gray-500 px-2.5 rounded-full text-xl '>{aToken ? "Admin" : "Doctor"}</p>
        <a className='text-blue-500 text-xl underline' href="https://medichecks.netlify.app/">Main Website</a>
    </div>
    <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full font-semibold'>Logout</button>
    </div>
  )
}

export default Navbar
