import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const productId = Number(id);
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
  }
}
