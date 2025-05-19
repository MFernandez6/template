"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DocumentPreviewProps {
  open: boolean;
  onClose: () => void;
  document: {
    path: string;
    mimeType: string;
    originalName: string;
  };
}

export default function DocumentPreview({
  open,
  onClose,
  document,
}: DocumentPreviewProps) {
  const [error, setError] = useState<string | null>(null);

  const renderPreview = () => {
    if (error) {
      return (
        <Typography color="error" align="center">
          {error}
        </Typography>
      );
    }

    // Handle different file types
    if (document.mimeType.startsWith("image/")) {
      return (
        <Box sx={{ position: "relative", width: "100%", height: "80vh" }}>
          <Image
            src={document.path}
            alt={document.originalName}
            fill
            style={{ objectFit: "contain" }}
            onError={() => setError("Failed to load image")}
          />
        </Box>
      );
    }

    if (document.mimeType === "application/pdf") {
      return (
        <iframe
          src={document.path}
          style={{ width: "100%", height: "80vh", border: "none" }}
          onError={() => setError("Failed to load PDF")}
        />
      );
    }

    // For other file types, show a message
    return (
      <Typography align="center" color="text.secondary">
        Preview not available for this file type.{" "}
        <a href={document.path} target="_blank" rel="noopener noreferrer">
          Download
        </a>{" "}
        to view.
      </Typography>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          height: "90vh",
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{document.originalName}</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {renderPreview()}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
