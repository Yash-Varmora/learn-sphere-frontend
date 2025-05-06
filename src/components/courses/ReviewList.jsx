import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "@/redux/slices/reviewSlice";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { format } from "date-fns";

const ReviewList = ({ courseId }) => {
  const dispatch = useDispatch();
  const { reviews, loading } = useSelector((state) => state.reviews);

  useEffect(() => {
    if (courseId) {
      dispatch(getReviews(courseId));
    }
  }, [courseId, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 text-muted-foreground">
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="w-full mx-auto mt-10 px-4">
      <h3 className="text-3xl font-semibold text-center mb-6">
        Course Reviews
      </h3>

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="w-full max-w-xl shadow-md rounded-xl border border-gray-200 mx-auto"
            >
              <CardHeader className="bg-gray-100 p-3 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      {review.user?.name}
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      {format(new Date(review.createdAt), "PPP")}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-500 stroke-yellow-500" />
                    <p className="ml-1 text-sm text-gray-700">
                      {review.rating} / 5
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-gray-800">{review.review}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-sm">
          No reviews yet for this course.
        </p>
      )}
    </div>
  );
};

export default ReviewList;
