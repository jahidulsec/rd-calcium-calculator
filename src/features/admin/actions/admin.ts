"use server";

import { prisma } from "@/db/client";
import { AdminSchemaType } from "@/schema/admin";
import { hashPassword } from "@/utils/password";

export const createAdmin = async (data: AdminSchemaType) => {
  try {
    // check admin
    const user = await prisma.admin.findUnique({
      where: {
        username: data.username,
      },
    });

    if (user) {
      throw new Error("Admin already exists with this username");
    }

    const admin = await prisma.admin.create({
      data: {
        full_name: data.full_name,
        username: data.username,
        password: await hashPassword(data.password),
        role: "admin",
      },
    });

    return {
      success: true,
      message: "New admin is successfully created",
      data: {
        admin: admin,
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
