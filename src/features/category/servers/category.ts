"use server";

import { prisma } from "@/db/client";

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error(error);
    return [];
  }
};
