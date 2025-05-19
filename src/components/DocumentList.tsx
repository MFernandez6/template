"use client";

import { useEffect, useState, useCallback } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  CircularProgress,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DocumentPreview from "./DocumentPreview";

interface Document {
  _id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  uploadDate: string;
  category: string;
  documentType: string;
}

interface DocumentListProps {
  claimId: string;
}

export default function DocumentList({ claimId }: DocumentListProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/documents?claimId=${claimId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch documents");
      }
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch documents"
      );
    } finally {
      setLoading(false);
    }
  }, [claimId]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleDownload = (document: Document) => {
    window.open(document.path, "_blank");
  };

  const handleDelete = async (documentId: string) => {
    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete document");
      }

      setDocuments(documents.filter((doc) => doc._id !== documentId));
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to delete document"
      );
    }
  };

  const handlePreview = (document: Document) => {
    setPreviewDocument(document);
  };

  const handleClosePreview = () => {
    setPreviewDocument(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ p: 2 }}>
        {error}
      </Typography>
    );
  }

  if (documents.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ p: 2 }}>
        No documents uploaded yet.
      </Typography>
    );
  }

  return (
    <>
      <List>
        {documents.map((document) => (
          <ListItem
            key={document._id}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              mb: 1,
            }}
          >
            <ListItemText
              primary={document.originalName}
              secondary={
                <Box sx={{ mt: 1 }}>
                  <Stack direction="row" spacing={1} sx={{ mb: 0.5 }}>
                    <Chip
                      label={document.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      label={document.documentType}
                      size="small"
                      color="secondary"
                      variant="outlined"
                    />
                  </Stack>
                  <Typography
                    variant="body2"
                    component="div"
                    color="text.secondary"
                  >
                    Uploaded: {new Date(document.uploadDate).toLocaleString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    color="text.secondary"
                  >
                    Size: {(document.size / 1024).toFixed(1)} KB
                  </Typography>
                </Box>
              }
            />
            <IconButton
              edge="end"
              aria-label="download"
              onClick={() => handleDownload(document)}
              sx={{ mr: 1 }}
            >
              <DownloadIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="preview"
              onClick={() => handlePreview(document)}
              sx={{ mr: 1 }}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDelete(document._id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {previewDocument && (
        <DocumentPreview
          open={!!previewDocument}
          onClose={handleClosePreview}
          document={previewDocument}
        />
      )}
    </>
  );
}
