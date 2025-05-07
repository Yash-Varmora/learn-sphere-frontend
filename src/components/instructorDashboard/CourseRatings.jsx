import React from 'react'
import { useSelector } from 'react-redux';
import CourseRatingChart from './CourseRatingChart';

const CourseRatings = () => {
const { instructorData } = useSelector((state) => state.instructor);

  return (
    <div className="p-6">
      <CourseRatingChart data={instructorData?.courseRatings} />
    </div>
  );
}

export default CourseRatings