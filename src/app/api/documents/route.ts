import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Document from "@/models/Document";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const claimId = searchParams.get("claimId");

    if (!claimId) {
      return NextResponse.json(
        { error: "Claim ID is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const documents = await Document.find({ claimId }).sort({ uploadDate: -1 });

    return NextResponse.json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { error: "Error fetching documents" },
      { status: 500 }
    );
  }
}
