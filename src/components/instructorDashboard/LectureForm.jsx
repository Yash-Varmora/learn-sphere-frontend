import {
  createLecture,
  getLectureById,
  updateLecture,
} from "@/redux/slices/lectureSlice";
import { getSessionById } from "@/redux/slices/sessionSlice";
import { lectureSchema } from "@/schemas/lectureSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import TextEditor from "../editor/TextEditor";

const LectureForm = ({ mode }) => {
  const { courseId, sessionId, lectureId } = useParams();
  const dispatch = useDispatch();
  const { currentSession: session } = useSelector((state) => state.session);
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(lectureSchema),
    defaultValues: {
      title: "",
      lectureOrder: 0,
      lectureUrl: "",
      description: "",
      isPreview: false,
    },
  });

  const lectureUrl = form.watch("lectureUrl");

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (sessionId) {
      dispatch(getSessionById(sessionId));
    }
    if (mode === "edit" && sessionId && lectureId) {
      dispatch(getLectureById(lectureId))
        .unwrap()
        .then((lecture) => {
          form.setValue("title", lecture.title);
          form.setValue("description", lecture.description);
          form.setValue("lectureOrder", lecture.lectureOrder);
          form.setValue("lectureUrl", lecture.lectureUrl);
          form.setValue("isPreview", lecture.isPreview);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [sessionId, lectureId, mode, dispatch, form]);

  const onSubmit = async (data) => {
    startTransition(async () => {
      try {
        if (mode === "edit" && sessionId && lectureId) {
          await dispatch(updateLecture({ sessionId, lectureId, data }))
            .unwrap()
            .then(() => {
              toast.success("Lecture updated successfully");
            })
            .catch((error) => {
              toast.error(error.message);
              console.log(error);
            });
        } else {
          await dispatch(createLecture({ sessionId, data }))
            .unwrap()
            .then(() => {
              toast.success("Lecture created successfully");
            })
            .catch((error) => {
              toast.error(error.message);
            });
        }
        navigate(`/instructor/course/${courseId}/sessions`);
      } catch (error) {
        toast.error(error.message);
      }
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto mt-10">
      <CardHeader className="flex flex-col items-center justify-between">
        <CardTitle className="text-2xl font-bold">
          {mode === "edit" ? "Edit Lecture" : "Create Lecture"}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {mode === "edit"
            ? `Edit the ${session?.title} session Lecture`
            : `Add a new Lecture for the ${session?.title} session`}
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                        placeholder="Enter lecture title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lectureOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lecture Order</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={isPending}
                        {...field}
                        placeholder="Enter lecture order"
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
                    <FormControl >
                      <TextEditor
                        content={field.value}
                        onChange={field.onChange}
                        disabled={!isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lectureUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video URL</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        disabled={isPending}
                        {...field}
                        placeholder="Enter video URL"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {lectureUrl && isValidUrl(lectureUrl) && (
                <div className="mt-4">
                  <p className="text-sm mb-2 text-muted-foreground">
                    Video Preview:
                  </p>
                  <div className="rounded overflow-hidden border border-gray-300">
                    <ReactPlayer
                      url={lectureUrl}
                      controls
                      width="100%"
                      height="350px"
                    />
                  </div>
                </div>
              )}
              <FormField
                control={form.control}
                name="isPreview"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-1">
                    <FormLabel>Is Preview:</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                        disabled={isPending}
                        className="h-4 w-4 border-gray-300 rounded"
                      />
                    </FormControl>
                    <FormDescription>
                      Allow users to preview this lecture without enrolling in
                      the course.
                    </FormDescription>

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
                  <>{isPending ? "Updating..." : "Update Lecture"}</>
                ) : (
                  <>{isPending ? "Creating..." : "Create Lecture"}</>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LectureForm;
