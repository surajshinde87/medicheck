import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";


// Create AdminContext
export const AdminContext = createContext();

// Define AdminContextProvider as a React component
const AdminContextProvider = ({ children }) => {
    const [aToken, setAToken] = useState(localStorage.getItem("aToken"));
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState([]);
    const [loading, setLoading] = useState(true);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        if (aToken) {
            localStorage.setItem("aToken", aToken);
        } else {
            localStorage.removeItem("aToken");
        }
        setLoading(false);
    }, [aToken]);

    const axiosInstance = axios.create({
        baseURL: backendUrl,
        headers: { Authorization: `Bearer ${aToken}` },
    });

    const getAllDoctors = async () => {
        try {
            const { data } = await axiosInstance.post("/api/admin/all-doctors");
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axiosInstance.post("/api/admin/change-availability", { docId });
            if (data.success) {
                toast.success(data.message);
                getAllDoctors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const getAllAppointments = async () => {
        try {
            const { data } = await axiosInstance.get("/api/admin/appointments");
            if (data.success) {
                setAppointments(data.appointments.reverse());
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const cancelAppointments = async (appointmentId) => {
        try {
            const { data } = await axiosInstance.post("/api/admin/cancel-appointment", { appointmentId });
            if (data.success) {
                toast.success(data.message);
                getAllAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const getDashboardData = async () => {
        try {
            const { data } = await axiosInstance.get("/api/admin/dashboard");
            if (data.success) {
                setDashData(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const value = {
        aToken,
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        appointments,
        setAppointments,
        getAllAppointments,
        cancelAppointments,
        dashData,
        getDashboardData,
    };

    if (loading) {
        return <div>Loading...</div>;
    }

  

    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;
