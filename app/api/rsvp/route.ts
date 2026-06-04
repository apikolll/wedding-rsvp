import { prisma } from "@/config/prisma";
import { Status } from "@/generated/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const rsvp = await prisma.user.findMany({ include: { reference: true } });

    return NextResponse.json(rsvp, { status: 200 });
  } catch (err) {
    console.error("RSVP get failed:", err);
    return NextResponse.json({ error: "Failed to get RSVP" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Basic validation — swap for Zod if you want stricter checks
    if (!data.name || !data.status) {
      return NextResponse.json(
        { error: "name and status are required" },
        { status: 400 },
      );
    }

    if (data.status !== "accept" && data.status !== "decline") {
      return NextResponse.json(
        { error: 'status must be "accept" or "decline"' },
        { status: 400 },
      );
    }

    let ref = null;

    if (data?.ref) {
      ref = await prisma.reference.findFirst({
        where: {
          referenceId: { equals: data.ref, mode: "insensitive" },
        },
      });
    }

    const rsvp = await prisma.user.create({
      data: {
        name: data.name,
        status: data.status as Status,
        notes: data.notes ?? null,
        pax: data.status === "accept" ? (data.pax ?? null) : null,
        referenceId: ref?.id,
      },
    });

    return NextResponse.json(rsvp, { status: 201 });
  } catch (err) {
    console.error("RSVP create failed:", err);
    return NextResponse.json({ error: "Failed to save RSVP" }, { status: 500 });
  }
}
