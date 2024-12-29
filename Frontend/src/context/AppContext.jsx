import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"; // Default for debugging
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token") : false);
  const [userData, setUserData] = useState(false)
 

  const getDoctorData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message || "Failed to fetch doctors.");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error.response || error.message);
      toast.error(error.response?.data?.message || "Server error occurred.");
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, { headers:{token}});
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message || "Failed to fetch user profile.");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error.response || error.message);
      toast.error(error.response?.data?.message || "Server error occurred.");
    }
  }
  
  const value = {
    doctors,getDoctorData,
    currencySymbol,
    token, 
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  useEffect(()=>{
if (token) {
  loadUserProfileData()
}else{
  setUserData(false)
}
  },[token])

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
