import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CourseCard from "./CourseCard";

const CoursesList = () => {
    const { courses } = useSelector((state) => state.course);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Courses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {courses.map((course) => (
            
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default CoursesList;
