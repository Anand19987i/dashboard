import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { curveCardinal } from 'd3-shape';
import { overviewData } from '../Samples/overview';

const cardinal = curveCardinal.tension(0.2);

const MyCardinalChart = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                padding: '1rem',
                background: '#ffffff',
                borderRadius: '1rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                marginBottom: '1.5rem'
            }}
        >
            <h2 className="text-center text-xl font-semibold text-gray-800">
                Feedback Trends
            </h2>
            <ResponsiveContainer width="100%" height="95%">
                <AreaChart
                    width={500}
                    height={400}
                    data={overviewData.feedbackTrends}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    {/* <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} /> */}
                    <Area type={cardinal} dataKey="score" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default MyCardinalChart;
