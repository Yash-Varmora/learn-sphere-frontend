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
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-bold text-center">
          Manage Courses
        </CardTitle>
        <CardTitle className="text-xl font-bold text-center text-gray-500">
          Total Courses: <span className="text-black">{courses.length}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <Card className="w-full relative" key={course.id}>
              <DropdownMenu>
                <DropdownMenuTrigger className="absolute top-4 right-4">
                  <MoreVertical className="w-5 h-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
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
              <CardHeader className="flex justify-center items-center ">
                <CardTitle className="text-2xl font-bold text-center">
                  {course.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>{course.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseList;
