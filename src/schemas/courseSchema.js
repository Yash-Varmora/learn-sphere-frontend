import * as z from "zod";

export const createCourseSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    description: z.string().min(1, {
        message: "Description is required"
    }),
    category: z.string().min(1, {
        message: "Category is required"
    })
});
