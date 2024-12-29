import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* Left Section */}
        <div>
            <img className='w-[300px] mb-5' src={assets.logo} alt="logo" />
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia veniam, excepturi dolores et amet, tempora quos animi, fugit a officiis voluptatum repellendus. Quas perspiciatis itaque qui recusandae, fugiat atque culpa!</p>
        </div>

        {/* Center Section */}
        <div>
      <p className='text-xl font-medium mb-5'>Company</p>
      <ul className='flex flex-col gap-2 text-gray-600'>
        <li>Home</li>
        <li>About Us</li>
        <li>Contact Us</li>
        <li>Privacy Policy</li>
      </ul>
        </div>

        {/* Right Section */}
        <div>
         <p className='text-xl font-medium mb-5'>Get In Touch</p>
         <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91-876-702-0032</li>
            <li>medicheck@gmail.com</li>
         </ul>
        </div>
      </div>
      {/* CopyRight */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@ MediCheck - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
