import React, { useEffect } from "react";
import { getCourseById } from "@/redux/slices/courseSlice";
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
import { Star, Users } from "lucide-react";
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
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { format } from "date-fns";
import { getAverageRating } from "@/redux/slices/reviewSlice";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { course, loading } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth);
  const { sessions } = useSelector((state) => state.session);
  const { reviews, averageRatings } = useSelector((state) => state.reviews);
  const { completedLectures } = useSelector((state) => state.lecture);
  const completed =
    useSelector((state) => state.session.completedSessions[course?.id]) || [];

  useEffect(() => {
    if (id) {
      dispatch(getCourseById(id));
      dispatch(getSessionsByCourse(id));
      dispatch(getCompletedLectures());
      dispatch(getAverageRating(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (course?.id) {
      dispatch(completedSession(course.id));
    }
  }, [course?.id, dispatch, completedLectures]);

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

  const userReview =
    user && reviews.find((review) => review.user?.id === user.id);

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`text-2xl ${
            i <= rating
              ? "text-yellow-400 fill-yellow-500 stroke-yellow-500"
              : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  const avgRating = averageRatings[course?.id] || 0;

  if (loading) {
    return <div className="text-center text-gray-500 py-6">Loading...</div>;
  }

  return (
    <Card className="max-w-6xl mx-auto mt-10 p-6 shadow-xl rounded-2xl">
      <CardHeader className="flex flex-col items-center space-y-4 bg-gray-600 rounded-2xl p-8">
        <CardTitle className="text-5  xl font-bold text-white">
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
        <CardDescription className="bg-amber-200 text-md flex items-center justify-center gap-2 p-2 rounded-lg shadow-md">
          <Star className="text-yellow-500 fill-yellow-500 stroke-yellow-500" />
          <span className="text-lg text-gray-500">
            {avgRating.toFixed(1)} / 5
          </span>
        </CardDescription>

        <CardDescription className="text-md text-gray-700 w-auto max-w-xs bg-gray-50 rounded-lg border p-4 flex flex-col items-center gap-2">
          <Users className="inline w-6 h-6 text-primary" />
          <p className="font-medium text-center">
            {course?.enrollments?.length}
            {course?.enrollments?.length === 1 ? "Student" : "Students"}
            Enrolled
          </p>
        </CardDescription>
        {user ? (
          user?.id !== course?.instructor?.userId ? (
            course?.enrollments?.some(
              (enrollment) => enrollment.userId === user.id
            ) ? (
              <Button
                type="button"
                variant="secondary"
                disabled
                className="mt-4 text-sm px-6 py-2"
              >
                Enrolled
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleEnrollNow}
                className="mt-4 text-sm px-6 py-2 hover:bg-primary focus:ring-2 focus:ring-primary"
              >
                Enroll Now
              </Button>
            )
          ) : (
            <p className="mt-4 p-4 bg-gray-800 text-white border-2 border-gray-900 rounded-2xl shadow-md text-center font-semibold">
              You are the instructor
            </p>
          )
        ) : (
          <Button
            type="button"
            className="mt-4 text-sm px-6 py-2 hover:bg-primary focus:ring-2 focus:ring-primary"
            onClick={() => navigate("/login", { state: { from: location } })}
          >
            Login to Enroll
          </Button>
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <CardTitle className="text-2xl font-bold text-center">
          Course Sessions
        </CardTitle>
        <div className="flex flex-col gap-6">
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
                      <span className="text-lg font-medium text-gray-800">
                        {session.title}
                      </span>
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
            <p className="text-center text-gray-600">
              No sessions available for this course.
            </p>
          )}
        </div>

        {isCourseCompleted &&
          user &&
          course?.enrollments?.some(
            (enrollment) => enrollment.userId === user.id
          ) && (
            <Button
              type="button"
              className="mt-6 text-sm px-6 py-2 hover:bg-primary focus:ring-2 focus:ring-primary"
            >
              View Certificate
            </Button>
          )}

        {user &&
          course?.enrollments?.some((e) => e.userId === user.id) &&
          isCourseCompleted && (
            <div className="mt-10 w-sm mx-auto">
              <h3 className="text-2xl font-bold text-center mb-4">
                {userReview ? "Your Review" : "Leave a Review"}
              </h3>
              {userReview ? (
                <Card className="text-center space-y-2">
                  <CardHeader className="space-y-2">
                    <div>
                      <CardTitle className="text-sm font-bold text-gray-700">
                        Rating
                      </CardTitle>
                      <CardDescription className="flex justify-center space-x-1 mt-1">
                        {renderStars(userReview.rating)}
                      </CardDescription>
                    </div>
                    <div>
                      <CardTitle className="text-sm font-medium text-gray-700">
                        Date
                      </CardTitle>
                      <CardDescription className="mt-1 text-sm text-gray-500">
                        {format(new Date(userReview.createdAt), "PPP")}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-sm font-medium text-gray-700">
                      Review
                    </CardTitle>
                    <CardDescription className="mt-1 rounded-md text-md text-gray-800">
                      {userReview.review}
                    </CardDescription>
                  </CardContent>
                </Card>
              ) : (
                <ReviewForm courseId={id} />
              )}
            </div>
          )}

        <ReviewList courseId={id} />
      </CardContent>
    </Card>
  );
};

export default CourseDetail;
