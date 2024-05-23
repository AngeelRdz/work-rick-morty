import { date, z } from 'zod';

export const favoriteSchema = z.object({
    name: z.string({
        required_error: "Name is required",
    }),
    image: z.string({
        required_error: "Imagen is required",
    }),
    status: z.string({
        required_error: "Status is required",
    }),
    date: z.string().datetime().optional(),
});
