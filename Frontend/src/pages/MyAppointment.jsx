import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import {useNavigate} from "react-router-dom"

const MyAppointment = () => {
  const {backendUrl, token, getDoctorData} = useContext(AppContext)

 const [appointments, setAppointments]  = useState([])
 const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", " Oct", "Nov", "Dec"]
const navigate = useNavigate()

 const slotDateFormat = (slotDate) => {
  // Split the slotDate string into day, month, and year
  const [day, month, year] = slotDate.split("_");

  // Convert the month to the appropriate month name from the `months` array
  const formattedMonth = months[Number(month) - 1];

  // Return the formatted date
  return `${day} ${formattedMonth} ${year}`;
};

const getUserAppointments = async () =>{
  try {
    const {data} = await axios.get(`${backendUrl}/api/user/appointments`, {headers:{token}})
    if(data.success) {
      setAppointments(data.appointments.reverse())
      // console.log(data.appointments);
      
    }
  } catch (error) {
    // console.log(error.message);
    toast.error(error.message);
  }
}

const cancelAppointment = async (appointmentId) => {

  try {
    
    const {data} = await axios.post(`${backendUrl}/api/user/cancel-appointment`, {appointmentId}, {headers:{token}})
    if(data.success) {
      toast.success(data.message)
      getUserAppointments()
      getDoctorData()
    } else{
      toast.error(data.message)
    }
  } catch (error) {
    // console.log(error);
    
    toast.error(error.message)
  }
}


// Initialize Razorpay and handle the payment
const initPay = (order) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay Key ID
    amount: order.amount, // Amount in paise
    currency: order.currency,
    name: "Appointment Payment",
    description: "Payment for Appointment Booking",
    order_id: order.id, // Razorpay Order ID
    receipt: order.receipt,
    handler: async (response) => {
      try {
        // Verify payment on the backend
        const {data} = await axios.post(
          `${backendUrl}/api/user/verify-razorpay`,
          response, // Payment response from Razorpay
          {
            headers: {token },
          }
        );

        if (data.success) {
          getUserAppointments()
         navigate('/my-appointments')
          // Perform additional actions, such as redirecting the user
        } else {
          toast.error('Payment verification failed.');
        }
      } catch (error) {
        console.error("Error during payment verification:", error);
        toast.error('Error verifying payment.');
      }
      
    },

    theme: {
      color: "#3399cc", // Custom Razorpay modal color
    },
  };

  const rzp = new window.Razorpay(options);

  rzp.open();
};

// Initiate Razorpay payment
 const appointmentRazorpay = async (appointmentId) => {
  try {
    // Call backend to create an order
    const { data } = await axios.post(
      `${backendUrl}/api/user/payment-razorpay`,
      { appointmentId },
      { headers: { token} }
    );

    if (data.success) {
      // console.log(data.order);
      initPay(data.order)
      // initPay(data.order); // Initialize payment
    } else {
      toast.error(data.message || 'Payment initiation failed.'); // Backend error response
    }
  } catch (error) {
    console.error("Error during API call:", error);

    if (error.response) {
      toast.error(`Error: ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      toast.error('No response from the server.');
    } else {
      toast.error(error.message || 'Unexpected error occurred.');
    }
  }
};







useEffect(()=>{
  if (token) {
    getUserAppointments()
  }
}, [token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700  border-b '>My Appointments</p>
      <div>
        {appointments.map((item, index)=>(
          <div  className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 border-b py-2' key={index}>
          <div>
            <img className='w-32 bg-indigo-50' src={item.docData.image} alt="doctor-image" />
          </div>
          <div className='flex-1 text-sm text-zinc-600 '>
            <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
            <p>{item.docData.speciality}</p>
            <p className='text-zinc-700 font-medium mt-1'>Address:</p>
            <p className='text-xs'>{item.docData.address.line1}</p>
            <p className='text-xs'>{item.docData.address.line2}</p>
            <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time: </span>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
           
          </div>
          <div></div>
          <div className='flex flex-col gap-2 justify-end'>
            {!item.cancelled && item.payment && !item.isCompletd && <button className='sm:min-w-48 py-2 border rounded text-stone-800 bg-indigo-50'>Paid</button>}
           {!item.cancelled  && !item.payment && <button onClick={()=>appointmentRazorpay(item._id)} className='text-sm text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>
           }
            {!item.cancelled  && !item.isCompleted  && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>

            }
            {item.cancelled  && !item.isCompleted  && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'> Appointment Cancelled
              </button>
              }
              {item.isCompleted  && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Appointment Completed
              </button>
              }
          </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default MyAppointment
