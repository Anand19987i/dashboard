import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { overviewData } from '../Samples/overview';

const MyAreaChart = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '1rem',
        background: '#ffffff',
        borderRadius: '1rem',
        boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '1.5rem'
      }}
    >
      <h1 className="text-center text-2xl text-gray-800 font-semibold mb-4">Monthly Users</h1>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          data={overviewData.monthlyUsers}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="count" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="newUsers" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyAreaChart;
