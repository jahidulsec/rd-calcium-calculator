import { otpRegex, phoneRegex } from "@/utils/regex";
import z from "zod";

export const LoginSchema = z.object({
  phone: z
    .string({ message: "Enter a valid number" })
    .regex(phoneRegex, "Invalid phone number"),
});

export type LoginFormType = z.infer<typeof LoginSchema>;

export const VerificationSchema = z.object({
  code: z
    .string({ message: "Enter a valid code" })
    .regex(otpRegex, "Invalid verification code"),
});


export type VerificationFormType = z.infer<typeof VerificationSchema>;
