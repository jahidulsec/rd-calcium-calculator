"use server";

import { prisma } from "@/db/client";
import { createSession } from "@/lib/session";
import { LoginFormType, VerificationFormType } from "@/schema/auth";
import { generateUserOtp } from "../lib/auth";
import { verifyOtpTime } from "@/utils/helper";

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
    const otp = await generateUserOtp(data.mobile);

    // TODO: sent otp to phone

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
  try {
    const OTP = await prisma.otp.findFirst({
      where: {
        mobile: data.mobile,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    // check otp
    if (!OTP) {
      throw new Error("Invalid OTP");
    }

    if (!verifyOtpTime(OTP.expiresAt)) {
      throw new Error("This OTP is expired");
    }

    if (OTP.code !== data.code) {
      throw new Error("Invalid OTP");
    }

    // delete verified otp
    await prisma.otp.delete({ where: { id: OTP.id } });

    // get user
    const user = await prisma.user.findUnique({
      where: {
        mobile: data.mobile,
      },
      include: {
        user_information: true,
      },
    });

    if (!user) throw new Error("User does not exist");

    await createSession({
      mobile: user.mobile,
      name: user?.user_information?.full_name,
      age: user?.user_information?.age,
      gender: user?.user_information?.gender,
      role: "user",
    });

    return {
      success: true,
      message: "Verification successful",
      data: {
        user,
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

export const resentOtp = async (data: LoginFormType) => {
  try {
    console.log(data);

    // check user or create new user
    const user = await prisma.user.findUnique({
      where: {
        mobile: data.mobile,
      },
    });

    if (!user) {
      throw new Error("User does not exists");
    }

    // create otp
    await generateUserOtp(data.mobile);

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
