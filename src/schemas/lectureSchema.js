import * as z from 'zod';

export const lectureSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    lectureOrder: z.coerce.number().int().min(1, {
        message: "Lecture order must be a positive integer"
    }),
    description: z.string().min(1, {
        message: "Description is required"
    }),
    lectureUrl: z.string().min(1, {
        message: "Video URL is required"

    }).url({
        message: "Video URL must be a valid URL"
    }),
    isPreview: z.boolean().optional().default(false),

})