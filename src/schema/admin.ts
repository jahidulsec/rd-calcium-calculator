import z from "zod";

export const AdminLoginSchema = z.object({
  username: z.string("Enter username").min(3, "At least 3 Characters"),
  password: z.string("Enter password").min(6, "At least 6 Characters"),
});

export const AdminSchema = AdminLoginSchema.extend({
  full_name: z.string("Enter full name").min(3, "At least 3 Characters"),
  role: z.enum(["superadmin", "admin"]).optional(),
});

export type AdminSchemaType = z.infer<typeof AdminSchema>;

export type AdminLoginSchemaType = z.infer<typeof AdminLoginSchema>;
