"use server";

import { prisma } from "@/db/client";
import { DEFAULT_PAGE_SIZE } from "@/utils/data";

export const getUsersActivities = async (
  page?: number,
  limit?: number,
  date?: string
) => {
  const validatePage = page || 1;
  const validateLimit = limit || DEFAULT_PAGE_SIZE;

  const start = date ? new Date(date) : undefined;
  const end = date ? new Date(date) : undefined;

  if (end) {
    end.setDate(end.getDate() + 1);
  }

  console.log(start);
  console.log(end);

  try {
    const users = await prisma.user_calcium.findMany({
      where: {
        ...(date && {
          created_at: {
            gte: start,
            lt: end,
          },
        }),
      },
      include: {
        user: {
          include: {
            user_information: { include: { user_image: true } },
          },
        },
      },
      skip: Number(validatePage - 1) * validateLimit,
      take: validateLimit,
      orderBy: [
        {
          user: {
            user_information: {
              full_name: "asc",
            },
          },
        },
        {
          created_at: "asc",
        },
      ],
    });

    const count = await prisma.user_calcium.count({
      where: {
        ...(date && {
          created_at: {
            gte: start,
            lt: end,
          },
        }),
      },
    });

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

export const getAllUsersActivities = async () => {
  try {
    const users = await prisma.user_calcium.findMany({
      include: {
        user: {
          include: {
            user_information: true,
          },
        },
      },
      orderBy: [
        {
          user: {
            user_information: {
              full_name: "asc",
            },
          },
        },
        {
          created_at: "asc",
        },
      ],
    });

    return {
      success: true,
      message: "Get users activities successfully",
      data: users,
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
