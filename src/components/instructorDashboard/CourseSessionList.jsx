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

const CourseSessionList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
    const { sessions } = useSelector((state) => state.session);
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
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>{course?.title} Sessions</CardTitle>
          <CardDescription>
            Manage {course?.title} Sessions.
          </CardDescription>
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
      <CardContent>
        <div className="flex flex-col gap-4">
          {sessions.map((session) => (
            <Accordion key={session.id} type="single" collapsible>
              <AccordionItem value={session.id}>
                <AccordionTrigger>{session.title}</AccordionTrigger>
                <AccordionContent>
                  {session.lectures && session.lectures.length > 0 ? (
                    <ul className="list-disc pl-4">
                      {session.lectures.map((lecture) => (
                        <li key={lecture.id}>{lecture.title}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No lectures available for this session.</p>
                  )}
                  <div className="flex justify-end gap-2 mt-4">
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
      </CardContent>
    </Card>
  );
};

export default CourseSessionList;
