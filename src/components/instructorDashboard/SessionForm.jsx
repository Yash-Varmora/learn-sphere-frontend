import {
  createSession,
  getSessionById,
  updateSession,
} from "@/redux/slices/sessionSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { sessionSchema } from "@/schemas/sessionSchema";
import { getCourseById } from "@/redux/slices/courseSlice";

const SessionForm = ({ mode }) => {
  const { courseId, sessionId } = useParams();
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      title: "",
      sessionOrder: 0,
    },
  });

  useEffect(() => {
    if (courseId) {
      dispatch(getCourseById(courseId));
    }
    if (mode === "edit" && courseId && sessionId) {
      dispatch(getSessionById(sessionId))
        .unwrap()
        .then((session) => {
          form.setValue("title", session.title);
          form.setValue("sessionOrder", session.sessionOrder);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [courseId, sessionId, mode, dispatch, form]);

  const onSubmit = (data) => {
    startTransition(async () => {
      try {
        if (mode === "edit" && courseId && sessionId) {
          await dispatch(updateSession({ courseId, sessionId, data }))
            .unwrap()
            .then(() => {
              toast.success("Session updated successfully");
              navigate(`/instructor/course/${courseId}/sessions`);
            })
            .catch((error) => {
              toast.error(error.message);
              console.log(error);
            });
        } else {
          await dispatch(createSession({ courseId, data }))
            .unwrap()
            .then((session) => {
              toast.success("Session created successfully");
              navigate(`/instructor/course/${courseId}/sessions/${session.id}/add-lecture`)
            })
            .catch((error) => {
              toast.error("Session creation failed");
              console.log(error);
            });
        }
        
      } catch (error) {
        toast.error("Session creation failed");
        console.log(error);
      }
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader className="flex flex-col items-center justify-between">
        <CardTitle className="text-2xl font-bold">
          {mode === "edit" ? "Edit Session" : "Create Session"}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {mode === "edit"
            ? `Edit the ${course?.title} course session`
            : `Create a new session for the ${course?.title} course`}
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
                        placeholder="Enter session title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sessionOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Order</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={isPending}
                        {...field}
                        placeholder="Enter session order"
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
                  <>{isPending ? "Updating..." : "Update Session"}</>
                ) : (
                  <>{isPending ? "Creating..." : "Create Session"}</>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SessionForm;
