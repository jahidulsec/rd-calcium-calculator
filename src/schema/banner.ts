import z from "zod";

export const BannerSchema = z.object({
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 1 * 1024 * 1024 && file.type.startsWith("image/"),
      "Image must be under 1MB and must be an image"
    ),
});

export type BannerSchemaType = z.infer<typeof BannerSchema>;
