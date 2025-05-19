import connectDB from "../lib/mongodb";
import Claim from "../models/Claim";

const sampleClaims = [
  {
    id: "CLM001",
    date: new Date().toISOString().split("T")[0],
    status: "In Progress",
    type: "No-Fault",
    description: "Car accident on I-95",
    clientName: "John Smith",
    insuranceCompany: "State Farm",
    policyNumber: "SF123456789",
    claimNumber: "CN987654321",
    adjusterName: "Sarah Johnson",
    adjusterPhone: "555-0123",
    dateOfAccident: "2024-03-15",
    fileNumber: "FN001",
    medicalInsurance: "Blue Cross Blue Shield",
    medicalInsuranceId: "BCBS123456",
    phoneHome: "555-0124",
    phoneBusiness: "555-0125",
    address: "123 Main St, Miami, FL 33101",
    dateOfBirth: "1985-06-15",
    socialSecurityNumber: "123-45-6789",
    permanentAddress: "123 Main St, Miami, FL 33101",
    floridaResidenceDuration: "5 years",
    accidentTime: "14:30",
    accidentLocation: "I-95 North, Exit 12",
    vehicleYear: "2020",
    vehicleMake: "Toyota",
    vehicleModel: "Camry",
    vehicleColor: "Silver",
    vehicleLicensePlate: "ABC123",
    otherVehicleYear: "2019",
    otherVehicleMake: "Honda",
    otherVehicleModel: "Civic",
    otherVehicleColor: "Blue",
    otherVehicleLicensePlate: "XYZ789",
    wasInjured: true,
    injuryDescription: "Whiplash and back pain",
    wasTreatedByDoctor: true,
    doctorName: "Dr. Michael Brown",
    doctorAddress: "456 Medical Center Dr, Miami, FL 33102",
    hospitalType: "Emergency Room",
    hospitalName: "Miami General Hospital",
    hospitalAddress: "789 Hospital Ave, Miami, FL 33103",
    medicalBillsAmount: "2500",
    willHaveMoreMedicalExpenses: true,
    wasAtWork: false,
    lostWages: true,
    wageLossAmount: "1500",
    averageWeeklyWage: "750",
    disabilityStartDate: "2024-03-15",
    returnToWorkDate: "2024-04-01",
    workersCompEligible: false,
    workersCompAmount: "0",
    workersCompPeriod: "N/A",
    employers: [
      {
        name: "Tech Solutions Inc",
        address: "321 Business Park, Miami, FL 33104",
        occupation: "Software Developer",
        fromDate: "2020-01-01",
        toDate: "Present",
      },
    ],
    otherExpenses: true,
    otherExpensesDescription: "Rental car and transportation costs",
    medicalAuthorization: true,
    wageAuthorization: true,
    userId: "user_123",
  },
  {
    id: "CLM002",
    date: new Date().toISOString().split("T")[0],
    status: "Finished",
    type: "No-Fault",
    description: "Rear-end collision on US-1",
    clientName: "Maria Garcia",
    insuranceCompany: "Progressive",
    policyNumber: "PR987654321",
    claimNumber: "CN123456789",
    adjusterName: "Robert Wilson",
    adjusterPhone: "555-0126",
    dateOfAccident: "2024-02-28",
    fileNumber: "FN002",
    medicalInsurance: "Aetna",
    medicalInsuranceId: "AET789012",
    phoneHome: "555-0127",
    phoneBusiness: "555-0128",
    address: "456 Oak Ave, Miami, FL 33105",
    dateOfBirth: "1990-03-20",
    socialSecurityNumber: "987-65-4321",
    permanentAddress: "456 Oak Ave, Miami, FL 33105",
    floridaResidenceDuration: "3 years",
    accidentTime: "09:15",
    accidentLocation: "US-1, near 72nd St",
    vehicleYear: "2021",
    vehicleMake: "Honda",
    vehicleModel: "Accord",
    vehicleColor: "Black",
    vehicleLicensePlate: "DEF456",
    otherVehicleYear: "2022",
    otherVehicleMake: "Ford",
    otherVehicleModel: "Focus",
    otherVehicleColor: "Red",
    otherVehicleLicensePlate: "UVW123",
    wasInjured: false,
    injuryDescription: "",
    wasTreatedByDoctor: false,
    doctorName: "",
    doctorAddress: "",
    hospitalType: "",
    hospitalName: "",
    hospitalAddress: "",
    medicalBillsAmount: "0",
    willHaveMoreMedicalExpenses: false,
    wasAtWork: true,
    lostWages: false,
    wageLossAmount: "0",
    averageWeeklyWage: "1000",
    disabilityStartDate: "",
    returnToWorkDate: "",
    workersCompEligible: false,
    workersCompAmount: "0",
    workersCompPeriod: "N/A",
    employers: [
      {
        name: "Miami Law Firm",
        address: "789 Legal Plaza, Miami, FL 33106",
        occupation: "Paralegal",
        fromDate: "2021-06-01",
        toDate: "Present",
      },
    ],
    otherExpenses: true,
    otherExpensesDescription: "Vehicle repair and rental car",
    medicalAuthorization: false,
    wageAuthorization: false,
    userId: "user_123",
  },
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("Connected to MongoDB");

    console.log("Clearing existing claims...");
    await Claim.deleteMany({});
    console.log("Cleared existing claims");

    console.log("Inserting sample claims...");
    await Claim.insertMany(sampleClaims);
    console.log("Sample claims inserted successfully");

    console.log("Seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
