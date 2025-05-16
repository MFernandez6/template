import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    claimId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Accident Reports",
        "Medical Records",
        "Insurance Documents",
        "Property Damage",
        "Wage Loss Documentation",
        "Legal Documents",
        "Other",
      ],
    },
    documentType: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: String,
      required: true,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for faster queries
documentSchema.index({ claimId: 1 });
documentSchema.index({ category: 1 });
documentSchema.index({ documentType: 1 });
documentSchema.index({ uploadDate: -1 });

export default mongoose.models.Document ||
  mongoose.model("Document", documentSchema);
