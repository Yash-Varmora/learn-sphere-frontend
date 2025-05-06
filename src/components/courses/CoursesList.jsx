import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CourseCard from "./CourseCard";
import { useLocation } from "react-router-dom";

const CoursesList = () => {
  const { courses, loading, categories } = useSelector((state) => state.course);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const categoryId = query.get("categoryId");

   const selectedCategory = categoryId
     ? categories.find((cat) => cat.id.toString() === categoryId)
     : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {selectedCategory
            ? `${selectedCategory.name} Courses`
            : "All Courses"}
        </CardTitle>
        {selectedCategory && (
          <p className="text-muted-foreground text-center">
            Browse our selection of {selectedCategory.name.toLowerCase()}{" "}
            courses
          </p>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p>
              loading...
            </p>
          </div>
        ) : courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl font-medium">No courses found</p>
            <p className="text-muted-foreground mt-2">
              {selectedCategory
                ? `There are no courses available in the ${selectedCategory.name} category.`
                : "There are no courses available at the moment."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default CoursesList;
