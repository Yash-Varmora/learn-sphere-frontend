import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CourseCard = ({ enrollment }) => {
  const navigate = useNavigate();
  const { course } = enrollment;

  const completed =
    useSelector((state) => state.session.completedSessions[course?.id]) || [];

  const isCompleted = completed?.length === course?.sessions.length;
  const progress = (completed.length / (course?.sessions.length || 1)) * 100;

  return (
    <Card
      className={`w-full flex flex-col justify-between transition duration-300 shadow-sm border ${
        isCompleted ? "bg-green-50 border-green-200" : "bg-white"
      }`}
    >
      <div>
        <CardHeader className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2">
            <CardTitle className="text-base sm:text-lg md:text-xl font-semibold break-words max-w-full sm:max-w-[70%] text-gray-800">
              {course?.title}
            </CardTitle>
            <Badge
              variant="outline"
              className={`text-xs sm:text-sm px-2 py-1 ${
                isCompleted
                  ? "bg-green-100 text-green-700 border-green-300"
                  : "bg-gray-100 text-gray-600 border-gray-300"
              }`}
            >
              {isCompleted ? "Completed" : "In Progress"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-xs sm:text-sm text-gray-600">
            Sessions Completed: {completed.length}/{course?.sessions.length}
          </p>
          <Progress value={progress} />
          <p className="text-xs text-muted-foreground">
            {progress.toFixed(0)}% completed
          </p>
        </CardContent>
      </div>
      <div className="flex flex-col p-4 pt-2 gap-2">
        <Button
          className={`w-full text-sm sm:text-base ${
            isCompleted
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
          onClick={() => navigate(`/courses/${course?.id}`)}
        >
          {isCompleted ? "Review Course" : "Continue Course"}
        </Button>
        {isCompleted && (
          <Button
            variant="outline"
            className="w-full text-sm sm:text-base border-green-400 text-green-700 hover:bg-green-100"
          >
            View Certificate
          </Button>
        )}
      </div>
    </Card>
  );
};

export default CourseCard;
