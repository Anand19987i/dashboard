import React, { PureComponent, useDebugValue } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { overviewData } from '../Samples/overview';

// MyLineChart.jsx
const MyLineChart = ({ darkMode }) => {
    return (
      <div className={`w-full h-full p-4 rounded-xl shadow-sm ${
        darkMode 
          ? 'bg-gray-800 border border-gray-700' 
          : 'bg-white border border-gray-200'
      } transition-colors duration-300`}>
        <h2 className={`text-center text-xl font-semibold ${
          darkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Session Duration
        </h2>
        <ResponsiveContainer width="100%" height="95%">
          <LineChart data={overviewData.sessionDurations}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis 
              dataKey="date" 
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
            <Line 
              type="monotone" 
              dataKey="minutes" 
              stroke={darkMode ? '#818cf8' : '#4f46e5'}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

export default MyLineChart;
