import React from "react";
import CoursesList from "../components/courses/CoursesList";
import Paginate from "../components/courses/Paginate";
import Categories from "@/components/courses/Categories";

const Courses = () => {
  return (
    <div className="flex flex-col gap-4  mx-4 mb-4">
      <Categories />
      <CoursesList />
      <Paginate />
    </div>
  );
};

export default Courses;
