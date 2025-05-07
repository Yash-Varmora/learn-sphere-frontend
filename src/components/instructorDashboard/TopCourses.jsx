import React from 'react'
import { useSelector } from 'react-redux';
import TopCoursesChart from './TopCoursesChart';

const TopCourses = () => {

    const { instructorData } = useSelector((state) => state.instructor);
    
  return (
    <div className="p-6">
      <TopCoursesChart data={instructorData?.topCourses} />
    </div>
  );
}

export default TopCourses