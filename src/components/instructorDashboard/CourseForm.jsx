import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCourseSchema } from "@/schemas";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import {
  createCourse,
  getCourseById,
  updateCourse,
} from "@/redux/slices/courseSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useTransition } from "react";
import { toast } from "react-hot-toast";

const CourseForm = ({ mode }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
    },
  });

  useEffect(() => {
    if (mode === "edit" && id) {
      dispatch(getCourseById(id))
        .unwrap()
        .then((course) => {
          form.setValue("title", course.title);
          form.setValue("description", course.description);
          form.setValue("category", course.category);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [id, mode, dispatch, form]);

  const onSubmit = (data) => {
    startTransition(async () => {
      try {
        if (mode === "edit" && id) {
          await dispatch(updateCourse({ id, ...data }))
            .unwrap()
            .then(() => {
              toast.success("Course updated successfully");
              navigate("/instructor/dashboard");
            })
            .catch((error) => {
              toast.error(error.message);
            });
        } else {
          await dispatch(createCourse(data))
            .unwrap()
            .then(() => {
              toast.success("Course created successfully");
              navigate("/instructor/dashboard");
            })
            .catch((error) => {
              toast.error("Course creation failed");
              console.log(error);
            });
        }
      } catch (error) {
        toast.error("Course creation failed");
        console.log(error);
      }
    });
  };


  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader className="flex flex-col items-center justify-between">
        <CardTitle className="text-2xl font-bold">
          {mode === "edit" ? "Edit Course" : "Create Course"}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {mode === "edit"
            ? "Edit the course details"
            : "Create a new course to start teaching"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={isPending}
                        {...field}
                        placeholder="Enter course title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isPending}
                        {...field}
                        placeholder="Enter course description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={isPending}
                        {...field}
                        placeholder="Enter course category"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isPending}
                className="w-full mt-4"
              >
                {mode === "edit" ? (
                  <>
                    {isPending ? "Updating..." : "Update Course"}
                  </>
                ) : (
                  <>
                    {isPending ? "Creating..." : "Create Course"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CourseForm;
