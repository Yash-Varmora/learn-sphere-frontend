import * as z from "zod"

export const sessionSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    sessionOrder: z.coerce.number().int().min(1, {
        message: "Session order must be a positive integer"
    }),
})