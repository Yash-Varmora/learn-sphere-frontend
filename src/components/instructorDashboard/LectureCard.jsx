import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Button } from "../ui/button";
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setCurrentPlayingUrl } from "@/redux/slices/lectureSlice";
import TextEditor from "../editor/TextEditor";
import { deleteLecture } from "@/redux/slices/sessionSlice";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

const LectureCard = ({
  title,
  description,
  lectureUrl,
  isPreview,
  courseId,
  sessionId,
  lectureId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPlayingLecture } = useSelector((state) => state.lecture);
  const [dialogOpen, setDialogOpen] = useState(false);

  const isPlaying =
    currentPlayingLecture.lectureUrl === lectureUrl &&
    currentPlayingLecture.lectureId === lectureId;
  const handlePlay = () => {
    if (!isPlaying) {
      dispatch(setCurrentPlayingUrl({ lectureUrl, lectureId }));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteLecture(id))
      .unwrap()
      .then(() => {
        toast.success("Lecture deleted successfully");
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
      <AccordionItem value="lecture" className="border-b">
        <AccordionTrigger className="px-4 py-3 flex justify-between text-left">
          <div className="font-semibold">{title}</div>
          <span className="text-sm text-gray-500">
            {isPreview ? "Preview Available" : "Preview Unavailable"}
          </span>
        </AccordionTrigger>
        <AccordionContent className="p-4 space-y-4">
          {lectureUrl && (
            <ReactPlayer
              url={lectureUrl}
              playing={isPlaying}
              controls
              width="100%"
              height="400px"
              onPlay={handlePlay}
              className="rounded-md"
            />
          )}

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="link" size="sm" className="px-0 text-blue-600">
                View Description
              </Button>
            </DialogTrigger>
            <DialogContent className="custom-scrollbar overflow-auto h-[85vh] w-[100vw] sm:max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">
                  {title} Description
                </DialogTitle>
              </DialogHeader>
              <TextEditor content={description} editable={false} />
            </DialogContent>
          </Dialog>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              onClick={() =>
                navigate(
                  `/instructor/course/${courseId}/sessions/${sessionId}/edit-lecture/${lectureId}`
                )
              }
            >
              Edit
            </Button>
            <ConfirmDeleteDialog
              onConfirm={() => handleDelete(lectureId)}
              triggerText="Delete"
              title="Delete this lecture?"
              description="This will permanently remove the lecture."
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default LectureCard;
