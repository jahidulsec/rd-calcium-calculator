"use server";

import { prisma } from "@/db/client";
import { createSession } from "@/lib/session";
import { LoginFormType, VerificationFormType } from "@/schema/auth";
import { addMinutesToDate, generateOtp } from "@/utils/helper";

export const login = async (data: LoginFormType) => {
  try {
    // check user or create new user
    let user = await prisma.user.findUnique({
      where: {
        mobile: data.mobile,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          mobile: data.mobile,
          updated_at: new Date(),
        },
      });
    }

    // create otp
    const code = generateOtp();

    await prisma.otp.create({
      data: {
        mobile: data.mobile,
        code,
        expiresAt: addMinutesToDate(new Date(), 5), // valid for 5 mins
      },
    });

    return {
      success: true,
      message: "OTP is sent to your number",
      data: {
        user: user,
      },
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
