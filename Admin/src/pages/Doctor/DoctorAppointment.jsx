import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointment = () => {
    const {dToken,
        getAppointments,
        appointments, completeAppointment,
        cancelAppointment,} = useContext(DoctorContext)
        const {calculateAge,slotDateFormat} = useContext(AppContext)

    useEffect(() => {
      if(dToken){
        getAppointments()
      }
    }, [])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded min-h-[50vh] text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b '>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

   {/* Appointment data */}
   {
    appointments.map((item, index)=>(
      <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr]  gap-1 items-center hover:bg-gray-50 text-gray-500 py-3 px-6 border-b '  key={index}>
     <p className='max-sm:hidden'>{index + 1 }</p>
     <div className='flex items-center gap-2 '>
      <img className='w-12 h-12 rounded-full' src={item.userData.image} alt="patient image" /> <p>{item.userData.name}</p>
     </div>

     <div>
 <p className=' inline border border-primary px-2 rounded-full'>{item.payment ? "Online" : "Cash"} </p>
     </div>
  
      <p >{calculateAge(item.userData.dob)} </p>
       <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
       <p>₹{item.amount}</p>
       {
        item.cancelled
        ? <p className='text-red-400 text-sm font-medium'>Cancelled</p>
        : item.isCompleted
        ? <p className='text-green-500 text-sm font-medium'>Completed</p> 
        : <div className='flex items-center'>
        <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="cancel_icon" />
        <img onClick={()=>completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="ckeck_icon" />
       </div>
       }
       
      </div>
    ))
   }

      </div>
    </div>
  )
}

export default DoctorAppointment
