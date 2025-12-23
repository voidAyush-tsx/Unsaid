import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { type, score, level } = body;

    if (!type || score === undefined || !level) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await prisma.assessmentResult.create({
      data: {
        userId: session.user.id,
        type,
        score,
        level,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error saving assessment result:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
