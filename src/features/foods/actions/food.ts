"use server";

import { prisma } from "@/db/client";
import { errorResponse } from "@/lib/error";
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
        ...(image && {
          image: filePath,
        }),
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
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/foods");

    return {
      success: true,
      message: "Food is created successfully",
      data: { food: food },
    };
  } catch (error) {
    // delete image
    if (filePath) {
      deleteFile(filePath);
    }

    return errorResponse(error as Error);
  }
};

export const updateFood = async (id: string, data: FoodSchemaType) => {
  let filePath = "";

  try {
    const { category, image, ...rest } = data;

    console.log(image);

    const food = await prisma.food.findUnique({ where: { id } });

    if (!food) {
      throw new Error("Food does not exist");
    }

    // add food image for storage
    if (image) {
      // delete previous upload
      if (food.image) {
        deleteFile(food.image);
      }

      // create food folder
      await fs.mkdir("storage/food", { recursive: true });
      filePath = `storage/food/${crypto.randomUUID()}-${image.name}`;
      await fs.writeFile(filePath, Buffer.from(await image.arrayBuffer()));
    }

    // update food
    await prisma.food.update({
      where: { id },
      data: {
        en_name: rest.en_name,
        bn_name: rest.bn_name,
        unit: rest.unit,
        calcium_mg: rest.calcium_mg,
        ...(image && {
          image: filePath,
        }),
      },
    });

    if (category) {
      // delete previous category
      await prisma.food_category.deleteMany({
        where: { food_id: food.id },
      });

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
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/foods");

    return {
      success: true,
      message: "Food is updated successfully",
      data: { food: food },
    };
  } catch (error) {
    console.error(error);

    // delete image
    if (filePath) {
      deleteFile(filePath);
    }

    return errorResponse(error as Error);
  }
};

export const deleteFood = async (id: string) => {
  try {
    const food = await prisma.food.findUnique({ where: { id } });

    if (!food) throw new Error("This food does not exist");

    // delete food image
    if (food.image) {
      deleteFile(food.image);
    }

    await prisma.food.delete({ where: { id } });

    revalidatePath('/dashboard')
    revalidatePath('/dashboard/foods')

    return {
      success: true,
      message: "Food is deleted successfully",
    };
  } catch (error) {
    return errorResponse(error as Error);
  }
};
