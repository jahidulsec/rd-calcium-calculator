import { prisma } from "@/db/client";
import { DEFAULT_PAGE_SIZE } from "@/utils/data";

export const getAdmins = async (page?: number, limit?: number) => {
  const validatePage = page || 1;
  const validateLimit = limit || DEFAULT_PAGE_SIZE;

  try {
    const admins = await prisma.admin.findMany({
      where: {
        role: {
          not: "superadmin",
        },
      },
      skip: Number(validatePage - 1) * validateLimit,
      take: validateLimit,
    });

    const count = await prisma.admin.count({
      where: {
        role: {
          not: "superadmin",
        },
      },
    });

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

export const getAdmin = async (username: string) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { username: username },
    });

    return {
      success: true,
      message: "Get admin successfully",
      data: admin,
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
