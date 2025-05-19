"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface DocumentUploadProps {
  claimId: string;
  onUploadComplete: () => void;
}

const DOCUMENT_CATEGORIES = {
  ACCIDENT_REPORTS: "Accident Reports",
  MEDICAL_RECORDS: "Medical Records",
  INSURANCE_DOCUMENTS: "Insurance Documents",
  PROPERTY_DAMAGE: "Property Damage",
  WAGE_LOSS: "Wage Loss Documentation",
  LEGAL_DOCUMENTS: "Legal Documents",
  OTHER: "Other",
} as const;

const DOCUMENT_TYPES = {
  [DOCUMENT_CATEGORIES.ACCIDENT_REPORTS]: [
    "Police Report",
    "Accident Scene Photos",
    "Witness Statements",
    "Traffic Camera Footage",
  ],
  [DOCUMENT_CATEGORIES.MEDICAL_RECORDS]: [
    "Hospital Records",
    "Doctor's Notes",
    "Medical Bills",
    "Prescription Records",
    "Rehabilitation Records",
  ],
  [DOCUMENT_CATEGORIES.INSURANCE_DOCUMENTS]: [
    "Insurance Policy",
    "Claim Forms",
    "Correspondence with Insurance",
    "Settlement Offers",
  ],
  [DOCUMENT_CATEGORIES.PROPERTY_DAMAGE]: [
    "Vehicle Damage Photos",
    "Repair Estimates",
    "Property Damage Assessment",
    "Rental Car Receipts",
  ],
  [DOCUMENT_CATEGORIES.WAGE_LOSS]: [
    "Pay Stubs",
    "Employer Statement",
    "Tax Returns",
    "Work Schedule",
  ],
  [DOCUMENT_CATEGORIES.LEGAL_DOCUMENTS]: [
    "Court Documents",
    "Attorney Correspondence",
    "Settlement Agreements",
    "Legal Notices",
  ],
  [DOCUMENT_CATEGORIES.OTHER]: ["Other"],
} as const;

export default function DocumentUpload({
  claimId,
  onUploadComplete,
}: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("");
  const [documentType, setDocumentType] = useState<string>("");

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
    setDocumentType(""); // Reset document type when category changes
  };

  const handleDocumentTypeChange = (event: SelectChangeEvent) => {
    setDocumentType(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    if (!category || !documentType) {
      setError("Please select both category and document type");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("claimId", claimId);
    formData.append("category", category);
    formData.append("documentType", documentType);

    try {
      setUploading(true);
      setError(null);
      setProgress(0);

      console.log("Uploading file:", {
        name: file.name,
        size: file.size,
        type: file.type,
        claimId,
        category,
        documentType,
      });

      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Failed to parse error response" }));
        console.error("Upload failed:", {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        });
        throw new Error(
          errorData.error || `Upload failed with status ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Upload successful:", data);

      setProgress(100);
      setFile(null);
      setCategory("");
      setDocumentType("");
      onUploadComplete();
    } catch (error) {
      console.error("Upload error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to upload document. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Upload Accident-Related Document
      </Typography>

      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Document Category</InputLabel>
          <Select
            value={category}
            label="Document Category"
            onChange={handleCategoryChange}
          >
            {Object.entries(DOCUMENT_CATEGORIES).map(([key, value]) => (
              <MenuItem key={key} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {category && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Document Type</InputLabel>
            <Select
              value={documentType}
              label="Document Type"
              onChange={handleDocumentTypeChange}
            >
              {DOCUMENT_TYPES[category as keyof typeof DOCUMENT_TYPES].map(
                (type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        )}
      </Box>

      <Box
        sx={{
          border: "2px dashed",
          borderColor: "primary.main",
          borderRadius: 1,
          p: 3,
          textAlign: "center",
          mb: 2,
        }}
      >
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button
            component="span"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            disabled={uploading}
          >
            Select File
          </Button>
        </label>
        {file && (
          <Typography variant="body2" component="div" sx={{ mt: 1 }}>
            Selected: {file.name}
          </Typography>
        )}
      </Box>

      {uploading && (
        <Box sx={{ width: "100%", mb: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={!file || uploading || !category || !documentType}
        fullWidth
      >
        {uploading ? "Uploading..." : "Upload Document"}
      </Button>
    </Box>
  );
}
