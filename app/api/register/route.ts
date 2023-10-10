import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        picture:
          "https://res.cloudinary.com/dv9fwcyl2/image/upload/v1696914268/image_default/turnzxkijlmnbafeguxj.jpg",
        role: "USER",
      },
    });
    return NextResponse.json(user);
  } catch {
    return NextResponse.error();
  }
}
