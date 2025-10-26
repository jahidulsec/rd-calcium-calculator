"use server";

import { prisma } from "@/db/client";
import { errorResponse } from "@/lib/error";
import { BannerSchemaType } from "@/schema/banner";
import { deleteFile } from "@/utils/file";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";

export const createBanner = async (data: BannerSchemaType) => {
  let filePath = "";

  try {
    const { image } = data;

    // create banner folder
    await fs.mkdir("storage/banner", { recursive: true });
    filePath = `storage/banner/${crypto.randomUUID()}-${image.name}`;
    await fs.writeFile(filePath, Buffer.from(await image.arrayBuffer()));

    // create banner
    const banner = await prisma.banner.create({
      data: {
        image: filePath,
      },
    });

    // revalidate cache
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/banners");

    return {
      success: true,
      message: "Banner is created successfully",
      data: { banner: banner },
    };
  } catch (error) {
    // delete image
    if (filePath) {
      deleteFile(filePath);
    }

    return errorResponse(error as Error);
  }
};
