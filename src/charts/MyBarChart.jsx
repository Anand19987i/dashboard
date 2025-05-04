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

const MyBarChart = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                padding: '1rem',
                background: '#fffffff',
                borderRadius: '1rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                marginBottom: '1.5rem'
            }}
        >
            <h2 className="text-center text-xl font-semibold text-gray-800">
                Login Activity by Hours
            </h2>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart
                    data={overviewData.loginActivity}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="logins"
                        fill="#4F46E5" // blue color
                        activeBar={<Rectangle fill="#6366F1" stroke="#1E3A8A" />} // hover effect with darker stroke
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MyBarChart;
