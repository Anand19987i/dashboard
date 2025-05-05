import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const StatsCard = ({ title, value, icon }) => {
  const { darkMode } = useDarkMode();
  return (
    <div className={`hover:shadow-md 
      transition-all duration-300 rounded-2xl px-5 py-6 
      w-full max-w-xs h-44 sm:h-48 flex flex-col items-center justify-center 
      text-center font-poppins ${darkMode ? 'bg-slate-900 text-white shadow-lg': 'bg-white text-black shadow:md'}  `}>
      
      {/* Icon Container */}
      <div className="mb-3">
        {icon}
      </div>

      {/* Title */}
      <h2 className="text-gray-500  text-sm sm:text-base 
        uppercase tracking-wide">
        {title}
      </h2>

      {/* Value */}
      <p className={`text-3xl sm:text-2xl font-bold mt-3 ${darkMode ? 'text-white' : 'text-gray-800'} `}>
        {value}
      </p>
    </div>
  );
};

export default StatsCard;