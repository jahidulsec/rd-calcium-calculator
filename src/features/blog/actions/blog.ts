"use server";

import { prisma } from "@/db/client";
import { errorResponse } from "@/lib/error";
import { BlogSchemaType } from "@/schema/blog";
import { deleteFile } from "@/utils/file";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";

export const createBlog = async (data: BlogSchemaType) => {
  let filePath = "";

  try {
    const { image, ...rest } = data;

    // add blog image for storage
    if (image) {
      // create blog folder
      await fs.mkdir("storage/blog", { recursive: true });
      filePath = `storage/blog/${crypto.randomUUID()}-${image.name}`;
      await fs.writeFile(filePath, Buffer.from(await image.arrayBuffer()));
    }

    // create blog
    const blog = await prisma.blog.create({
      data: {
        en_title: rest.en_title,
        bn_title: rest.bn_title,
        en_description: rest.en_description,
        bn_description: rest.bn_description,
        en_details: rest.en_details,
        bn_details: rest.bn_details,
        ...(image && {
          image: filePath,
        }),
      },
    });

    // revalidate cache
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/blogs");

    return {
      success: true,
      message: "Blog is created successfully",
      data: { blog: blog },
    };
  } catch (error) {
    // delete image
    if (filePath) {
      deleteFile(filePath);
    }

    return errorResponse(error as Error);
  }
};

export const updateBlog = async (id: string, data: BlogSchemaType) => {
  let filePath = "";

  try {
    const { image, ...rest } = data;

    const blog = await prisma.blog.findUnique({ where: { id } });

    if (!blog) {
      throw new Error("Blog does not exist");
    }

    // add food image for storage
    if (image) {
      // delete previous upload
      if (blog.image) {
        deleteFile(blog.image);
      }

      // create food folder
      await fs.mkdir("storage/blog", { recursive: true });
      filePath = `storage/blog/${crypto.randomUUID()}-${image.name}`;
      await fs.writeFile(filePath, Buffer.from(await image.arrayBuffer()));
    }

    // update food
    await prisma.blog.update({
      where: { id },
      data: {
        en_title: rest.en_title,
        bn_title: rest.bn_title,
        en_description: rest.en_description,
        bn_description: rest.bn_description,
        en_details: rest.en_details,
        bn_details: rest.bn_details,
        ...(image && {
          image: filePath,
        }),
      },
    });

    // revalidate cache
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/blogs");

    return {
      success: true,
      message: "Food is updated successfully",
      data: { blog },
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

export const deleteBlog = async (id: string) => {
  try {
    const blog = await prisma.blog.findUnique({ where: { id } });

    if (!blog) throw new Error("This blog does not exist");

    // delete blog image
    if (blog.image) {
      deleteFile(blog.image);
    }

    await prisma.blog.delete({ where: { id } });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/blogs");

    return {
      success: true,
      message: "Blog is deleted successfully",
    };
  } catch (error) {
    return errorResponse(error as Error);
  }
};
