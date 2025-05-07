import React,{useEffect} from 'react'
import InstructorOverview from './InstructorOverview'
import { useDispatch, useSelector } from 'react-redux';
import { getInstructorOverview } from '@/redux/slices/instructorSlice';
import InstructorTrends from './InstructorTrends';
import TopCourses from './TopCourses';
import CourseRatings from './CourseRatings';

const InstructorDashboard = () => {

  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.instructor)

  useEffect(() => {
        dispatch(getInstructorOverview())
  }, [dispatch])
  
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
      <div className="p-6 space-y-6">
      <InstructorOverview />
      <InstructorTrends />
      <TopCourses />
      <CourseRatings />
     </div>
  )
}

export default InstructorDashboard