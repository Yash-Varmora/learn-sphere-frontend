import React from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const EnrollmentTrendsChart = ({ data, type = "line" }) => {
   return (
    <div className="p-4 bg-white dark:bg-gray-900 shadow rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">Enrollment Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        {type === "area" ? (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorEnroll" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorEnroll)"
            />
          </AreaChart>
        ) : (
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#3b82f6" />
          </LineChart>
        )}
      </ResponsiveContainer>
       </div>
   )
};

export default EnrollmentTrendsChart