import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const {  aToken,
    cancelAppointments,
    dashData,
    getDashboardData
   } = useContext(AdminContext)

   const {slotDateFormat} = useContext(AppContext)
   useEffect(()=>{
    if(aToken){
      getDashboardData()
    }
   }, [aToken])

  return dashData && (
    <div className='m-5 '>

    <div className='flex flex-wrap gap-3'>

      <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all' >
        <img className='w-14' src={assets.doctor_icon} alt="doctor_icon" />
        <div>
          <p className='text-xl font-semibold text-gray-600' >{dashData.doctors} </p>
          <p className='text-gray-400'>Doctors </p>
        </div>
      </div>
      <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all' >

        <img className='w-14' src={assets.appointments_icon} alt="appointments_icon" />
        <div>
          <p className='text-xl font-semibold text-gray-600' >{dashData.appointments} </p>
          <p className='text-gray-400'>Appointments </p>
        </div>
      </div>
      <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all' >

        <img className='w-14' src={assets.patients_icon} alt="patients_icon" />
        <div>
          <p className='text-xl font-semibold text-gray-600' >{dashData.patients} </p>
          <p className='text-gray-400'>Patients </p>
        </div>
      </div>

    </div>
    {/* Latest Appointments */}
    <div className='bg-white '>
      <div className='flex items-center gap-2.5 p-4 mt-10 rounded-t border'>
        <img src={assets.list_icon} alt="list_icon" />
        <p>Latest Bookings</p>
      </div>

      <div className='pt-4 border border-t-0'>
      {
  dashData?.latestAppointments?.length > 0 ? (
    dashData.latestAppointments.map((item, index) => (
      <div
        className="flex items-center px-6 py-3 gap-3 justify-between hover:bg-gray-100"
        key={index}
      >
        {/* Left side: Image and Text */}
        <div className="flex items-center gap-3">
          <img
            className="rounded-full h-12 w-12 shadow-lg bg-blue-200"
            src={item.docData.image}
            alt="Doctor Image"
          />
          <div>
            <p className="text-gray-800 font-medium">{item.docData.name}</p>
            <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
          </div>
        </div>
        {/* Right side: Cancelled status or cancel button */}
        <div>
          {
                 item.cancelled 
                 ?<p className='text-red-400'>Cancelled</p>
                 : item.isCompleted
                 ? <p className='text-green-600'>Completed</p>
                 : <img onClick={()=>cancelAppointments(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="cancel_icon" />
                }
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500 text-center py-4">No Appointments Found</p>
  )
}

      </div>
    </div>
    </div>
  )
}

export default Dashboard
