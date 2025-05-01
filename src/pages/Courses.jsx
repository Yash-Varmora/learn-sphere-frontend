import React from 'react'
import CoursesList from '../components/courses/CoursesList'
import Paginate from '../components/courses/Paginate'


const Courses = () => {


  return (
      <div className='flex flex-col gap-4  mx-4 mb-4'>
          <CoursesList />
          <Paginate />
    </div>
  )
}

export default Courses