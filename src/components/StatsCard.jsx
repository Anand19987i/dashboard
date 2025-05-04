import React from 'react';

/**
 * Card component to display key statistics with an icon.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.title - The title of the stat (e.g. 'Total Users').
 * @param {string|number} props.value - The numeric/stat value to display.
 * @param {JSX.Element} props.icon - Icon to visually represent the stat.
 * @returns {JSX.Element} Styled stat card.
 */
const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl px-5 py-6 w-full max-w-xs h-44 sm:h-48 flex flex-col items-center justify-center text-center font-poppins">
      <div className="mb-3">{icon}</div>
      <h2 className="text-gray-500  text-sm sm:text-base uppercase tracking-wide">{title}</h2>
      <p className="text-3xl sm:text-2xl font-bold text-gray-800 mt-3">{value}</p>
    </div>
  );
};

export default StatsCard;
