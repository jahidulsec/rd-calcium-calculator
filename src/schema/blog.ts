import z from "zod";

export const BlogSchema = z.object({
  en_title: z
    .string("Enter an english title of Blog")
    .min(2, "At least 2 characters"),

  bn_title: z
    .string("Enter a bangla title of Blog")
    .min(2, "At least 2 characters"),

  en_description: z
    .string("Enter an english description of Blog")
    .min(2, "At least 2 characters"),
  bn_description: z
    .string("Enter a bangla description of Blog")
    .min(2, "At least 2 characters"),

  en_details: z
    .string("Enter an english details of Blog")
    .min(2, "At least 2 characters"),
  bn_details: z
    .string("Enter a bangla details of Blog")
    .min(2, "At least 2 characters"),
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 1 * 1024 * 1024 && file.type.startsWith("image/"),
      "Image must be under 1MB and must be an image"
    )
    .optional(),
});

export type BlogSchemaType = z.infer<typeof BlogSchema>;
