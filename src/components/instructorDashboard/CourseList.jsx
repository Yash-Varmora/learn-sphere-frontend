import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import toast from "react-hot-toast";
import { deleteCourse, getInstructorCourses } from "@/redux/slices/courseSlice";
import { useNavigate } from "react-router-dom";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { Button } from "../ui/button";
const CourseList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { courses, error } = useSelector((state) => state.course);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (user) {
        dispatch(getInstructorCourses());
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [dispatch, user]);

  const handleEdit = (id) => {
    navigate(`/instructor/edit-course/${id}`);
  };

  const handleDelete = (id) => {
    try {
      dispatch(deleteCourse(id))
        .unwrap()
        .then(() => {
          toast.success("Course deleted successfully");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (error) {
    toast.error(error);
  }
  return (
    <Card className="flex flex-col w-full bg-white p-4">
      <CardHeader className="flex flex-col md:flex-row justify-between items-center gap-4">
        <CardTitle className="text-2xl font-bold">
          Manage Courses
        </CardTitle>
        <CardTitle className="text-xl font-bold text-gray-500">
          Total Courses: <span className="text-black">{courses.length}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card className="p-4 relative shadow-md" key={course.id}>
              <DropdownMenu>
                <DropdownMenuTrigger className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer">
                  <MoreVertical className="w-5 h-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuItem onClick={() => handleEdit(course.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(course.id)}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  {course.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-md text-gray-600 text-center">{course.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex flex-wrap justify-center  gap-4 mt-auto">
                <Button
                  onClick={() =>
                    navigate(`/instructor/course/${course.id}/add-session`)
                  }
                >
                  Add Session
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    navigate(`/instructor/course/${course.id}/sessions`)
                  }
                >
                  View Sessions
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseList;
