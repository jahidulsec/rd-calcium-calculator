"use server";

import { prisma } from "@/db/client";
import { AdminLoginSchemaType } from "@/schema/admin";

export const login = async (data: AdminLoginSchemaType) => {
  try {
    // check admin
    const user = await prisma.admin.findUnique({
      where: {
        username: data.username,
      },
    });

    if (!user) {
      throw new Error("Admin does not exist");
    }

    // check password

    return {
      success: true,
      message: "You are logged in successfully",
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
