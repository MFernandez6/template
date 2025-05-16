"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Modal,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DownloadIcon from "@mui/icons-material/Download";
import NoFaultForm from "./NoFaultForm";
import jsPDF from "jspdf";
import { useSession } from "next-auth/react";

interface Claim {
  id: string;
  date: string;
  status: string;
  type: string;
  description: string;
  clientName: string;
  insuranceCompany: string;
  policyNumber: string;
  claimNumber: string;
  adjusterName: string;
  adjusterPhone: string;
  dateOfAccident: string;
  fileNumber: string;
  medicalInsurance: string;
  medicalInsuranceId: string;
  phoneHome: string;
  phoneBusiness: string;
  address: string;
  dateOfBirth: string;
  socialSecurityNumber: string;
  permanentAddress: string;
  floridaResidenceDuration: string;
  accidentTime: string;
  accidentLocation: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleColor: string;
  vehicleLicensePlate: string;
  otherVehicleYear: string;
  otherVehicleMake: string;
  otherVehicleModel: string;
  otherVehicleColor: string;
  otherVehicleLicensePlate: string;
  wasInjured: boolean;
  injuryDescription: string;
  wasTreatedByDoctor: boolean;
  doctorName: string;
  doctorAddress: string;
  hospitalType: string;
  hospitalName: string;
  hospitalAddress: string;
  medicalBillsAmount: string;
  willHaveMoreMedicalExpenses: boolean;
  wasAtWork: boolean;
  lostWages: boolean;
  wageLossAmount: string;
  averageWeeklyWage: string;
  disabilityStartDate: string;
  returnToWorkDate: string;
  workersCompEligible: boolean;
  workersCompAmount: string;
  workersCompPeriod: string;
  employers: Array<{
    name: string;
    address: string;
    occupation: string;
    fromDate: string;
    toDate: string;
  }>;
  otherExpenses: boolean;
  otherExpensesDescription: string;
  medicalAuthorization: boolean;
  wageAuthorization: boolean;
  medicalSignature?: string;
  medicalSignatureDate?: string;
  wageSignature?: string;
  wageSignatureDate?: string;
  witnessName?: string;
  witnessPhone?: string;
  witnessAddress?: string;
  witnessStatement?: string;
}

interface ActionRequirement {
  id: string;
  description: string;
  completed: boolean;
}

interface NoFaultClaimsProps {
  onActionUpdate?: (requirements: ActionRequirement[]) => void;
}

export default function NoFaultClaims({ onActionUpdate }: NoFaultClaimsProps) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [actionRequirements, setActionRequirements] = useState<
    ActionRequirement[]
  >([
    {
      id: "1",
      description: "Complete No-Fault Form",
      completed: true, // This is automatically completed when the claim is created
    },
    {
      id: "2",
      description: "Attend Physical Therapy Sessions",
      completed: false,
    },
    {
      id: "3",
      description: "Follow Doctor's Recommended Treatment Plan",
      completed: false,
    },
    {
      id: "4",
      description: "Notify Insurance Company of Treatment Completion",
      completed: false,
    },
  ]);

  // Calculate progress based on completed tasks
  const calculateProgress = () => {
    const completedTasks = actionRequirements.filter(
      (task) => task.completed
    ).length;
    const totalTasks = actionRequirements.length;
    return (completedTasks / totalTasks) * 100;
  };

  // Fetch claims from MongoDB
  useEffect(() => {
    const fetchClaims = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch("/api/claims");
        if (!response.ok) {
          throw new Error("Failed to fetch claims");
        }
        const data = await response.json();
        setClaims(data);
      } catch (err) {
        setError("Error loading claims. Please try again later.");
        console.error("Error fetching claims:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, [session?.user?.id]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleViewOpen = (claim: Claim) => {
    setSelectedClaim(claim);
    setViewModalOpen(true);
  };

  const handleViewClose = () => {
    setViewModalOpen(false);
    setSelectedClaim(null);
  };

  const handleNewClaim = async (newClaim: Claim) => {
    try {
      const response = await fetch("/api/claims", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClaim),
      });

      if (!response.ok) {
        throw new Error("Failed to create claim");
      }

      const createdClaim = await response.json();
      setClaims((prevClaims) => [createdClaim, ...prevClaims]);
      handleClose();
    } catch (err) {
      setError("Error creating claim. Please try again later.");
      console.error("Error creating claim:", err);
    }
  };

  const toggleActionCompletion = (actionId: string) => {
    const updatedRequirements = actionRequirements.map((action) =>
      action.id === actionId
        ? { ...action, completed: !action.completed }
        : action
    );
    setActionRequirements(updatedRequirements);
    onActionUpdate?.(updatedRequirements);

    // Update claim status if all tasks are completed
    if (selectedClaim && updatedRequirements.every((task) => task.completed)) {
      const updatedClaim = { ...selectedClaim, status: "Finished" };
      setSelectedClaim(updatedClaim);

      // Update the claim in the claims list
      setClaims((prevClaims) =>
        prevClaims.map((claim) =>
          claim.id === selectedClaim.id ? updatedClaim : claim
        )
      );

      // Update the claim in the database
      fetch(`/api/claims/${selectedClaim.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Finished" }),
      }).catch((error) => {
        console.error("Error updating claim status:", error);
      });
    }
  };

  const generatePDF = (claim: Claim) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const footerHeight = 30;
    const contentWidth = pageWidth - 2 * margin;
    const labelWidth = 80; // Fixed width for labels
    const valueIndent = labelWidth + 10; // Indent for values
    let yPos = margin;
    let currentPage = 1;

    const addNewPage = () => {
      doc.addPage();
      currentPage++;
      yPos = margin;

      // Add header to new page
      doc.setFillColor(26, 35, 126);
      doc.rect(0, 0, pageWidth, 40, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(
        'APPLICATION FOR FLORIDA "NO FAULT" BENEFITS',
        pageWidth / 2,
        25,
        { align: "center" }
      );

      // Reset text color for content
      doc.setTextColor(0, 0, 0);
      yPos = 50;
    };

    const addFooter = () => {
      const generatedDate = new Date().toLocaleDateString();
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.text(
        `Generated on ${generatedDate} by ClaimSaver+`,
        margin,
        pageHeight - 20
      );
      doc.text(`Page ${currentPage}`, pageWidth - margin - 20, pageHeight - 20);
    };

    const checkNewPage = (requiredSpace: number) => {
      if (yPos + requiredSpace > pageHeight - footerHeight) {
        addFooter();
        addNewPage();
        return true;
      }
      return false;
    };

    // Helper function to split text into lines that fit within content width
    const splitTextIntoLines = (text: string, maxWidth: number): string[] => {
      const words = text.split(" ");
      const lines: string[] = [];
      let currentLine = "";

      words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = doc.getTextWidth(testLine);

        if (testWidth > maxWidth) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });

      if (currentLine) {
        lines.push(currentLine);
      }

      return lines;
    };

    // Helper function to add section with automatic page breaks and text wrapping
    const addSection = (title: string, items: [string, string][]) => {
      checkNewPage(20);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(title, margin, yPos);
      yPos += 10;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      items.forEach(([label, value]) => {
        const valueText = value || "N/A";
        const valueLines = splitTextIntoLines(
          valueText,
          contentWidth - valueIndent
        );

        checkNewPage(7 * valueLines.length);

        // Add label
        doc.setFont("helvetica", "bold");
        doc.text(label, margin, yPos);

        // Add value with proper indentation
        doc.setFont("helvetica", "normal");
        valueLines.forEach((line, index) => {
          const lineY = yPos + index * 7;
          doc.text(line, margin + valueIndent, lineY);
        });

        yPos += 7 * valueLines.length;
      });

      yPos += 10;
    };

    // First page header
    doc.setFillColor(26, 35, 126);
    doc.rect(0, 0, pageWidth, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text('APPLICATION FOR FLORIDA "NO FAULT" BENEFITS', pageWidth / 2, 25, {
      align: "center",
    });

    // Reset text color for content
    doc.setTextColor(0, 0, 0);
    yPos = 50;

    // Add all sections with improved formatting
    addSection("Claim Information", [
      ["Claim ID:", claim.id],
      ["Date:", claim.date],
      ["Status:", claim.status],
      ["Type:", claim.type],
      ["Description:", claim.description],
      ["File Number:", claim.fileNumber],
    ]);

    addSection("Insurance Information", [
      ["Insurance Company:", claim.insuranceCompany],
      ["Policy Number:", claim.policyNumber],
      ["Claim Number:", claim.claimNumber],
      ["Adjuster Name:", claim.adjusterName],
      ["Adjuster Phone:", claim.adjusterPhone],
      ["Medical Insurance:", claim.medicalInsurance],
      ["Medical Insurance ID:", claim.medicalInsuranceId],
      [
        "Medical Bills Amount:",
        claim.medicalBillsAmount ? `$${claim.medicalBillsAmount}` : "N/A",
      ],
      [
        "More Medical Expenses Expected:",
        claim.willHaveMoreMedicalExpenses ? "Yes" : "No",
      ],
    ]);

    addSection("Personal Information", [
      ["Client Name:", claim.clientName],
      ["Date of Birth:", claim.dateOfBirth],
      ["Social Security Number:", claim.socialSecurityNumber],
      ["Home Phone:", claim.phoneHome],
      ["Business Phone:", claim.phoneBusiness],
      ["Address:", claim.address],
      ["Permanent Address:", claim.permanentAddress],
      ["Florida Residence Duration:", claim.floridaResidenceDuration],
    ]);

    addSection("Accident Information", [
      ["Date of Accident:", claim.dateOfAccident],
      ["Time of Accident:", claim.accidentTime],
      ["Location:", claim.accidentLocation],
      ["Description:", claim.description],
      ["Was at Work:", claim.wasAtWork ? "Yes" : "No"],
      ["Was Injured:", claim.wasInjured ? "Yes" : "No"],
    ]);

    addSection("Vehicle Information", [
      [
        "Your Vehicle:",
        `${claim.vehicleYear} ${claim.vehicleMake} ${claim.vehicleModel} (${claim.vehicleColor})`,
      ],
      ["License Plate:", claim.vehicleLicensePlate],
      [
        "Other Vehicle:",
        `${claim.otherVehicleYear} ${claim.otherVehicleMake} ${claim.otherVehicleModel} (${claim.otherVehicleColor})`,
      ],
      ["Other Vehicle License Plate:", claim.otherVehicleLicensePlate],
    ]);

    if (claim.wasInjured) {
      addSection("Injury Information", [
        ["Injury Description:", claim.injuryDescription],
        ["Treated by Doctor:", claim.wasTreatedByDoctor ? "Yes" : "No"],
        ["Doctor's Name:", claim.doctorName],
        ["Doctor's Address:", claim.doctorAddress],
        ["Hospital Name:", claim.hospitalName],
        ["Hospital Address:", claim.hospitalAddress],
      ]);
    }

    if (claim.wasAtWork || claim.lostWages) {
      addSection("Employment Information", [
        ["Lost Wages:", claim.lostWages ? "Yes" : "No"],
        [
          "Wage Loss Amount:",
          claim.wageLossAmount ? `$${claim.wageLossAmount}` : "N/A",
        ],
        [
          "Average Weekly Wage:",
          claim.averageWeeklyWage ? `$${claim.averageWeeklyWage}` : "N/A",
        ],
        ["Disability Start Date:", claim.disabilityStartDate],
        ["Return to Work Date:", claim.returnToWorkDate],
      ]);

      if (claim.workersCompEligible) {
        addSection("Workers Compensation", [
          ["Workers Comp Eligible:", "Yes"],
          [
            "Workers Comp Amount:",
            claim.workersCompAmount ? `$${claim.workersCompAmount}` : "N/A",
          ],
          ["Workers Comp Period:", claim.workersCompPeriod],
        ]);
      }

      if (claim.employers && claim.employers.length > 0) {
        claim.employers.forEach((employer, index) => {
          addSection(`Employer ${index + 1} Details`, [
            ["Name:", employer.name],
            ["Address:", employer.address],
            ["Occupation:", employer.occupation],
            ["From Date:", employer.fromDate],
            ["To Date:", employer.toDate],
          ]);
        });
      }
    }

    if (claim.otherExpenses) {
      addSection("Other Expenses", [
        [
          "Description:",
          claim.otherExpensesDescription || "No description provided",
        ],
      ]);
    }

    if (
      claim.witnessName ||
      claim.witnessPhone ||
      claim.witnessAddress ||
      claim.witnessStatement
    ) {
      addSection("Witness Information", [
        ["Name:", claim.witnessName || "N/A"],
        ["Phone:", claim.witnessPhone || "N/A"],
        ["Address:", claim.witnessAddress || "N/A"],
        ["Statement:", claim.witnessStatement || "N/A"],
      ]);
    }

    // Add footer to the last page
    addFooter();

    // Add authorization pages
    addNewPage();

    // Medical Authorization
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Medical Authorization", margin, yPos);
    yPos += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("DO NOT DETACH", margin, yPos);
    yPos += 10;

    const medicalAuthText = [
      "THIS AUTHORIZATION OR PHOTOCOPY HEREOF, WILL AUTHORIZE YOU TO",
      "FURNISH ALL INFORMATION YOU MAY HAVE REGARDING MY CONDITION WHILE",
      "UNDER YOUR OBSERVATION OR TREATMENT, INCLUDING THE HISTORY",
      "OBTAINED, X-RAY AND PHYSICAL FINDINGS DIAGNOSIS AND PROGNOSIS. YOU",
      "ARE AUTHORIZED TO PROVIDE THIS INFORMATION IN ACCORDANCE WITH THE",
      'FLORIDA "NO FAULT" AUTO INSURANCE LAW (CHAPTER 71-252 F.S.)',
    ];

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    medicalAuthText.forEach((line) => {
      const lines = splitTextIntoLines(line, contentWidth);
      checkNewPage(10 * lines.length);
      lines.forEach((wrappedLine) => {
        doc.text(wrappedLine, margin, yPos);
        yPos += 10;
      });
    });
    yPos += 20;

    // Signature line for Medical Authorization
    checkNewPage(35);
    doc.setDrawColor(0);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 15;

    if (claim.medicalSignature && typeof claim.medicalSignature === "string") {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("SIGNATURE", margin, yPos);
      doc.addImage(
        claim.medicalSignature,
        "PNG",
        margin + 60,
        yPos - 10,
        50,
        20
      );
      doc.text("DATE", margin, yPos + 15);
      doc.setFont("helvetica", "normal");
      doc.text(claim.medicalSignatureDate || "N/A", margin + 60, yPos + 15);
    } else {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("SIGNATURE", margin, yPos);
      doc.text("DATE", margin, yPos + 15);
    }

    // Add footer to the Medical Authorization page
    addFooter();

    // Add new page for Wage Authorization
    addNewPage();

    // Wage Authorization
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Wage Authorization", margin, yPos);
    yPos += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("DO NOT DETACH", margin, yPos);
    yPos += 10;

    const wageAuthText = [
      "THIS AUTHORIZATION OR PHOTOCOPY HEREOF, WILL AUTHORIZE YOU TO",
      "FURNISH ALL INFORMATION YOU MAY HAVE REGARDING MY WAGES OR SALARY",
      "WHILE EMPLOYED BY YOU. YOU ARE AUTHORIZED TO PROVIDE THIS",
      'INFORMATION IN ACCORDANCE WITH THE FLORIDA "NO FAULT" AUTO',
      "INSURANCE LAW (CHAPTER 71-252 F.S.)",
    ];

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    wageAuthText.forEach((line) => {
      const lines = splitTextIntoLines(line, contentWidth);
      checkNewPage(10 * lines.length);
      lines.forEach((wrappedLine) => {
        doc.text(wrappedLine, margin, yPos);
        yPos += 10;
      });
    });
    yPos += 20;

    // Signature line for Wage Authorization
    checkNewPage(35);
    doc.setDrawColor(0);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 15;

    if (claim.wageSignature && typeof claim.wageSignature === "string") {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("SIGNATURE", margin, yPos);
      doc.addImage(claim.wageSignature, "PNG", margin + 60, yPos - 10, 50, 20);
      doc.text("DATE", margin, yPos + 15);
      doc.text("SOCIAL SECURITY NO.", margin, yPos + 30);
      doc.setFont("helvetica", "normal");
      doc.text(claim.wageSignatureDate || "N/A", margin + 60, yPos + 15);
      doc.text(claim.socialSecurityNumber || "N/A", margin + 60, yPos + 30);
    } else {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("SIGNATURE", margin, yPos);
      doc.text("DATE", margin, yPos + 15);
      doc.text("SOCIAL SECURITY NO.", margin, yPos + 30);
    }

    // Add footer to the Wage Authorization page
    addFooter();

    // Save the PDF
    doc.save(`claim-${claim.id}.pdf`);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">Current Claims</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ mb: 2 }}
        >
          New Claim
        </Button>
      </Box>

      {claims.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No claims found. Create your first claim to get started.
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Claim ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Insurance</TableCell>
                <TableCell>Actions</TableCell>
                <TableCell>PDF</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {claims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell>{claim.id}</TableCell>
                  <TableCell>{claim.date}</TableCell>
                  <TableCell>
                    <Box>
                      <Chip
                        label={
                          claim.status === "In Progress" &&
                          calculateProgress() === 100
                            ? "Finished"
                            : claim.status
                        }
                        color={
                          claim.status === "In Progress" &&
                          calculateProgress() === 100
                            ? "success"
                            : claim.status === "In Progress"
                            ? "primary"
                            : claim.status === "Pending Review"
                            ? "warning"
                            : "success"
                        }
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      {claim.status === "In Progress" && (
                        <Box
                          sx={{
                            width: "100%",
                            height: 4,
                            bgcolor: "grey.200",
                            borderRadius: 2,
                          }}
                        >
                          <Box
                            sx={{
                              width: `${calculateProgress()}%`,
                              height: "100%",
                              bgcolor:
                                calculateProgress() === 100
                                  ? "success.main"
                                  : "primary.main",
                              borderRadius: 2,
                              transition: "width 0.3s ease-in-out",
                            }}
                          />
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>{claim.type}</TableCell>
                  <TableCell>{claim.description}</TableCell>
                  <TableCell>{claim.clientName}</TableCell>
                  <TableCell>{claim.insuranceCompany}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleViewOpen(claim)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => generatePDF(claim)}
                      sx={{ color: "#1a237e" }}
                    >
                      <DownloadIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* New Claim Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="new-claim-modal"
        aria-describedby="new-claim-form"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "800px",
            maxHeight: "90vh",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            overflow: "auto",
          }}
        >
          <NoFaultForm onClose={handleClose} onSubmit={handleNewClaim} />
        </Box>
      </Modal>

      {/* View Claim Actions Modal */}
      <Modal
        open={viewModalOpen}
        onClose={handleViewClose}
        aria-labelledby="view-claim-actions-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "600px",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: "#1a237e" }}>
            Claim Action Requirements
          </Typography>
          <Typography variant="subtitle1" gutterBottom color="text.secondary">
            {selectedClaim?.description}
          </Typography>
          <List>
            {actionRequirements.map((action) => (
              <ListItem
                key={action.id}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  mb: 1,
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
                onClick={() => toggleActionCompletion(action.id)}
              >
                <ListItemIcon>
                  {action.completed ? (
                    <CheckCircleIcon sx={{ color: "success.main" }} />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={action.description}
                  sx={{
                    textDecoration: action.completed ? "line-through" : "none",
                    color: action.completed ? "text.secondary" : "text.primary",
                  }}
                />
              </ListItem>
            ))}
          </List>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleViewClose}>Close</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
