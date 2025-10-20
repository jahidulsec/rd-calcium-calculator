"use server";

import { prisma } from "@/db/client";
import { FoodSchemaType } from "@/schema/food";
import { deleteFile } from "@/utils/file";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";

export const createFood = async (data: FoodSchemaType) => {
  let filePath = "";

  try {
    const { category, image, ...rest } = data;

    // add food image for storage
    if (image) {
      // create food folder
      await fs.mkdir("storage/food", { recursive: true });
      filePath = `storage/food/${crypto.randomUUID()}-${image.name}`;
      await fs.writeFile(filePath, Buffer.from(await image.arrayBuffer()));
    }

    // create food
    const food = await prisma.food.create({
      data: {
        en_name: rest.en_name,
        bn_name: rest.bn_name,
        unit: rest.unit,
        calcium_mg: rest.calcium_mg,
        image: filePath,
      },
    });

    if (category) {
      for (let i = 0; i < category.length; i++) {
        await prisma.food_category.create({
          data: {
            food_id: food.id,
            category_id: category[i],
          },
        });
      }
    }

    // revalidate cache
    revalidatePath("/");
    revalidatePath("/dashboard/foods");

    return {
      success: true,
      message: "Food is created successfully",
      data: { food: food },
    };
  } catch (error) {
    console.error(error);

    // delete image
    if (filePath) {
      deleteFile(filePath);
    }

    return {
      success: false,
      message:
        (error as Error).message.split("\n").pop() ?? "Something went wrong",
    };
  }
};
