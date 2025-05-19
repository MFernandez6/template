import { NextApiRequest, NextApiResponse } from "next";
import { unlink } from "fs/promises";
import { join } from "path";
import connectDB from "@/lib/mongodb";
import Document from "@/models/Document";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const documentId = req.query.id as string;

    await connectDB();
    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Delete the file from the filesystem
    const filePath = join(process.cwd(), "public", document.path);
    await unlink(filePath);

    // Delete the document from the database
    await Document.findByIdAndDelete(documentId);

    return res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error deleting document:", error);
    return res.status(500).json({ error: "Error deleting document" });
  }
}
