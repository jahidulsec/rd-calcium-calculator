"use server";

import { prisma } from "@/db/client";
import { createSession } from "@/lib/session";
import { AdminLoginSchemaType } from "@/schema/admin";
import { isValidPassword } from "@/utils/password";

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
    if (!(await isValidPassword(data.password, user.password))) {
      throw new Error("Invalid Password");
    }

    // create session
    await createSession({
      mobile: user.username,
      name: user.full_name,
      role: "superadmin",
    });

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
