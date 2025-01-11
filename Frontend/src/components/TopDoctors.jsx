import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  // Simulate loading for demonstration (replace with actual data-fetching logic if needed)
  useEffect(() => {
    if (doctors && doctors.length > 0) {
      setLoading(false);
    }
  }, [doctors]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center">Simply browse through our extensive list of trusted doctors.</p>

      {/* Display loading message if data is not ready */}
      {loading ? (
        <div className="w-full flex flex-col items-center justify-center gap-2 pt-10">
          <p className="text-lg text-gray-700">🔄 Doctors are loading, please wait...</p>
          <p className="text-sm text-gray-600">We are fetching the best doctors for you. Stay tuned!</p>
        </div>
      ) : (
        <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
          {doctors.slice(0, 10).map((item, index) => (
            <div
              onClick={() => {
                navigate(`/appointments/${item._id}`);
                setTimeout(() => {
                  window.scrollTo(0, 0);
                }, 100);
              }}
              key={index}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img className="bg-blue-50" src={item.image} alt="doctor image" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 rounded-full bg-green-500"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Button to navigate to all doctors */}
      {!loading && (
        <button
          onClick={() => {
            navigate('/doctors');
            scrollTo(0, 0);
          }}
          className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
        >
          More Doctors
        </button>
      )}
    </div>
  );
};

export default TopDoctors;
