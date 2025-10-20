"use server";

import { prisma } from "@/db/client";
import { DEFAULT_PAGE_SIZE } from "@/utils/data";

export const getFoods = async (page?: number, limit?: number) => {
  const validatePage = page || 1;
  const validateLimit = limit||  DEFAULT_PAGE_SIZE;

  try {
    const Foods = await prisma.food.findMany({
      include: { food_category: true },
      orderBy: [
        {
          en_name: "asc",
        },
      ],
      skip: Number(validatePage - 1) * validateLimit,
      take: validateLimit,
    });

    return { success: true, message: "Get foods successfull", data: Foods };
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
