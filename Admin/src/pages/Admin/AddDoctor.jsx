import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import {toast} from 'react-toastify'
import axios from 'axios'
const AddDoctor = () => {

const [docImg, setDocImg] = useState(false)
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [experience, setExperience] = useState("1 year")
const [fees, setFees] = useState("")
const [about, setAbout] = useState("")
const [speciality, setSpeciality] = useState("General Physicion")
const [degree, setDegree] = useState("")
const [address1, setAddress1] = useState("")
const [address2, setAddress2] = useState("")

const {backendUrl, aToken} = useContext(AdminContext)

const handleSubmit = async (e) => {
    e.preventDefault()

   try {
    if (!docImg || !(docImg instanceof File)) {
        return toast.error("Valid image not selected.");
    }

    if (!name || !email || !password || !experience || !fees || !address1 || !address2) {
        return toast.error("All fields are required.");
    }

    const formData = new FormData();
    formData.append('image', docImg);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('experience', experience);
    formData.append('fees', Number(fees));
    formData.append('about', about);
    formData.append('speciality', speciality);
    formData.append('degree', degree.toUpperCase());
    formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

    if (!aToken) {
        return toast.error("Authentication token missing.");
    }

    const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        { headers: { aToken } }
    );

    if (data && data.success) {
        toast.success(data.message);
        setDocImg(null); // Resetting to initial type
        setName("");
        setEmail(" ");
        setPassword(" ");
        setAddress1("");
        setAddress2("");
        setAbout("");
        setDegree("");
        setFees("");
    } else if (data && data.message) {
        toast.error(data.message);
    } else {
        toast.error("Unexpected response from server.");
    }
} catch (error) {
    if (error.response) {
        toast.error(error.response.data.message || "Server error occurred.");
    } else if (error.request) {
        toast.error("No response from server. Please try again.");
    } else {
    
        toast.error(error.message);
    }
}

   
}



  return (
   <form onSubmit={handleSubmit} className='m-5 w-full'>
    <p className='mb-3 text-lg font-medium'>Add Doctor</p>

    <div className='bg-white p-8 rounded w-full max-w-4xl max-h-[80vh] overflow-scroll'>
      {/* Image Upload Div */}
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
            <label htmlFor='doc-img'>
                <img src={docImg ? URL.createObjectURL(docImg) :assets.upload_area} alt="upload_area" className='border rounded-full cursor-pointer h-20 w-20 object-center object-fill  bg-gray-100' />
            </label>
            <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id='doc-img' className='hidden' />
            <p>Upload doctor <br /> picture</p>
        </div>
        
        <div className='flex flex-col lg:flex-row items-start gap-10 flex-wrap text-gray-400'>
            <div className='w-full lg:flex-1 flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
                <p>Doctor Name</p>
                <input onChange={(e)=>setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
                <p>Doctor Email</p>
                <input
    onChange={(e) => setEmail(e.target.value)}
    value={email}
    className='border rounded px-3 py-2'
    type="email"
    name="doctor-email"
   placeholder='Email'
    required
/>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
                <p>Doctor Password</p>
                <input autoComplete="off"  onChange={(e)=>setPassword(e.target.value)} value={password}  className='border rounded px-3 py-2' type="password" placeholder='Password' required />
            </div>

          
            {/* Experience and fees div */}
           
         <div className='flex-1 flex flex-col gap-1'>
            <p>Experience</p>
            <select
    onChange={(e) => setExperience(e.target.value)}
    value={experience}
    className="border rounded px-3 py-2"
>
    <option value="1 year">1 year</option>
    <option value="2 years">2 years</option>
    <option value="3 years">3 years</option>
    <option value="4 years">4 years</option>
    <option value="5 years">5 years</option>
    <option value="6 years">6 years</option>
    <option value="7 years">7 years</option>
    <option value="8 years">8 years</option>
    <option value="9 years">9 years</option>
    <option value="10 years">10 years</option>
    <option value="11+ years">11+ years</option>
</select>

         </div>
         <div className='flex-1 flex flex-col gap-1'>
            <p>Fees</p>
                <input  onChange={(e)=>setFees(e.target.value)} value={fees}  className='border rounded px-3 py-2 appearance-none' type="text" placeholder='Your Fee' required />
            </div>
        
        </div>
{/* Speciality educatiom and address */}
        <div className='w-full lg:flex-1 flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
                <p>Speciality</p>
                <select className='border rounded px-3 py-2' onChange={(e)=>setSpeciality(e.target.value)} value={speciality} >
                    <option value="">Select</option>
                    <option value="General Physician">General Physician</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
                <p>Education</p>
                <input  onChange={(e)=>setDegree(e.target.value)} value={degree}  className='border rounded px-3 py-2' type="text" placeholder='Enter Education' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
                <p>Address</p>
                <input onChange={(e)=>setAddress1(e.target.value)} value={address1}  className='border rounded px-3 py-2' type="text" placeholder='address 1' required />
                <input  onChange={(e)=>setAddress2(e.target.value)} value={address2}  className='border rounded px-3 py-2' type="text" placeholder='address 2'  />
            </div>
        </div>


    </div>
        <div>
                <p className='mt-4 mb-2'>About Doctor</p>
                <textarea  onChange={(e)=>setAbout(e.target.value)} value={about}  className='w-full px-4 pt-2 border rounded' placeholder='write about doctor' rows={5} required ></textarea>
            </div>
            <button type='submit' className='rounded-full bg-primary text-white px-10 py-2 mt-5 shadow-lg'>Add Doctor</button>
    </div>
   </form>
  )
}

export default AddDoctor
