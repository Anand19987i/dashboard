import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { curveCardinal } from 'd3-shape';
import { overviewData } from '../Samples/overview';

const cardinal = curveCardinal.tension(0.2);
// MyCardinalChart.jsx
const MyCardinalChart = ({ darkMode }) => {
    return (
      <div className={`w-full h-full p-4 rounded-xl shadow-sm ${
        darkMode 
          ? 'bg-gray-800 border border-gray-700' 
          : 'bg-white border border-gray-200'
      } transition-colors duration-300`}>
        <h2 className={`text-center text-xl font-semibold ${
          darkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          Feedback Trends
        </h2>
        <ResponsiveContainer width="100%" height="95%">
          <AreaChart data={overviewData.feedbackTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis 
              dataKey="week" 
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
              type={cardinal} 
              dataKey="score" 
              stroke={darkMode ? '#34d399' : '#10b981'}
              fill={darkMode ? '#34d39940' : '#10b98120'}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };
export default MyCardinalChart;
