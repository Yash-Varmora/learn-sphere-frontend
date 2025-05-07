import {
  deleteSession,
  getSessionsByCourse,
} from "@/redux/slices/sessionSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { getCourseById } from "@/redux/slices/courseSlice";
import LectureCard from "./LectureCard";

const CourseSessionList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { sessions,loading } = useSelector((state) => state.session);
  const { course } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getCourseById(courseId));
    dispatch(getSessionsByCourse(courseId));
  }, [courseId, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteSession(id))
      .unwrap()
      .then(() => {
        toast.success("Session deleted successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Card className="w-full mx-auto mt-8 bg-white shadow-md">
      <CardHeader className="flex justify-between md:flex-row flex-col gap-4">
        <div className="flex flex-col">
          <CardTitle className="text-2xl font-bold">
            {course?.title} Sessions
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Manage {course?.title} Sessions.
          </CardDescription>
          {course?.enrollments && (
            <p className="text-sm text-muted-foreground">
              Total Enrolled Students:{" "}
              {Array.isArray(course.enrollments)
                ? course.enrollments.length
                : course.enrollments}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() =>
              navigate(`/instructor/course/${courseId}/add-session`)
            }
          >
            Add Session
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            Loading...
          </div>
        ) : sessions.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No sessions available for this course.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {sessions.map((session) => (
              <Accordion
                key={session.id}
                type="single"
                collapsible
                className="border border-gray-200 rounded-md shadow-sm"
              >
                <AccordionItem
                  value={session.id}
                  className="border-b border-gray-100 last:border-b-0"
                >
                  <AccordionTrigger className="text-lg font-medium px-4 py-3 hover:bg-gray-100 transition-all">
                    {session.title}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-2 bg-gray-50 text-sm text-gray-700">
                    {session.lectures && session.lectures.length > 0 ? (
                      session.lectures.map((lecture) => (
                        <LectureCard
                          key={lecture.id}
                          title={lecture.title}
                          description={lecture.description}
                          lectureUrl={lecture.lectureUrl}
                          isPreview={lecture.isPreview}
                          courseId={courseId}
                          sessionId={lecture.sessionId}
                          lectureId={lecture.id}
                        />
                      ))
                    ) : (
                      <p>No lectures available for this session.</p>
                    )}
                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        onClick={() =>
                          navigate(
                            `/instructor/course/${courseId}/sessions/${session.id}/add-lecture`
                          )
                        }
                      >
                        Add Lecture
                      </Button>
                      <Button
                        onClick={() =>
                          navigate(
                            `/instructor/course/${courseId}/edit-session/${session.id}`
                          )
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(session.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseSessionList;
