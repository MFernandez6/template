"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DocumentUpload from "./DocumentUpload";

interface UploadButtonProps {
  claimId: string;
  uploadedBy: string;
  onUploadComplete?: () => void;
}

export default function UploadButton({
  claimId,
  uploadedBy,
  onUploadComplete,
}: UploadButtonProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUploadComplete = () => {
    if (onUploadComplete) {
      onUploadComplete();
    }
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<CloudUploadIcon />}
        onClick={handleClickOpen}
        sx={{ mb: 2 }}
      >
        Upload Document
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          <DocumentUpload
            claimId={claimId}
            uploadedBy={uploadedBy}
            onUploadComplete={handleUploadComplete}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
