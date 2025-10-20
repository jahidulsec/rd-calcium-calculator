import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { params } from "@/types/search-params";
import { prisma } from "@/db/client";
import { getAuthUser } from "@/lib/dal";

export const GET = async (req: NextRequest, { params }: { params: params }) => {
  try {
    // check authentication
    const authUser = await getAuthUser();

    if (!authUser)
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );

    const { id } = await params;

    // get food imgae information
    const food = await prisma.food.findUnique({
      where: { id: id as string },
    });

    if (!food) {
      return NextResponse.json(
        { success: false, message: "not found" },
        { status: 404 }
      );
    }

    if (!fs.existsSync(food?.image as string)) {
      return NextResponse.json(
        { success: false, message: "not found" },
        { status: 404 }
      );
    }

    const file = fs.readFileSync(food?.image ?? "");

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
