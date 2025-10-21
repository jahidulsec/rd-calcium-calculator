import z from "zod";

export const BlogSchema = z.object({
  en_title: z
    .string()
    .min(2, "At least 2 characters")
    .describe("Enter an english title of Blog"),

  bn_title: z
    .string()
    .min(2, "At least 2 characters")
    .describe("Enter a bangla title of Blog"),

  en_description: z
    .string()
    .min(2, "At least 2 characters")
    .describe("Enter an english description of Blog"),

  bn_description: z
    .string()
    .min(2, "At least 2 characters")
    .describe("Enter a bangla description of Blog"),

  en_details: z
    .string()
    .min(2, "At least 2 characters")
    .describe("Enter an english details of Blog"),

  bn_details: z
    .string()
    .min(2, "At least 2 characters")
    .describe("Enter a bangla details of Blog"),

  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 1 * 1024 * 1024 && file.type.startsWith("image/"),
      "Image must be under 1MB and must be an image"
    )
    .optional(),
});

export type BlogSchemaType = z.infer<typeof BlogSchema>;
