import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPlayingUrl,
  markLectureAsCompleted,
} from "@/redux/slices/lectureSlice";
import toast from "react-hot-toast";

const LectureCard = ({
  title,
  description,
  lectureUrl,
  isPreview,
  lectureId,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const { currentPlayingLecture, completedLectures } = useSelector(
    (state) => state.lecture
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const isPlaying = currentPlayingLecture.lectureUrl === lectureUrl && currentPlayingLecture.lectureId === lectureId;
  
  const isCompleted = completedLectures.some(
    (completedLecture) => completedLecture.lectureId === lectureId
  );

  const handlePlay = () => {
    if (!isPlaying) {
      dispatch(setCurrentPlayingUrl({ lectureUrl, lectureId }));
    }
  };

  const handleMarkAsCompleted = () => {
    dispatch(markLectureAsCompleted(lectureId))
      .unwrap()
      .then(() => {
        toast.success("Lecture marked as completed");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full mt-4 border rounded-lg"
    >
      <AccordionItem
        value={`lecture-${lectureId}`}
        className={`border-b ${isCompleted ? "bg-green-50" : ""}`}
      >
        <AccordionTrigger className="px-4 py-3 flex items-center justify-between text-left">
          <div className="flex w-full items-center">
            <span className="font-semibold text-base flex-1">{title}</span>

            {isPreview && (
              <span className="text-base font-medium text-blue-500 mr-4">
                Preview
              </span>
            )}

            {isCompleted && (
              <span className="text-green-600 text-base font-medium px-2 py-0.5">
                Completed
              </span>
            )}
          </div>
        </AccordionTrigger>

        {isPreview ||( user && course.enrollments?.some((e) => e.userId === user.id)) ? (
          <AccordionContent className="p-4 space-y-4">
            {lectureUrl && (
              <div className="rounded-md overflow-hidden">
                <ReactPlayer
                  url={lectureUrl}
                  playing={isPlaying}
                  controls
                  width="100%"
                  height="360px"
                  onPlay={handlePlay}
                  className="rounded-md"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="link"
                    size="sm"
                    className="px-0 text-blue-600 hover:underline"
                  >
                    View Description
                  </Button>
                </DialogTrigger>
                <DialogContent className="custom-scrollbar overflow-auto h-[85vh] w-full sm:max-w-3xl">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                      {title} Description
                    </DialogTitle>
                  </DialogHeader>
                  <div
                    className="text-sm text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </DialogContent>
              </Dialog>

              {!isCompleted && (
                <Button
                  variant="success"
                  size="sm"
                  onClick={handleMarkAsCompleted}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  Mark as Completed
                </Button>
              )}
            </div>
          </AccordionContent>
        ) : (
          <AccordionContent className="p-4">
            <p className="text-sm text-gray-500">
              Enroll in this course to access the lecture. Preview is not
              available.
            </p>
          </AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default LectureCard;
