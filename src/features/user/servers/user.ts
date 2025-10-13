"use server";

import { prisma } from "@/db/client";

export const getUser = async (mobile: string) => {
  const user = await prisma.user.findUnique({
    where: { mobile },
    include: { user_information: { include: { user_image: true } } },
  });

  if (!user) throw new Error("User does not exist");

  return user;
};
