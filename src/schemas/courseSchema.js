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
    }),
    customCategory: z.string().optional(),
}).refine((data) => {
    if (data.category === "other") {
        return !!data.customCategory?.trim()
    }
    return true
}, {
    message: "Custom category is required",
    path: ["customCategory"],
})
