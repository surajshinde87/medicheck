import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>Contact <span className='text-gray-700 font-medium'>Us</span></p>
      </div>

{/* Conatct Info */}
<div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm '>
  <img className='w-full max-w-[300px]' src={assets.contact_image} alt="contact-image" />
  <div className='flex flex-col justify-center items-start gap-6'>
    <p className='font-semibold text-lg text-gray-600'>Our Office</p>
    <p className='text-gray-500'>431213 Midc Area <br />Jalna, Maharashtra, India</p>
    <p className='text-gray-500'>Phone: +91-876-702-0032 <br />
    Email: medicheck@gmail.com</p>
    <p className='font-semibold text-gray-600'>Careers at MediCheck</p>
    <p className='text-gray-500'>Learn more about out teams and job openings.</p>
    <button className='border border-black px-8  py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
  </div>
</div>

    </div>
  )
}

export default Contact
