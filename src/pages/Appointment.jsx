import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RealtedDoctors from '../components/RealtedDoctors'

const Appointment = () => {

  const {docId} = useParams()
  const {doctors, currencySymbol} = useContext(AppContext)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  
  
  const [docInfo, setDocInfo] = useState(null)

  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState("")

  const fetchDocInfo = async ()=>{
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo) 
  }

  const getAvailableSlots = async () => {
    setDocSlots([]);
  
    // Getting the current date
    let today = new Date();
    
    for (let i = 0; i < 7; i++) {
      // Getting the date with index i (starting from today)
      let curreentDate = new Date(today); // Create a copy of the 'today' date
      curreentDate.setDate(today.getDate() + i);
      
      // Setting end time of the date with index i (21:00 or 9:00 PM)
      let endTime = new Date(curreentDate); // Use curreentDate, not today, to avoid conflicts
      endTime.setHours(21, 0, 0, 0); // Set the end time at 9 PM
  
      // Setting starting hours for time slots
      if (i === 0) {
        // For today, set the current hour + 1 or 10 AM if earlier
        curreentDate.setHours(curreentDate.getHours() > 10 ? curreentDate.getHours() + 1 : 10);
        curreentDate.setMinutes(curreentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        // For future dates, start from 10 AM
        curreentDate.setHours(10);
        curreentDate.setMinutes(0);
      }
  
      let timeSlots = [];
  
      // Generate slots for the current date
      while (curreentDate < endTime) {
        let formattedTime = curreentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        // Add slot to array
        timeSlots.push({
          datetime: new Date(curreentDate),
          time: formattedTime,
        });
  
        // Increment current time by 30 minutes
        curreentDate.setMinutes(curreentDate.getMinutes() + 30);
      }
  
      // Add timeSlots for the current date to the state
      setDocSlots(prev => [...prev, timeSlots]);
    }
  };
  

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])
  
  useEffect(()=>{
getAvailableSlots()
  },[docInfo])

  useEffect(()=>{
        // console.log(docSlots);
        
  },[docSlots])


  return docInfo && (
    <div>
      {/* Doctor Details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
        <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>
        {/* Doctors Info */}
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 '>
         <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="verified_icon" /></p>  
         <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
          <p>{docInfo.degree} - {docInfo.speciality} </p>
          <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>   

              {/* Doctor About */}
              <div>
                <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="info-icon" /></p>
                <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
              </div>
              <p className='text-gray-500 font-medium mt-5'>Appointment Fee : <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span></p>
        </div>
      </div>

      {/* Booking Slot */}
      <div className='sm:ml-72 sm:pl-4 font-medium text-gray-700 mt-5'>
         <p>Booking slots</p>
         <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots.map((item, index)=>(
           <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex  === index ? 'bg-primary text-white' : 'border border-gray-300'}`} key={index}>
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
           </div>
          ))}
         </div>

       
         
         {/* Booking Time */}
         <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots[slotIndex].map((item, index)=>(
            <p onClick={()=>setSlotTime(item.time)} key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`}>
              {item.time.toLowerCase()}
            </p>
          ))}
         </div>
         <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full mt-4'>Book an Appointment</button>
      </div>

     {/* List Of Related Doctors */}
     <RealtedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment
