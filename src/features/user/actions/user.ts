"use server";

import { $Enums, prisma } from "@/db/client";
import { createSession } from "@/lib/session";
import { UpdateUserFormType, UserFormType } from "@/schema/user";
import { revalidatePath } from "next/cache";

export const createProfile = async (data: UserFormType) => {
  try {
    // check user
    const user = await prisma.user.findUnique({
      where: { mobile: data.userId },
    });

    if (!user) {
      throw new Error("User does not exist");
    }

    // create profile
    const profile = await prisma.user_information.create({
      data: {
        full_name: data.fullName,
        district: data.district,
        gender: data.gender as $Enums.user_information_gender,
        age: data.age as $Enums.user_information_age,
        userId: data.userId ?? "",
      },
    });

    // create session
    await createSession({
      mobile: user.mobile,
      name: profile.full_name,
      age: profile.age,
      gender: profile.gender,
      role: "user",
    });

    return {
      success: true,
      message: "Your profile is created successfully",
      data: { user: profile },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: (error as Error).message ?? "Something went wrong",
    };
  }
};

export const updateProfile = async (data: UpdateUserFormType) => {
  try {
    // destructure data
    const { image } = data;

    const user = await prisma.user.findUnique({
      where: { mobile: data.userId },
    });

    // check user
    if (!user) throw new Error("User does not exist");

    // update user information
    await prisma.user_information.update({
      where: { userId: data.userId },
      data: {
        full_name: data.fullName,
        district: data.district,
        age: data.age,
        gender: data.gender,
      },
    });
    

    // revalidate cache
    revalidatePath("/");
    revalidatePath("/profile");

    return {
      success: true,
      message: "Your profile is updated successfully",
    };
  } catch (error) {
    console.error(JSON.stringify(error));
    return {
      success: false,
      message:
        (error as Error).message.split("\n").pop() ?? "Something went wrong",
    };
  }
};
