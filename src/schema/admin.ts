import z from "zod";

export const AdminLoginSchema = z.object({
  username: z.string("Enter your username").min(3, "At least 3 Characters"),
  password: z.string("Enter your password").min(6, "At least 6 Characters"),
});

export type AdminLoginSchemaType = z.infer<typeof AdminLoginSchema>;
