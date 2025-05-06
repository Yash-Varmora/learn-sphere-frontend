  import React, { useEffect } from "react";
  import { Button } from "../ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../ui/card";
  import { useNavigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { getAverageRating } from "@/redux/slices/reviewSlice";
  import { Star } from "lucide-react";

  const CourseCard = ({ course }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { averageRatings } = useSelector((state) => state.reviews);

    const avgRating = averageRatings[course?.id] || 0;

    const handleViewCourse = (id) => {
      navigate(`/courses/${id}`);
    };

    useEffect(() => {
      if (averageRatings[course.id] === undefined) {
        dispatch(getAverageRating(course.id));
      }
    }, [dispatch, course.id, averageRatings]);

    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {course.title}
          </CardTitle>
          <CardDescription className="text- sm font-semibold text-center">
            by <span>{course.instructor.user.name}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-2">
          <CardDescription>{course.description}</CardDescription>
          <div className="flex items-center justify-center text-yellow-500">
            <Star className="w-4 h-4 fill-yellow-500 stroke-yellow-500 mr-1" />
            <span className="text-sm text-gray-600">{avgRating.toFixed(1)}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button type="button" onClick={() => handleViewCourse(course.id)}>
            View Course
          </Button>
        </CardFooter>
      </Card>
    );
  };

  export default CourseCard;
