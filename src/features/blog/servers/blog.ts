"use server";

import { prisma } from "@/db/client";
import { DEFAULT_PAGE_SIZE } from "@/utils/data";

export const getBlogs = async (page?: number, limit?: number) => {
  const validatePage = page || 1;
  const validateLimit = limit || DEFAULT_PAGE_SIZE;

  try {
    const blogs = await prisma.blog.findMany({
      orderBy: [
        {
          en_title: "asc",
        },
      ],
      select: {
        id: true,
        en_title: true,
        bn_title: true,
        en_description: true,
        bn_description: true,
        image: true,
      },
      skip: Number(validatePage - 1) * validateLimit,
      take: validateLimit,
    });

    const count = await prisma.blog.count();

    return {
      success: true,
      message: "Get blogs successfull",
      data: blogs,
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

export const getBlog = async (id: string) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    return {
      success: true,
      message: "Get blog successfull",
      data: blog,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        (error as Error).message.split("\n").pop() ?? "Something went wrong",
      data: null,
    };
  }
};
