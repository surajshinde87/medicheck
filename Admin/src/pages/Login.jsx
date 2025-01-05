import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('admin@medicheck.com');
  const [password, setPassword] = useState('Admin@123');

  const {aToken, setAToken, backendUrl } = useContext(AdminContext);
  const {dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          toast.success('Login successful');
          navigate('/admin-dashboard'); // Redirect to dashboard
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password });
        if (data.success) {
          localStorage.setItem('dToken', data.token);
          setDToken(data.token);
          toast.success('Login successful');

          navigate('/doctor-dashboard'); // Redirect to dashboard
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return !aToken || !dToken &&  (
   <div className='w-full bg-gray-100 flex items-center justify-center h-screen absolute top-0'>
     <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col gap-3 items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-gray-800 text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-gray-400 rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-gray-400 rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">Login</button>
        {state === 'Admin' ? (
          <p>
            Doctor Login{' '}
            <span className="text-primary underline cursor-pointer" onClick={() => setState('Doctor')}>
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Admin Login{' '}
            <span className="text-primary underline cursor-pointer" onClick={() => setState('Admin')}>
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
   </div>
  );
};

export default Login;
