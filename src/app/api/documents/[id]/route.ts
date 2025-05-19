import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
import { join } from "path";
import connectDB from "@/lib/mongodb";
import Document from "@/models/Document";

interface RouteContext {
  params: {
    id: string;
  };
}

export async function DELETE(
  req: NextRequest,
  { params }: RouteContext
): Promise<Response> {
  try {
    const documentId = params.id;

    await connectDB();
    const document = await Document.findById(documentId);

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    // Delete the file from the filesystem
    const filePath = join(process.cwd(), "public", document.path);
    await unlink(filePath);

    // Delete the document from the database
    await Document.findByIdAndDelete(documentId);

    return NextResponse.json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { error: "Error deleting document" },
      { status: 500 }
    );
  }
}
