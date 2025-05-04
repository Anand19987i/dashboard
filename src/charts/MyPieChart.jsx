import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { overviewData } from '../Samples/overview';

const COLORS = [
    '#8884d8', // Purple
    '#82ca9d', // Green
    '#ffc658', // Yellow
    '#ff7f50', // Coral
    '#a0522d', // Sienna
    '#8dd1e1', // Light Blue
    '#d0ed57', // Light Green
    '#a4de6c', // Lime
    '#ffbb28', // Amber
    '#ff8042', // Orange
    '#b084cc', // Lavender
    '#6b5b95'  // Indigo
  ];
  

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const role = overviewData.userRoles[index].role;

    return (
        <text
            x={x}
            y={y}
            fill="#333"
            fontSize={12}
            fontWeight="bold"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
        >
            {role}
        </text>
    );
};

const MyPieChart = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                padding: '1rem',
                background: '#ffffff',
                borderRadius: '1rem',
                boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
                marginBottom: '1.5rem',
            }}
        >
            <h2 className="text-center text-xl font-semibold text-gray-800 ">User Roles Overview</h2>
            <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                    <Pie
                        dataKey="count"
                        data={overviewData.userRoles}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        paddingAngle={3}
                    >

                        {overviewData.userRoles.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value, name, props) => [`${value} users`, props.payload.role]}
                    />

                    
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MyPieChart;
