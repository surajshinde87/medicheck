import React, { useContext, useEffect } from 'react';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllApointments from './pages/Admin/AllApointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import DocSidebar from './components/DocSidebar';

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  // Redirect to login if no valid token
  const isAuthenticated = aToken || dToken;

  if (!isAuthenticated) {
    return (
      <>
        <Login />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="bg-slate-100">
      <ToastContainer />
 <Navbar />
      <div className="flex items-start">
        {aToken ? <Sidebar /> : <DocSidebar />}
 
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllApointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />

          {/* Doctor Routes */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointment />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
         <Route path='/login' element={<Login />} />
         <Route path='/' element={<Login />} />
          {/* Fallback Route */}
 
        </Routes>
      </div>
    </div>
  );
};

export default App;
