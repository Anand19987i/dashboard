import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { overviewData } from '../Samples/overview';

// MyAreaChart.jsx
const MyAreaChart = ({ darkMode }) => {
  return (
    <div className={`w-full h-full p-4 rounded-xl shadow-sm ${
      darkMode 
        ? 'bg-gray-800 border border-gray-700' 
        : 'bg-white border border-gray-200'
    } transition-colors duration-300`}>
      <h1 className={`text-center text-xl font-semibold ${
        darkMode ? 'text-gray-200' : 'text-gray-800'
      } mb-4`}>
        Monthly Users
      </h1>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={overviewData.monthlyUsers}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
          <XAxis 
            dataKey="month" 
            stroke={darkMode ? '#9ca3af' : '#6b7280'} 
          />
          <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
          <Tooltip
            contentStyle={{
              background: darkMode ? '#1f2937' : '#ffffff',
              border: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="count" 
            stroke={darkMode ? '#818cf8' : '#4f46e5'}
            fill={darkMode ? '#6366f160' : '#4f46e540'}
          />
          <Area 
            type="monotone" 
            dataKey="newUsers" 
            stroke={darkMode ? '#34d399' : '#10b981'}
            fill={darkMode ? '#34d39960' : '#10b98140'}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyAreaChart