import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { createReview, getAverageRating } from "@/redux/slices/reviewSlice";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import toast from "react-hot-toast";
import { Star } from "lucide-react";
import reviewSchema from "@/schemas/reviewSchema";

const ReviewForm = ({ courseId }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);

  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      review: "",
      rating: 0,
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        rating: rating,
        review: data.review,
      };
      await dispatch(createReview({ courseId, data: payload }))
        .unwrap()
        .then(() => {
          toast.success("Review submitted successfully");
          form.reset();
          setRating(0);
          dispatch(getAverageRating(courseId))
        }).catch((error) => {
          toast.error("Failed to submit review");
          console.log(error)
        });
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit review");
    }
  };

  const handleStarClick = (value) => {
    setRating(value);
    form.setValue("rating", value);
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          onClick={() => handleStarClick(i)}
          className={`cursor-pointer text-lg sm:text-2xl ${
            i <= rating
              ? "text-yellow-400 fill-yellow-500 stroke-yellow-500"
              : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-lg mx-auto mt-6"
      >
        <FormField
          control={form.control}
          name="rating"
          render={() => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">Rating</FormLabel>
              <FormControl>
                <div className="flex space-x-1">{renderStars()}</div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base">Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your review..."
                  rows={4}
                  className="text-sm sm:text-base"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full text-sm sm:text-base">
          Submit Review
        </Button>
      </form>
    </Form>
  );
};

export default ReviewForm;
