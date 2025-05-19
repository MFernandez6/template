import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Claim from "@/models/Claim";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    console.log("Starting GET /api/claims request");

    const session = await getServerSession(authOptions);
    console.log("Session:", session?.user?.email);

    if (!session?.user?.email) {
      console.log("No authenticated user found");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    console.log("Connecting to MongoDB...");
    try {
      await connectDB();
      console.log("MongoDB connected successfully");
    } catch (_error: unknown) {
      console.error("MongoDB connection error:", _error);
      return NextResponse.json(
        {
          error: "Database connection failed",
          details: _error instanceof Error ? _error.message : "Unknown error",
        },
        { status: 500 }
      );
    }

    console.log("Fetching claims for user:", session.user.id);
    const claims = await Claim.find({ userId: session.user.id }).sort({
      date: -1,
    });
    console.log("Found claims:", claims.length);

    return NextResponse.json(claims);
  } catch (_error: unknown) {
    console.error("Error in GET /api/claims:", _error);
    return NextResponse.json(
      {
        error: "Error fetching claims",
        details: _error instanceof Error ? _error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const claimData = await request.json();
    claimData.userId = session.user.id;

    await connectDB();
    const claim = await Claim.create(claimData);
    return NextResponse.json(claim);
  } catch (_error: unknown) {
    console.error("Error creating claim:", _error);
    return NextResponse.json(
      {
        error: "Error creating claim",
        details: _error instanceof Error ? _error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
