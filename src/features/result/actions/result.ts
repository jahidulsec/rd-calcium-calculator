"use server";

import { prisma, user_calcium } from "@/db/client";
import { errorResponse } from "@/lib/error";
import { revalidatePath } from "next/cache";

export const createUserCalcium = async (data: Partial<user_calcium>) => {
  try {
    // create
    const userCalcium = await prisma.user_calcium.create({
      data: {
        userId: data.userId ?? "",
        calcium_intake: data.calcium_intake ?? 0,
        calcium_required: data.calcium_required ?? 0,
      },
    });

    // revalidate cache
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/analytics");

    return {
      success: true,
      message: "Data saved successfully",
      data: { userCalcium: userCalcium },
    };
  } catch (error) {
    return errorResponse(error as Error);
  }
};
