import * as z from "zod";

const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5")
    .int("Rating must be an integer"),
  review: z.string().min(10, "Review must be at least 10 characters"),
});

export default reviewSchema;