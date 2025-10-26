"use server";

import { prisma } from "@/db/client";
import { AdminSchemaType, UpdateAdminSchemaType } from "@/schema/admin";
import { hashPassword } from "@/utils/password";
import { revalidatePath } from "next/cache";

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

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/admins");
    revalidatePath("/dashboard/account");

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

export const updateAdmin = async (id: string, data: UpdateAdminSchemaType) => {
  try {
    const user = await prisma.admin.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new Error("Admin does not exist");

    // check admin
    const existingUser = await prisma.admin.findFirst({
      where: {
        AND: [
          {
            username: data.username,
          },
          {
            id: {
              not: id,
            },
          },
        ],
      },
    });

    if (existingUser) {
      throw new Error("Admin already exists with this username");
    }

    const { password, ...rest } = data;

    const admin = await prisma.admin.update({
      where: { id },
      data: {
        ...(data.password && {
          password: await hashPassword(data.password),
        }),
        ...rest,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/admins");
    revalidatePath("/dashboard/account");

    return {
      success: true,
      message: "Admin is successfully updated",
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

export const deleteAdmin = async (id: string) => {
  try {
    const user = await prisma.admin.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new Error("Admin does not exist");

    const admin = await prisma.admin.delete({
      where: { id },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/admins");
    revalidatePath("/dashboard/account");

    return {
      success: true,
      message: "Admin is deleted",
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
