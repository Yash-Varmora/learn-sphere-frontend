
import React from 'react'
import { useSelector } from 'react-redux'
import OverviewCard from './OverviewCard';

const InstructorOverview = () => {

    
    const { instructorData } = useSelector(state => state.instructor)
    
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 p-6">
      <OverviewCard title="Total Courses" value={instructorData?.totalCourses} />
      <OverviewCard title="Total Enrollments" value={instructorData?.totalEnrollments} />
      <OverviewCard title="Avg Rating" value={instructorData?.averageRating} />
    </div>
  );
}

export default InstructorOverview