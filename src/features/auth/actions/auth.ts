"use server";

import { createSession } from "@/lib/session";
import { LoginFormType, VerificationFormType } from "@/schema/auth";

export const login = async (data: LoginFormType) => {
  console.log(data);

  try {
    return {
      success: true,
      message: "OTP is sent to your number",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: (error as Error).message ?? "Something went wrong",
    };
  }
};

export const verifyOTP = async (data: VerificationFormType) => {
  console.log(data);

  try {
    await createSession({ id: "1", name: "John Doe", role: "user" });

    return {
      success: true,
      message: "Verification successful",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: (error as Error).message ?? "Something went wrong",
    };
  }
};
