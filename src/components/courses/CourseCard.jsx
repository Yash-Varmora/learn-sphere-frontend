import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

const CourseCard = ({ course }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {course.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <CardDescription>{course.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button>View Course</Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
