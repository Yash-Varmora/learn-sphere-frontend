import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "@/redux/slices/reviewSlice";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h3 className="text-3xl font-semibold text-center mb-6">
        Course Reviews
      </h3>

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Card
            key={review.id}
            className="mb-6 shadow-md rounded-2xl border border-gray-200"
          >
            <CardHeader className="bg-gray-100 p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">
                    {review.user?.name || "Anonymous"}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    {format(new Date(review.createdAt), "PPP")}
                  </p>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <p className="ml-1 text-sm text-gray-700">
                    {review.rating} / 5
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-sm text-gray-800">{review.review}</p>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center text-gray-500 text-sm">
          No reviews yet for this course.
        </p>
      )}
    </div>
  );
};

export default ReviewList;
