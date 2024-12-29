import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const {backendUrl, profileData, getProfileData, setProfileData, dToken } =
    useContext(DoctorContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async ()=>{
    try {
     const updatadata = {
      address: profileData.address,
      fees: profileData.fees,
      availability: profileData.availability
     }
     const {data} = await axios.post(`${backendUrl}/api/doctor//update-profile`, updatadata , {headers:{dToken}})
     if(data.success) {
      toast.success(data.message)
      setIsEdit(false);
      getProfileData();
     }else{
      toast.error(data.message)
     }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, []);
  return (
    profileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-primary/80 w-full sm:max-w-64 rounded-lg "
              src={profileData.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white ">
            {/* Doctor Info */}

            <p className="flex items-center gap-2 text-gray-700 font-medium text-3xl">
              {profileData.name}{" "}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {profileData.experience}{" "}
              </button>
            </div>
            {/* Doctor About */}
            <div>
              <p className="flex items-center gap-1 font-medium mt-3 text-sm text-neutral-800">
                About :
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Appointment Fee: <span className="text-gray-800">₹</span> 
              {isEdit ? <input type="number" value={profileData.fees} onChange={(e)=>setProfileData(prev => ({...prev, fees: e.target.value}))} />: profileData.fees}
            </p>
            {/* Doctor Address */}
            <div className="flex gap-2 py-2">
              <p>Address</p>
              <p className="text-sm">
                { isEdit ? <input type="text" value={profileData.address.line1} onChange={(e)=>setProfileData(prev => ({...prev, address:{...prev.address,line1:e.target.value}}))} />:profileData.address.line1}
                <br />
                { isEdit ? <input type="text" value={profileData.address.line2} onChange={(e)=>setProfileData(prev => ({...prev, address:{...prev.address,line2:e.target.value}}))} />:profileData.address.line2}

              </p>
            </div>

            <div className="flex gap-1 pt-2">
              <input onChange={()=>isEdit && setProfileData(prev => ({...prev, availability: !prev.availability}))} checked={profileData.availability} type="checkbox" />
              <label>Availabel</label>
            </div>

 {
  isEdit
  ? <button
  onClick={updateProfile}
  className="hover:bg-primary hover:text-white transition-all px-4 py-1 border border-primary text-sm rounded-full mt-5"
>
  Save
</button>
  : <button
  onClick={() => setIsEdit(true)}
  className="hover:bg-primary hover:text-white transition-all px-4 py-1 border border-primary text-sm rounded-full mt-5"
>
  Edit
</button>
 }

         
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
