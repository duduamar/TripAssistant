import { defineCollection, z } from 'astro:content';

const trips = defineCollection({
  type: 'content',
  schema: z.object({
    trip_dates: z.string().optional(),
    start_location: z.string().optional(),
    end_location: z.string().optional()
  })
});

export const collections = {
  trips
};
