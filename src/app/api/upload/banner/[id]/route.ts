import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { params } from "@/types/search-params";
import { prisma } from "@/db/client";
import path from "path";

export const GET = async (req: NextRequest, { params }: { params: params }) => {
  try {
    const { id } = await params;

    // get banner imgae information
    const banner = await prisma.banner.findUnique({
      where: { id: id as string },
    });

    if (!banner || !banner.image) {
      return NextResponse.json(
        { success: false, message: "not found" },
        { status: 404 }
      );
    }

    const filePath = path.join(process.cwd(), banner.image);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { success: false, message: "not found" },
        { status: 404 }
      );
    }

    const file = fs.readFileSync(filePath);

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
