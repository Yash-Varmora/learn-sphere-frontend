import { getCourseById } from "@/redux/slices/courseSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Users } from "lucide-react";
import {
  completedSession,
  getSessionsByCourse,
} from "@/redux/slices/sessionSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import LectureCard from "./LectureCard";
import { enrollInCourse } from "@/redux/slices/enrollmentSlice";
import toast from "react-hot-toast";
import { getCompletedLectures } from "@/redux/slices/lectureSlice";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { course, loading } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth);
  const { sessions } = useSelector((state) => state.session);
  const {completedLectures} = useSelector((state)=> state.lecture )
  const completed =
    useSelector((state) => state.session.completedSessions[course?.id]) || [];

  useEffect(() => {
    if (id) {
      dispatch(getCourseById(id));
      dispatch(getSessionsByCourse(id));
      dispatch(getCompletedLectures());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (course?.id) {
      dispatch(completedSession(course.id))
    }
  },[course?.id, dispatch, completedLectures])

  const isCourseCompleted =
    sessions?.length > 0 &&
    sessions.every((session) => completed.includes(session.id));

  const handleEnrollNow = () => {
    try {
      dispatch(enrollInCourse(id))
        .unwrap()
        .then(() => {
          toast.success("Enrolled in course successfully");
          dispatch(getCourseById(id));
          dispatch(getSessionsByCourse(id));
        })
        .catch((error) => {
          console.error("Error enrolling in course:", error);
          toast.error("Failed to enroll in course");
        });
    } catch (error) {
      console.error("Error enrolling in course:", error);
      toast.error("Failed to enroll in course");
    }
  };

  const isSessionCompleted = (id) => completed?.includes(id);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Card className="max-w-6xl mx-auto mt-10 p-6 shadow-xl rounded-2xl">
      <CardHeader className="flex flex-col items-center space-y-4 bg-gray-600 rounded-2xl p-8">
        <CardTitle className="text-5xl font-bold text-white">
          {course?.title}
        </CardTitle>
        <CardDescription className="text-md font-medium text-gray-400">
          Created by{" "}
          <span className="text-white font-bold">
            {course?.instructor?.user?.name}
          </span>
        </CardDescription>
        <CardDescription className="text-md text-gray-200">
          {course?.description}
        </CardDescription>
        <CardDescription className="text-md text-gray-700 w-auto max-w-xs bg-gray-50 rounded-lg border p-4 flex flex-col items-center gap-2">
          <Users className="inline w-6 h-6 text-primary" />
          <p className="font-medium text-center">
            {course?.enrollments?.length}{" "}
            {course?.enrollments?.length === 1 ? "Student" : "Students"}{" "}
            Enrolled
          </p>
        </CardDescription>
        {user ? (
          user && user?.id !== course?.instructor?.userId ? (
            course?.enrollments?.some(
              (enrollment) => enrollment.userId === user.id
            ) ? (
              <Button
                type="button"
                variant="secondary"
                disabled
                className="text-sm px-6 py-2 mx-auto mt-2"
              >
                Enrolled
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleEnrollNow}
                className="text-sm px-6 py-2 mx-auto mt-2 hover:bg-primary focus:ring-2 focus:ring-primary"
              >
                Enroll Now
              </Button>
            )
          ) : (
            <p className="text-white px-6 py-2 mx-auto mt-2">
              You are the instructor
            </p>
          )
        ) : (
          <Button
            type="button"
            className="text-sm px-6 py-2 mx-auto mt-2 hover:bg-primary focus:ring-2 focus:ring-primary"
            onClick={() => navigate("/login", { state: { from: location } })}
          >
            Login to Enroll
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <CardTitle className="text-2xl font-bold text-center">
          Course Sessions
        </CardTitle>
        <div className="flex flex-col gap-4">
          {sessions && sessions.length > 0 ? (
            sessions.map((session) => (
              <Accordion
                key={session.id}
                type="single"
                collapsible
                className="border border-gray-200 rounded-md shadow-sm"
              >
                <AccordionItem
                  value={session.id}
                  className={`border-b border-gray-100 last:border-b-0 ${
                    isSessionCompleted(session.id)
                      ? "bg-green-100 border-green-300"
                      : "bg-white"
                  }`}
                >
                  <AccordionTrigger
                    className={`px-4 py-3 transition-all ${
                      isSessionCompleted(session.id)
                        ? "hover:bg-green-200"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-lg">{session.title}</span>
                      <span className="text-sm text-gray-500">
                        {session.lectures.length}{" "}
                        {session.lectures.length > 1 ? "lectures" : "lecture"}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-2 text-sm text-gray-700">
                    {session?.lectures && session?.lectures.length > 0 ? (
                      session.lectures.map((lecture) => (
                        <LectureCard
                          key={lecture.id}
                          title={lecture.title}
                          description={lecture.description}
                          lectureUrl={lecture.lectureUrl}
                          isPreview={lecture.isPreview}
                          lectureId={lecture.id}
                        />
                      ))
                    ) : (
                      <p>No lectures available for this session.</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))
          ) : (
            <p>No sessions available for this course.</p>
          )}
        </div>
        {isCourseCompleted &&
          user &&
          course?.enrollments?.some(
            (enrollment) => enrollment.userId === user.id
          ) && (
            <Button
              type="button"
              className="text-sm px-6 py-2 mx-auto mt-2 hover:bg-primary focus:ring-2 focus:ring-primary"
            >
              View Certificate
            </Button>
          )}
      </CardContent>
    </Card>
  );
};

export default CourseDetail;
