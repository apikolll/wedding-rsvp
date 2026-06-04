import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";

import { randomInt } from "crypto";

const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function generateReferenceNumber(length = 6): string {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += ALPHABET[randomInt(0, ALPHABET.length)];
  }
  return code;
}

export async function GET() {
  try {
    const references = await prisma.reference.findMany({
      include: { user: true },
    });

    return NextResponse.json(references, { status: 200 });
  } catch (err) {
    console.error("References GET failed:", err);
    return NextResponse.json(
      { error: "Failed to get referecens" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as { name: string };

    if (!data.name)
      return NextResponse.json({ error: "Name is required" }, { status: 401 });

    const isExist = await prisma.reference.findFirst({
      where: {
        name: {
          equals: data.name,
          mode: "insensitive",
        },
      },
    });

    if (isExist)
      return NextResponse.json(
        { error: "Name is already exist as a reference" },
        { status: 400 },
      );

    const referenceNumber = generateReferenceNumber(6);

    const newReference = await prisma.reference.create({
      data: {
        name: data.name,
        referenceId: referenceNumber,
      },
    });

    return NextResponse.json({ newReference });
  } catch (error) {
    console.log("Error creating new reference", error);
    return NextResponse.json(
      { error: "Failed to create new reference" },
      { status: 500 },
    );
  }
}
