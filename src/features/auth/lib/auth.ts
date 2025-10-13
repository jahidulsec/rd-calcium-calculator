"use server";

import { prisma } from "@/db/client";
import { addMinutesToDate, generateOtp } from "@/utils/helper";

export const generateUserOtp = async (mobile: string) => {
  const code = generateOtp();

  const otp = await prisma.otp.create({
    data: {
      mobile: mobile,
      code,
      expiresAt: addMinutesToDate(new Date(), 5), // valid for 5 mins
    },
  });

  return otp;
};
