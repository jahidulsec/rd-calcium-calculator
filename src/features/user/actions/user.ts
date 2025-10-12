"use server";

import { UpdateUserFormType, UserFormType } from "@/schema/user";

export const createProfile = async (data: UserFormType) => {
  console.log(data);

  try {
    return {
      success: true,
      message: "Your profile is created successfully",
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
  console.log(data);

  try {
    return {
      success: true,
      message: "Your profile is updated successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: (error as Error).message ?? "Something went wrong",
    };
  }
};
