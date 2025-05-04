import React, { PureComponent, useDebugValue } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { overviewData } from '../Samples/overview';

const MyLineChart = () => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            padding: '1rem',
            background: '#ffffff',
            borderRadius: '1rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            marginBottom: '1.5rem',

        }}>
            <h2 className="text-center text-xl font-semibold text-gray-800">
                Session Duration
            </h2>
            <ResponsiveContainer width="100%" height="95%">
                <LineChart
                    width={500}
                    height={300}
                    data={overviewData.sessionDurations}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="minutes" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>

    );
}

export default MyLineChart;
