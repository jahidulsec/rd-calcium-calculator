import z from "zod";

export const FoodSchema = z.object({
  en_name: z
    .string()
    .min(2, "At least 2 characters")
    .describe("Enter an english title of food"),

  bn_name: z
    .string()
    .min(2, "At least 2 characters")
    .describe("Enter a bangla title of food"),

  category: z.array(z.string()).nonempty("Select at least one option"),

  calcium_mg: z.number().min(0, "Enter calcium value (mg)"),

  unit: z.string().min(2, "At least 2 characters"),

  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 1 * 1024 * 1024 && file.type.startsWith("image/"),
      "Image must be under 1MB and must be an image"
    )
    .optional(),
});

export type FoodSchemaType = z.infer<typeof FoodSchema>;
