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
  const [loading, setLoading] = useState(false); // Loading state

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
        if (data.success && data.token) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          toast.success('Admin Login successful');
          navigate('/admin-dashboard');
        } else {
          toast.error(data.message || 'Invalid login details.');
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password });
        if (data.success && data.token) {
          localStorage.setItem('dToken', data.token);
          setDToken(data.token);
          toast.success('Doctor Login successful');
          navigate('/doctor-dashboard');
        } else {
          toast.error(data.message || 'Invalid login details.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="w-full bg-gray-100 flex items-center justify-center h-screen absolute top-0">
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
              disabled={loading} // Disable input when loading
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
              disabled={loading} // Disable input when loading
            />
          </div>
          <button
            className={`w-full py-2 rounded-md text-base ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary text-white'
            }`}
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Please Wait...' : 'Login'}
          </button>
          {state === 'Admin' ? (
            <p>
              Doctor Login{' '}
              <span
                className="text-primary underline cursor-pointer"
                onClick={() => setState('Doctor')}
              >
                Click Here
              </span>
            </p>
          ) : (
            <p>
              Admin Login{' '}
              <span
                className="text-primary underline cursor-pointer"
                onClick={() => setState('Admin')}
              >
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
