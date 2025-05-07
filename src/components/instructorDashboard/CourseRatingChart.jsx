import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CourseRatingChart = ({data}) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Course Ratings Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={50}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="courseTitle" />
          <YAxis domain={[0, 5]} tickFormatter={(v) => `${v} ★`} />
          <Tooltip formatter={(v) => `${v} ★`} />
          <Bar dataKey="averageRating" fill="#facc15" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CourseRatingChart