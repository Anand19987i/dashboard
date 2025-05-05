import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { overviewData } from '../Samples/overview';
import { useDarkMode } from '../context/DarkModeContext';

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

const DARK_COLORS = [
    '#6366f1', // Dark Purple
    '#34d399', // Dark Green
    '#fbbf24', // Dark Yellow
    '#fb923c', // Dark Coral
    '#92400e', // Dark Sienna
    '#60a5fa', // Dark Blue
    '#a3e635', // Dark Lime
    '#4ade80', // Dark Lime Green
    '#f59e0b', // Dark Amber
    '#ea580c', // Dark Orange
    '#8b5cf6', // Dark Lavender
    '#4c1d95'  // Dark Indigo
];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }, darkMode) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const role = overviewData.userRoles[index].role;

    return (
        <text
            x={x}
            y={y}
            fill={darkMode ? "#f3f4f6" : "#333"}
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
  const { darkMode } = useDarkMode();
    return (
        <div className={`w-full h-full p-4 rounded-xl shadow-sm ${
            darkMode 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-white border border-gray-200'
        } transition-colors duration-300`}>
            <h2 className={`text-center text-xl font-semibold ${
                darkMode ? 'text-white' : 'text-gray-800'
            }`}>
                User Roles Overview
            </h2>
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
                        label={(props) => renderCustomizedLabel(props, darkMode)}
                        paddingAngle={3}
                    >
                        {overviewData.userRoles.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={darkMode ? DARK_COLORS[index % DARK_COLORS.length] : COLORS[index % COLORS.length]} 
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value, name, props) => [`${value} users`, props.payload.role]}
                        contentStyle={{
                            background: darkMode ? '#1f2937' : '#fffff',
                            border: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
                            borderRadius: '8px',
                            color: darkMode ? '#f3f4f6' : '#111827' 
                        }}
                    />
                    <Legend 
                        wrapperStyle={{
                            color: darkMode ? '#ffffff' : '#111827'
                        }}
                        formatter={(value) => (
                          <span className={`${darkMode ? '#f3f4f6' : '#111827'}`}>
                              {value}
                          </span>
                      )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MyPieChart;