"use client";

import { Container, Box, Paper, Typography, Divider } from "@mui/material";
import UploadButton from "@/components/UploadButton";
import DocumentList from "@/components/DocumentList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CategoryIcon from "@mui/icons-material/Category";
import Image from "next/image";
import NoFaultClaims from "@/components/NoFaultClaims";

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

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [latestClaim, setLatestClaim] = useState<Claim | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionRequirements, setActionRequirements] = useState([
    {
      id: "1",
      description: "Complete No-Fault Form",
      completed: true,
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

  // Handle action requirement updates from NoFaultClaims
  const handleActionUpdate = (
    updatedRequirements: typeof actionRequirements
  ) => {
    setActionRequirements(updatedRequirements);

    // Update claim status if all tasks are completed
    if (latestClaim && updatedRequirements.every((task) => task.completed)) {
      const updatedClaim = { ...latestClaim, status: "Finished" };
      setLatestClaim(updatedClaim);

      // Update the claim in the database
      fetch(`/api/claims/${latestClaim.id}`, {
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

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Fetch latest claim
  useEffect(() => {
    const fetchLatestClaim = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch("/api/claims");
        if (!response.ok) {
          throw new Error("Failed to fetch claims");
        }
        const claims = await response.json();
        setLatestClaim(claims[0] || null); // Get the most recent claim
      } catch (err) {
        console.error("Error fetching latest claim:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestClaim();
  }, [session?.user?.id]);

  if (status === "loading" || loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!session) {
    return null;
  }

  const handleUploadComplete = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src="/images/long-logo-ClaimSaver.jpg"
          alt="ClaimSaver Logo"
          width={400}
          height={100}
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "100%",
            objectFit: "contain",
          }}
          priority
        />
      </Box>

      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          mb: 3,
        }}
      >
        {/* Claim Information */}
        <Box sx={{ width: { xs: "100%", md: "33%" } }}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Claim Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {latestClaim ? (
              <>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <AssignmentIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Claim ID
                    </Typography>
                    <Typography variant="body1">{latestClaim.id}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <CategoryIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Status
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 0.5 }}>
                      {latestClaim.status === "In Progress" &&
                      calculateProgress() === 100
                        ? "Finished"
                        : latestClaim.status}
                    </Typography>
                    {latestClaim.status === "In Progress" && (
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
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <DescriptionIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Type
                    </Typography>
                    <Typography variant="body1">{latestClaim.type}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <CalendarTodayIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Date
                    </Typography>
                    <Typography variant="body1">{latestClaim.date}</Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: "auto" }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    gutterBottom
                  >
                    Description
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {latestClaim.description}
                  </Typography>
                </Box>
              </>
            ) : (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No claims found. Create your first claim to get started.
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>

        {/* Document Upload Section */}
        <Box sx={{ width: { xs: "100%", md: "67%" } }}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">Documents</Typography>
              {latestClaim && (
                <UploadButton
                  claimId={latestClaim.id}
                  uploadedBy={
                    session.user?.email || session.user?.name || "anonymous"
                  }
                  onUploadComplete={handleUploadComplete}
                />
              )}
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ flex: 1, overflow: "auto" }}>
              {latestClaim ? (
                <DocumentList key={refreshTrigger} claimId={latestClaim.id} />
              ) : (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No documents available. Create a claim to upload documents.
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* No-Fault Claims Section */}
      <NoFaultClaims onActionUpdate={handleActionUpdate} />
    </Container>
  );
}
