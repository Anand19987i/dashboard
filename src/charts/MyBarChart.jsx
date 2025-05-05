import React from 'react';
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { overviewData } from '../Samples/overview';

const MyBarChart = ({ darkMode }) => {
    return (
      <div className={`w-full h-full p-4 rounded-xl shadow-sm ${
        darkMode 
          ? 'bg-gray-800 border border-gray-700' 
          : 'bg-white border border-gray-200'
      } transition-colors duration-300`}>
        <h2 className={`text-center text-xl font-semibold ${
          darkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Login Activity by Hours
        </h2>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={overviewData.loginActivity}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis 
              dataKey="hour" 
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
            <Bar
              dataKey="logins"
              fill={darkMode ? '#818cf8' : '#4f46e5'}
              activeBar={{ fill: darkMode ? '#6366f1' : '#4338ca' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

export default MyBarChart;
