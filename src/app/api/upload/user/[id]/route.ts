import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { params } from "@/types/search-params";
import { prisma } from "@/db/client";

export const GET = async (req: NextRequest, { params }: { params: params }) => {
  try {
    const { id } = await params;
    const userImage = await prisma.user_image.findUnique({
      where: { id: id as string },
    });

    if (!userImage) {
      return NextResponse.json(
        { success: false, message: "not found" },
        { status: 404 }
      );
    }

    if (!fs.existsSync(userImage.file_path)) {
      return NextResponse.json(
        { success: false, message: "not found" },
        { status: 404 }
      );
    }

    const file = fs.readFileSync(userImage.file_path);

    return new Response(file);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: (error as Error).message ?? "Something went wrong",
        success: false,
      },
      { status: 400 }
    );
  }
};
