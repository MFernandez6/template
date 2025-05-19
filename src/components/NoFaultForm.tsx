"use client";

import { useState, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Divider,
  Checkbox,
  FormControlLabel,
  Paper,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SignaturePad from "react-signature-canvas";

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
  ownedVehicle: string;
  familyVehicle: string;
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
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  vehicleLicensePlate: string;
  otherVehicleMake: string;
  otherVehicleModel: string;
  otherVehicleYear: string;
  otherVehicleColor: string;
  otherVehicleLicensePlate: string;
  medicalSignature: string;
  medicalSignatureDate: string;
  wageSignature: string;
  wageSignatureDate: string;
}

interface NoFaultFormProps {
  onClose: () => void;
  onSubmit: (claim: Claim) => void;
}

export default function NoFaultForm({ onClose, onSubmit }: NoFaultFormProps) {
  const [formData, setFormData] = useState<Claim>({
    id: "",
    date: new Date().toISOString().split("T")[0],
    status: "In Progress",
    type: "No-Fault",
    description: "",
    clientName: "",
    insuranceCompany: "",
    policyNumber: "",
    claimNumber: "",
    adjusterName: "",
    adjusterPhone: "",
    dateOfAccident: "",
    fileNumber: "",
    medicalInsurance: "",
    medicalInsuranceId: "",
    phoneHome: "",
    phoneBusiness: "",
    address: "",
    dateOfBirth: "",
    socialSecurityNumber: "",
    permanentAddress: "",
    floridaResidenceDuration: "",
    accidentTime: "",
    accidentLocation: "",
    ownedVehicle: "",
    familyVehicle: "",
    wasInjured: false,
    injuryDescription: "",
    wasTreatedByDoctor: false,
    doctorName: "",
    doctorAddress: "",
    hospitalType: "",
    hospitalName: "",
    hospitalAddress: "",
    medicalBillsAmount: "",
    willHaveMoreMedicalExpenses: false,
    wasAtWork: false,
    lostWages: false,
    wageLossAmount: "",
    averageWeeklyWage: "",
    disabilityStartDate: "",
    returnToWorkDate: "",
    workersCompEligible: false,
    workersCompAmount: "",
    workersCompPeriod: "",
    employers: [
      { name: "", address: "", occupation: "", fromDate: "", toDate: "" },
    ],
    otherExpenses: false,
    otherExpensesDescription: "",
    medicalAuthorization: false,
    wageAuthorization: false,
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleColor: "",
    vehicleLicensePlate: "",
    otherVehicleMake: "",
    otherVehicleModel: "",
    otherVehicleYear: "",
    otherVehicleColor: "",
    otherVehicleLicensePlate: "",
    medicalSignature: "",
    medicalSignatureDate: "",
    wageSignature: "",
    wageSignatureDate: "",
  });

  const [showMedicalSignature, setShowMedicalSignature] = useState(false);
  const [showWageSignature, setShowWageSignature] = useState(false);
  const medicalSignatureRef = useRef<SignaturePad>(null);
  const wageSignatureRef = useRef<SignaturePad>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const target = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [target.name as string]:
        target.type === "checkbox" ? target.checked : target.value,
    }));
  };

  const handleSignatureSave = (type: "medical" | "wage") => {
    const signaturePad =
      type === "medical"
        ? medicalSignatureRef.current
        : wageSignatureRef.current;
    if (signaturePad) {
      const signature = signaturePad.toDataURL();
      const today = new Date().toISOString().split("T")[0];
      setFormData((prev) => ({
        ...prev,
        [`${type}Signature`]: signature,
        [`${type}SignatureDate`]: today,
      }));
      if (type === "medical") {
        setShowMedicalSignature(false);
      } else {
        setShowWageSignature(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate a unique claim ID
    const claimId = `NF-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 1000)
    ).padStart(3, "0")}`;

    // Create the new claim object
    const newClaim: Claim = {
      ...formData,
      id: claimId,
    };

    // Pass the new claim back to the parent component
    onSubmit(newClaim);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ color: "#1a237e", fontWeight: 600 }}>
          Application for Florida &ldquo;No Fault&rdquo; Benefits
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <Stack spacing={3}>
        {/* Insurance Information Section */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: "#f8f9fa", borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ color: "#1a237e" }}>
            Insurance Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
              <TextField
                fullWidth
                label="Name of Auto Insurance Company"
                name="insuranceCompany"
                value={formData.insuranceCompany}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </Box>
            <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
              <TextField
                fullWidth
                label="Policy Number"
                name="policyNumber"
                value={formData.policyNumber}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </Box>
            <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
              <TextField
                fullWidth
                label="Claim Number"
                name="claimNumber"
                value={formData.claimNumber}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </Box>
            <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
              <TextField
                fullWidth
                label="File Number"
                name="fileNumber"
                value={formData.fileNumber}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </Box>
            <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
              <TextField
                fullWidth
                label="Name of Auto Adjuster"
                name="adjusterName"
                value={formData.adjusterName}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </Box>
            <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
              <TextField
                fullWidth
                label="Phone Number for Auto Adjuster"
                name="adjusterPhone"
                value={formData.adjusterPhone}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </Box>
            <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
              <TextField
                fullWidth
                label="Medical Insurance"
                name="medicalInsurance"
                value={formData.medicalInsurance}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </Box>
            <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
              <TextField
                fullWidth
                label="Medical Insurance ID"
                name="medicalInsuranceId"
                value={formData.medicalInsuranceId}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </Box>
          </Box>
        </Paper>

        {/* Personal Information Section */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: "#f8f9fa", borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ color: "#1a237e" }}>
            Personal Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
              <TextField
                fullWidth
                label="Your Name"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </Box>
            <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </Box>
            <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
              <TextField
                fullWidth
                label="Social Security Number"
                name="socialSecurityNumber"
                value={formData.socialSecurityNumber}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </Box>
            <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
              <TextField
                fullWidth
                label="Home Phone"
                name="phoneHome"
                value={formData.phoneHome}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </Box>
            <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
              <TextField
                fullWidth
                label="Business Phone"
                name="phoneBusiness"
                value={formData.phoneBusiness}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </Box>
            <Box sx={{ flex: "1 1 100%", minWidth: 0 }}>
              <TextField
                fullWidth
                label="Address (No, Street, City or Town, State and Zip Code)"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </Box>
            <Box sx={{ flex: "1 1 100%", minWidth: 0 }}>
              <TextField
                fullWidth
                label="Permanent Address (if different)"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </Box>
            <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
              <TextField
                fullWidth
                label="How long have you lived in Florida?"
                name="floridaResidenceDuration"
                value={formData.floridaResidenceDuration}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </Box>
          </Box>
        </Paper>

        {/* Accident Information Section */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: "#f8f9fa", borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ color: "#1a237e" }}>
            Accident Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
              <TextField
                fullWidth
                label="Date of Accident"
                name="dateOfAccident"
                type="date"
                value={formData.dateOfAccident}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </Box>
            <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
              <TextField
                fullWidth
                label="Time of Accident"
                name="accidentTime"
                type="time"
                value={formData.accidentTime}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </Box>
            <Box sx={{ flex: "1 1 100%", minWidth: 0 }}>
              <TextField
                fullWidth
                label="Place of Accident (Street, City or Town and State)"
                name="accidentLocation"
                value={formData.accidentLocation}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </Box>
            <Box sx={{ flex: "1 1 100%", minWidth: 0 }}>
              <TextField
                fullWidth
                label="Brief Description of Accident and Vehicles Involved"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                multiline
                rows={3}
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </Box>
            <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
              <TextField
                fullWidth
                label="Describe Motor Vehicle You Own"
                name="ownedVehicle"
                value={formData.ownedVehicle}
                onChange={handleChange}
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </Box>
            <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
              <TextField
                fullWidth
                label="Describe Motor Vehicle Owned by Any Member of Your Family"
                name="familyVehicle"
                value={formData.familyVehicle}
                onChange={handleChange}
                variant="outlined"
                sx={{ bgcolor: "white" }}
              />
            </Box>
          </Box>
        </Paper>

        {/* Your Vehicle Information */}
        <Typography variant="subtitle1" sx={{ mt: 3, mb: 2, color: "#1a237e" }}>
          Your Vehicle Information
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <TextField
            fullWidth
            label="Make"
            name="vehicleMake"
            value={formData.vehicleMake}
            onChange={handleChange}
            required
            sx={{ flex: "1 1 200px" }}
          />
          <TextField
            fullWidth
            label="Model"
            name="vehicleModel"
            value={formData.vehicleModel}
            onChange={handleChange}
            required
            sx={{ flex: "1 1 200px" }}
          />
          <TextField
            fullWidth
            label="Year"
            name="vehicleYear"
            value={formData.vehicleYear}
            onChange={handleChange}
            required
            sx={{ flex: "1 1 150px" }}
          />
          <TextField
            fullWidth
            label="Color"
            name="vehicleColor"
            value={formData.vehicleColor}
            onChange={handleChange}
            required
            sx={{ flex: "1 1 150px" }}
          />
          <TextField
            fullWidth
            label="License Plate"
            name="vehicleLicensePlate"
            value={formData.vehicleLicensePlate}
            onChange={handleChange}
            required
            sx={{ flex: "1 1 200px" }}
          />
        </Box>

        {/* Other Vehicle Information */}
        <Typography variant="subtitle1" sx={{ mt: 3, mb: 2, color: "#1a237e" }}>
          Other Vehicle Information
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <TextField
            fullWidth
            label="Make"
            name="otherVehicleMake"
            value={formData.otherVehicleMake}
            onChange={handleChange}
            required
            sx={{ flex: "1 1 200px" }}
          />
          <TextField
            fullWidth
            label="Model"
            name="otherVehicleModel"
            value={formData.otherVehicleModel}
            onChange={handleChange}
            required
            sx={{ flex: "1 1 200px" }}
          />
          <TextField
            fullWidth
            label="Year"
            name="otherVehicleYear"
            value={formData.otherVehicleYear}
            onChange={handleChange}
            required
            sx={{ flex: "1 1 150px" }}
          />
          <TextField
            fullWidth
            label="Color"
            name="otherVehicleColor"
            value={formData.otherVehicleColor}
            onChange={handleChange}
            required
            sx={{ flex: "1 1 150px" }}
          />
          <TextField
            fullWidth
            label="License Plate"
            name="otherVehicleLicensePlate"
            value={formData.otherVehicleLicensePlate}
            onChange={handleChange}
            required
            sx={{ flex: "1 1 200px" }}
          />
        </Box>

        {/* Injury Information Section */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: "#f8f9fa", borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ color: "#1a237e" }}>
            Injury Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="wasInjured"
                  checked={formData.wasInjured}
                  onChange={handleChange}
                />
              }
              label="Were you injured as a result of this accident?"
            />
            {formData.wasInjured && (
              <>
                <TextField
                  fullWidth
                  label="Describe Your Injury"
                  name="injuryDescription"
                  value={formData.injuryDescription}
                  onChange={handleChange}
                  required
                  multiline
                  rows={2}
                  variant="outlined"
                  sx={{ bgcolor: "white" }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="wasTreatedByDoctor"
                      checked={formData.wasTreatedByDoctor}
                      onChange={handleChange}
                    />
                  }
                  label="Were you treated by a doctor?"
                />
                {formData.wasTreatedByDoctor && (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
                      <TextField
                        fullWidth
                        label="Doctor's Name"
                        name="doctorName"
                        value={formData.doctorName}
                        onChange={handleChange}
                        variant="outlined"
                        sx={{ bgcolor: "white" }}
                      />
                    </Box>
                    <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
                      <TextField
                        fullWidth
                        label="Doctor's Address"
                        name="doctorAddress"
                        value={formData.doctorAddress}
                        onChange={handleChange}
                        variant="outlined"
                        sx={{ bgcolor: "white" }}
                      />
                    </Box>
                  </Box>
                )}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
                    <TextField
                      fullWidth
                      label="Hospital Name"
                      name="hospitalName"
                      value={formData.hospitalName}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{ bgcolor: "white" }}
                    />
                  </Box>
                  <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
                    <TextField
                      fullWidth
                      label="Hospital Address"
                      name="hospitalAddress"
                      value={formData.hospitalAddress}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{ bgcolor: "white" }}
                    />
                  </Box>
                </Box>
                <TextField
                  fullWidth
                  label="Amount of Medical Bills to Date"
                  name="medicalBillsAmount"
                  value={formData.medicalBillsAmount}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ bgcolor: "white" }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="willHaveMoreMedicalExpenses"
                      checked={formData.willHaveMoreMedicalExpenses}
                      onChange={handleChange}
                    />
                  }
                  label="Will you have more medical expenses?"
                />
              </>
            )}
          </Box>
        </Paper>

        {/* Employment Information Section */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: "#f8f9fa", borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ color: "#1a237e" }}>
            Employment Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="wasAtWork"
                  checked={formData.wasAtWork}
                  onChange={handleChange}
                />
              }
              label="At the time of your accident, were you in the course of your employment?"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="lostWages"
                  checked={formData.lostWages}
                  onChange={handleChange}
                />
              }
              label="Did you lose wages or salary as a result of your injury?"
            />
            {formData.lostWages && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
                  <TextField
                    fullWidth
                    label="Amount of Loss to Date"
                    name="wageLossAmount"
                    value={formData.wageLossAmount}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ bgcolor: "white" }}
                  />
                </Box>
                <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
                  <TextField
                    fullWidth
                    label="Average Weekly Wage or Salary"
                    name="averageWeeklyWage"
                    value={formData.averageWeeklyWage}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ bgcolor: "white" }}
                  />
                </Box>
                <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
                  <TextField
                    fullWidth
                    label="Date Disability from Work Began"
                    name="disabilityStartDate"
                    type="date"
                    value={formData.disabilityStartDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    sx={{ bgcolor: "white" }}
                  />
                </Box>
                <Box sx={{ flex: "1 1 300px", minWidth: 0 }}>
                  <TextField
                    fullWidth
                    label="Date You Returned to Work"
                    name="returnToWorkDate"
                    type="date"
                    value={formData.returnToWorkDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    sx={{ bgcolor: "white" }}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Paper>

        {/* Authorizations Section */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: "#f8f9fa", borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ color: "#1a237e" }}>
            Required Authorizations
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={2}>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    name="medicalAuthorization"
                    checked={formData.medicalAuthorization}
                    onChange={handleChange}
                    required
                  />
                }
                label={
                  <Typography variant="body2" component="div" paragraph>
                    This authorization or photocopy hereof, will authorize you
                    to furnish all information you may have regarding my
                    condition while under your observation or treatment,
                    including the history obtained, x-ray and physical findings
                    diagnosis and prognosis. You are authorized to provide this
                    information in accordance with the Florida &ldquo;No
                    Fault&rdquo; Auto Insurance Law (Chapter 71-252 F.S.)
                  </Typography>
                }
              />
              <Box
                sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}
              >
                <Button
                  variant="outlined"
                  onClick={() => setShowMedicalSignature(true)}
                  sx={{ minWidth: 150 }}
                >
                  {formData.medicalSignature ? "Re-sign" : "Sign"}
                </Button>
                {formData.medicalSignature && (
                  <Typography
                    variant="body2"
                    component="div"
                    color="text.secondary"
                  >
                    Signed on {formData.medicalSignatureDate}
                  </Typography>
                )}
              </Box>
            </Box>

            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    name="wageAuthorization"
                    checked={formData.wageAuthorization}
                    onChange={handleChange}
                    required
                  />
                }
                label={
                  <Typography variant="body2" component="div" paragraph>
                    This authorization or photocopy hereof, will authorize you
                    to furnish all information you may have regarding my wages
                    or salary while employed by you. You are authorized to
                    provide this information in accordance with the Florida
                    &ldquo;No Fault&rdquo; Auto Insurance Law (Chapter 71-252
                    F.S.)
                  </Typography>
                }
              />
              <Box
                sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}
              >
                <Button
                  variant="outlined"
                  onClick={() => setShowWageSignature(true)}
                  sx={{ minWidth: 150 }}
                >
                  {formData.wageSignature ? "Re-sign" : "Sign"}
                </Button>
                {formData.wageSignature && (
                  <Typography
                    variant="body2"
                    component="div"
                    color="text.secondary"
                  >
                    Signed on {formData.wageSignatureDate}
                  </Typography>
                )}
              </Box>
            </Box>
          </Stack>
        </Paper>

        {/* Signature Modals */}
        <Modal
          open={showMedicalSignature}
          onClose={() => setShowMedicalSignature(false)}
          aria-labelledby="medical-signature-modal"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Sign Medical Authorization
            </Typography>
            <Box sx={{ border: "1px solid #ccc", mb: 2 }}>
              <SignaturePad
                ref={medicalSignatureRef}
                canvasProps={{
                  width: 360,
                  height: 200,
                  className: "signature-canvas",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button onClick={() => setShowMedicalSignature(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSignatureSave("medical")}
                sx={{ backgroundColor: "#1a237e" }}
              >
                Save Signature
              </Button>
            </Box>
          </Box>
        </Modal>

        <Modal
          open={showWageSignature}
          onClose={() => setShowWageSignature(false)}
          aria-labelledby="wage-signature-modal"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Sign Wage Authorization
            </Typography>
            <Box sx={{ border: "1px solid #ccc", mb: 2 }}>
              <SignaturePad
                ref={wageSignatureRef}
                canvasProps={{
                  width: 360,
                  height: 200,
                  className: "signature-canvas",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button onClick={() => setShowWageSignature(false)}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSignatureSave("wage")}
                sx={{ backgroundColor: "#1a237e" }}
              >
                Save Signature
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Form Actions */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 2,
          }}
        >
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#1a237e",
              "&:hover": {
                backgroundColor: "#0d47a1",
              },
            }}
          >
            Submit Claim
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
