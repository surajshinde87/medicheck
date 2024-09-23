import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate =  useNavigate()
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 '>
      {/* Left Side */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
<div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
    <p className='text-3xl md:text-4xl lg:text-5xl text-black font-semibold leading-tight md:leading-tight lg:leading-tight'>Book Appointment</p>
    <p className='mt-4'>with 100+ Trusted Doctors</p>
</div>
<button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all duration-150'>Create account</button>
      </div>
      {/* Right Side */}
      <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
 <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="Appointment image" />
      </div>
    </div>
  )
}

export default Banner


