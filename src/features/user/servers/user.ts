"use server";

import { prisma } from "@/db/client";
import { DEFAULT_PAGE_SIZE } from "@/utils/data";

export const getUser = async (mobile: string) => {
  const user = await prisma.user.findUnique({
    where: { mobile },
    include: { user_information: { include: { user_image: true } } },
  });

  if (!user) throw new Error("User does not exist");

  return user;
};

export const getUsers = async (page?: number, limit?: number) => {
  const validatePage = page || 1;
  const validateLimit = limit || DEFAULT_PAGE_SIZE;

  try {
    const users = await prisma.user_information.findMany({
      orderBy: [
        {
          full_name: "asc",
        },
      ],
      skip: Number(validatePage - 1) * validateLimit,
      take: validateLimit,
    });

    const count = await prisma.user_information.count();

    return {
      success: true,
      message: "Get users successfull",
      data: users,
      count: count,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        (error as Error).message.split("\n").pop() ?? "Something went wrong",
      data: [],
    };
  }
};
