import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const data = await params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!user)
      return NextResponse.json({ message: "User not found." }, { status: 404 });

    const deletedUser = await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    return NextResponse.json({ id: data.id, deletedUser }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error deleting user" },
      { status: 500 },
    );
  }
}
