"use server";

import { LoginFormType } from "@/schema/auth";

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
