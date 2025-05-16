import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { v4 as uuidv4 } from "uuid";
import Document from "@/models/Document";
import connectDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: NextRequest) {
  console.log("Starting file upload process...");

  try {
    // Get user session
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      console.error("No authenticated user found");
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Connect to MongoDB
    try {
      console.log("Connecting to MongoDB...");
      await connectDB();
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      return NextResponse.json(
        { error: "Database connection failed. Please try again later." },
        { status: 500 }
      );
    }

    console.log("Parsing form data...");
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const claimId = formData.get("claimId") as string;
    const category = formData.get("category") as string;
    const documentType = formData.get("documentType") as string;

    console.log("Received data:", {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      claimId,
      category,
      documentType,
    });

    // Validate required fields
    if (!file || !claimId || !category || !documentType) {
      console.error("Missing required fields:", {
        file: !!file,
        claimId,
        category,
        documentType,
      });
      return NextResponse.json(
        {
          error:
            "Missing required fields. Please provide file, claimId, category, and documentType.",
        },
        { status: 400 }
      );
    }

    // Validate file
    if (!(file instanceof File)) {
      console.error("Invalid file instance:", file);
      return NextResponse.json(
        { error: "Invalid file upload. Please try again." },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      console.error("File too large:", {
        size: file.size,
        maxSize: MAX_FILE_SIZE,
      });
      return NextResponse.json(
        {
          error: `File size exceeds ${
            MAX_FILE_SIZE / (1024 * 1024)
          }MB limit. Please choose a smaller file.`,
        },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      console.error("Invalid file type:", file.type);
      return NextResponse.json(
        {
          error:
            "File type not allowed. Please upload a PDF, image (JPEG, PNG, GIF), or Word document.",
        },
        { status: 400 }
      );
    }

    console.log("Converting file to buffer...");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueId = uuidv4();
    const extension = file.name.split(".").pop();
    const filename = `${uniqueId}.${extension}`;

    // Ensure upload directory exists
    const uploadDir = join(process.cwd(), "public", "uploads");
    console.log("Checking upload directory:", uploadDir);

    if (!existsSync(uploadDir)) {
      try {
        console.log("Creating upload directory...");
        await mkdir(uploadDir, { recursive: true });
        console.log("Upload directory created successfully");
      } catch (error) {
        console.error("Failed to create upload directory:", error);
        return NextResponse.json(
          {
            error: "Failed to create upload directory. Please try again later.",
          },
          { status: 500 }
        );
      }
    }

    // Save file
    const filePath = join(uploadDir, filename);
    try {
      console.log("Writing file to disk:", filePath);
      await writeFile(filePath, buffer);
      console.log("File written successfully");
    } catch (error) {
      console.error("File write error:", error);
      return NextResponse.json(
        { error: "Failed to save file. Please try again later." },
        { status: 500 }
      );
    }

    // Save document metadata to MongoDB
    try {
      console.log("Saving document metadata to MongoDB...");
      const document = await Document.create({
        filename,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        path: `/uploads/${filename}`,
        claimId,
        category,
        documentType,
        uploadedBy: session.user.email,
      });
      console.log("Document metadata saved successfully:", document._id);
      return NextResponse.json(document);
    } catch (error) {
      console.error("MongoDB save error:", error);
      // Clean up the uploaded file if database save fails
      try {
        console.log("Cleaning up uploaded file...");
        await unlink(filePath);
        console.log("File cleanup successful");
      } catch (unlinkError) {
        console.error("File cleanup error:", unlinkError);
      }
      return NextResponse.json(
        { error: "Failed to save document metadata. Please try again later." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unexpected upload error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

// Configure the API route to handle larger file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};
