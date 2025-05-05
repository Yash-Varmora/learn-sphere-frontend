import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CourseCard from "./CourseCard";
import { getEnrollmentByUserId } from "@/redux/slices/enrollmentSlice";
import { completedSession } from "@/redux/slices/sessionSlice";

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { enrollments } = useSelector((state) => state.enrollment);
  const { completedSessions } = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(getEnrollmentByUserId(user.id));
  }, [dispatch, user.id]);

  useEffect(() => {
    if (enrollments?.length > 0) {
      enrollments.forEach((enrollment) => {
        const courseId = enrollment.course.id;
        if (!completedSessions[courseId]) {
          dispatch(completedSession(courseId))
        }
      });
    }
  }, [dispatch, enrollments, completedSessions]);


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Card className="w-full bg-muted">
        <CardHeader>
          <CardTitle className="text-center text-xl md:text-2xl lg:text-3xl">
            Total Enrolled Courses
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-4xl font-bold text-primary">
          {enrollments?.length || 0}
        </CardContent>
      </Card>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {enrollments.map((enrollment) => (
          <CourseCard key={enrollment.id} enrollment={enrollment} />
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
