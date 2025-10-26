import { prisma } from "@/db/client";
import { DEFAULT_PAGE_SIZE } from "@/utils/data";

export const getAdmins = async (page?: number, limit?: number) => {
  const validatePage = page || 1;
  const validateLimit = limit || DEFAULT_PAGE_SIZE;

  try {
    const admins = await prisma.admin.findMany({
      skip: Number(validatePage - 1) * validateLimit,
      take: validateLimit,
    });

    const count = await prisma.admin.count();

    return {
      success: true,
      message: "Get admins successfull",
      data: admins,
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

export const getAdmin = async (id: string) => {
  try {
    const blog = await prisma.admin.findUnique({
      where: { id },
    });

    return {
      success: true,
      message: "Get admin successfully",
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
