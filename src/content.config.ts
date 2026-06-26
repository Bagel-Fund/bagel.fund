import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

// the file loader needs a unique id per entry, but grantee names collide
// (two Yashes), so we mint one from the array index
const grantees = defineCollection({
  loader: file("src/data/grantees.json", {
    parser: (text) =>
      JSON.parse(text).map((grantee: unknown, index: number) => ({
        id: String(index),
        ...(grantee as Record<string, unknown>),
      })),
  }),
  schema: z.object({
    name: z.string(),
    link: z.string().url().nullable(),
    age: z.number(),
    projectDescription: z.string(),
    fundedDate: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { grantees };
