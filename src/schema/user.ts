import z from "zod";

export const UserSchema = z.object({
  userId: z.string().optional(),
  fullName: z
    .string({ message: "Enter your full name" })
    .min(3, "At least 3 characters"),
  gender: z.enum(["MALE", "FEMALE"], "Select a option"),
  age: z.enum(
    ["TODDLER", "CHILD", "TEENAGER", "ADULT", "OLD"],
    "Select a option"
  ),
  district: z
    .string({ message: "Enter your district" })
    .min(3, "At least 3 characters"),
});
export const UpdateUserSchema = UserSchema.omit({})
  .partial()
  .extend({
    image: z
      .instanceof(File)
      .refine(
        (file) => file.size <= 1024 * 1024 && file.type.startsWith("image/"),
        "Image must be under 1MB"
      ).optional(),
  });

export type UserFormType = z.infer<typeof UserSchema>;
export type UpdateUserFormType = z.infer<typeof UpdateUserSchema>;
