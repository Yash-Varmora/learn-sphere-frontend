import React from 'react'
import { useSelector } from 'react-redux'
import EnrollmentTrendsChart from './EnrollmentTrendsChart'

const InstructorTrends = () => {
     const { instructorData } = useSelector(state => state.instructor)
   
  return (
      <div className='p-6'>
          <EnrollmentTrendsChart data={instructorData?.trendData} type='area' />
   </div>
  )
}

export default InstructorTrends