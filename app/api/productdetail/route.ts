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
    const allReviews = await prisma.review.findMany({
      where: {
        productId: productId,
      },
    });
    let averageRating = 0;
    if (allReviews.length > 0) {
      const totalRating = allReviews.reduce((acc, review) => {
        return acc + review.rating;
      }, 0);
      averageRating = totalRating / allReviews.length;
    }
    return NextResponse.json({
      product,
      averageRating,
      allReviews,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
  }
}
