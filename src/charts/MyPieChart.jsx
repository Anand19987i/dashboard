import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { overviewData } from '../Samples/overview';
import { useDarkMode } from '../context/DarkModeContext';

const COLORS = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff7f50',
    '#a0522d', '#8dd1e1', '#d0ed57', '#a4de6c',
    '#ffbb28', '#ff8042', '#b084cc', '#6b5b95'
];

const DARK_COLORS = [
    '#6366f1', '#34d399', '#fbbf24', '#fb923c',
    '#92400e', '#60a5fa', '#a3e635', '#4ade80',
    '#f59e0b', '#ea580c', '#8b5cf6', '#4c1d95'
];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }, darkMode) => {
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

const CustomTooltip = ({ active, payload, darkMode }) => {
    if (active && payload && payload.length) {
        return (
            <div className={`p-2 rounded-md shadow-md text-sm ${
                darkMode
                    ? 'bg-gray-800 text-white border border-gray-600'
                    : 'bg-white text-black border border-gray-300'
            }`}>
                <p className="font-semibold">{payload[0].payload.role}</p>
                <p>{`${payload[0].value} users`}</p>
            </div>
        );
    }
    return null;
};

const MyPieChart = () => {
    const { darkMode } = useDarkMode();

    return (
        <div className={`w-full h-full p-4 rounded-xl shadow-sm ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        } transition-colors duration-300`}>
            <h2 className={`text-center text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
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
                    <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
                    <Legend
                        wrapperStyle={{
                            color: darkMode ? '#ffffff' : '#111827'
                        }}
                        formatter={(value) => (
                            <span className={`${darkMode ? 'text-white' : 'text-black'}`}>
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
