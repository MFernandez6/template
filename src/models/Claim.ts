import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    insuranceCompany: {
      type: String,
      required: true,
    },
    policyNumber: {
      type: String,
      required: true,
    },
    claimNumber: {
      type: String,
      required: true,
    },
    adjusterName: {
      type: String,
      required: true,
    },
    adjusterPhone: {
      type: String,
      required: true,
    },
    dateOfAccident: {
      type: String,
      required: true,
    },
    fileNumber: {
      type: String,
      required: true,
    },
    medicalInsurance: {
      type: String,
      required: true,
    },
    medicalInsuranceId: {
      type: String,
      required: true,
    },
    phoneHome: {
      type: String,
      required: true,
    },
    phoneBusiness: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    socialSecurityNumber: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    floridaResidenceDuration: {
      type: String,
      required: true,
    },
    accidentTime: {
      type: String,
      required: true,
    },
    accidentLocation: {
      type: String,
      required: true,
    },
    vehicleYear: {
      type: String,
      required: true,
    },
    vehicleMake: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    vehicleColor: {
      type: String,
      required: true,
    },
    vehicleLicensePlate: {
      type: String,
      required: true,
    },
    otherVehicleYear: {
      type: String,
      required: true,
    },
    otherVehicleMake: {
      type: String,
      required: true,
    },
    otherVehicleModel: {
      type: String,
      required: true,
    },
    otherVehicleColor: {
      type: String,
      required: true,
    },
    otherVehicleLicensePlate: {
      type: String,
      required: true,
    },
    wasInjured: {
      type: Boolean,
      required: true,
    },
    injuryDescription: {
      type: String,
    },
    wasTreatedByDoctor: {
      type: Boolean,
      required: true,
    },
    doctorName: {
      type: String,
    },
    doctorAddress: {
      type: String,
    },
    hospitalType: {
      type: String,
    },
    hospitalName: {
      type: String,
    },
    hospitalAddress: {
      type: String,
    },
    medicalBillsAmount: {
      type: String,
    },
    willHaveMoreMedicalExpenses: {
      type: Boolean,
      required: true,
    },
    wasAtWork: {
      type: Boolean,
      required: true,
    },
    lostWages: {
      type: Boolean,
      required: true,
    },
    wageLossAmount: {
      type: String,
    },
    averageWeeklyWage: {
      type: String,
    },
    disabilityStartDate: {
      type: String,
    },
    returnToWorkDate: {
      type: String,
    },
    workersCompEligible: {
      type: Boolean,
      required: true,
    },
    workersCompAmount: {
      type: String,
    },
    workersCompPeriod: {
      type: String,
    },
    employers: [
      {
        name: String,
        address: String,
        occupation: String,
        fromDate: String,
        toDate: String,
      },
    ],
    otherExpenses: {
      type: Boolean,
      required: true,
    },
    otherExpensesDescription: {
      type: String,
    },
    medicalAuthorization: {
      type: Boolean,
      required: true,
    },
    wageAuthorization: {
      type: Boolean,
      required: true,
    },
    medicalSignature: {
      type: String,
    },
    medicalSignatureDate: {
      type: String,
    },
    wageSignature: {
      type: String,
    },
    wageSignatureDate: {
      type: String,
    },
    witnessName: {
      type: String,
    },
    witnessPhone: {
      type: String,
    },
    witnessAddress: {
      type: String,
    },
    witnessStatement: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for faster queries
claimSchema.index({ userId: 1 });
claimSchema.index({ id: 1 });
claimSchema.index({ date: -1 });
claimSchema.index({ status: 1 });

export default mongoose.models.Claim || mongoose.model("Claim", claimSchema);
