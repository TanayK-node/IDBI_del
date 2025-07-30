import React from "react";
import Card from "../../components/Card/index";
import InfoBox from "../../components/InfoBox/index";
import { useBasicData } from "../../../context/Basic";


// FieldDisplay Props
interface FieldDisplayProps {
  label: string;
  value: string;
  className?: string;
}

// Field Display Component - matches image styling
function FieldDisplay({ label, value, className = "" }: FieldDisplayProps) {
  return (
    <div className={`${className}`}>
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-sm font-medium text-gray-900 leading-relaxed">
        {value || "Not provided"}
      </div>
    </div>
  );
}

// SectionHeader Props
interface SectionHeaderProps {
  title: string;
}

// Section Header Component - matches image styling
function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <h3 className="text-base font-semibold text-gray-900 mb-4">{title}</h3>
  );
}

// RadioOption Props
interface RadioOptionProps {
  label: string;
  isSelected: boolean;
}

// Radio Button Display Component - matches image styling
function RadioOption({ label, isSelected }: RadioOptionProps) {
  return (
    <div className="flex items-start space-x-3 mb-3">
      <div
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5 ${
          isSelected ? "border-blue-500 bg-white" : "border-gray-400"
        }`}
      >
        {isSelected && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
      </div>
      <span className="text-sm text-gray-700 leading-relaxed">{label}</span>
    </div>
  );
}

// CheckboxOption Props
interface CheckboxOptionProps {
  label: string;
  isSelected: boolean;
}

// Checkbox Display Component - matches image styling
function CheckboxOption({ label, isSelected }: CheckboxOptionProps) {
  return (
    <div className="flex items-start space-x-3">
      <div
        className={`w-4 h-4 border-2 rounded flex items-center justify-center mt-0.5 ${
          isSelected
            ? "border-gray-400 bg-gray-200"
            : "border-gray-400 bg-white"
        }`}
      >
        {isSelected && (
          <svg
            className="w-2.5 h-2.5 text-gray-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <span className="text-sm text-gray-700 leading-relaxed">{label}</span>
    </div>
  );
}
function formatMaskedAadhaar(aadhaar: string): string {
  const clean = aadhaar.replace(/\D/g, "").slice(0, 12);
  const masked = clean
    .split("")
    .map((digit, i) => (i < 8 ? "X" : digit))
    .join("");

  return masked.replace(/(.{4})/g, "$1 ").trim(); // adds spaces every 4 digits
}
   

export { FieldDisplay, SectionHeader, RadioOption, CheckboxOption };

// Main Component
export default function DetailsCard() {
  const { basicData } = useBasicData();
  // Sample data - this will be replaced with context data
  const customerData = {
    // Basic Details
    name: "Rajesh Kumar",
    aadhaarNumber: "XXXXXXXXXXXX34",
    gender: "Male",
    dateOfBirth: "05/07/1997",

    // Address Details
    addressLine1: "403 Matru Vatsalya",
    addressLine2: "S.V Road of V.p road",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400058",

    // Communication Address
    communicationOption: "bank", // "bank" or "aadhaar"
    addressType: "Home",

    // Personal Details
    emailId: "Rajesh456@gmail.com",
    maritalStatus: "Unmarried",
    fatherName: "Ramesh Kumar",
    motherName: "Sunita devi",

    // Professional Details
    occupation: "Professor",
    organizationType: "Salaried",
    organizationName: "ABC Inc.",
    sourceOfFunds: "Professor",
    grossAnnualIncome: "₹12,00,000.00",
    savingsAccountType: "Salary",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="p-8 space-y-8">
        {/* Basic Details */}
        <div>
          <SectionHeader title="Basic Details" />
          <div className="flex flex-wrap gap-x-16 gap-y-6">
            <FieldDisplay label="Name" value={basicData.name || "Not Provided"} />
            <FieldDisplay
              label="Aadhaar Number"
              value={formatMaskedAadhaar(basicData.aadhaarNumber)}
            />
            <FieldDisplay label="Gender" value={basicData.gender || "Not Provided"} />
            <FieldDisplay
              label="Date of Birth"
              value={basicData.dateOfBirth || "Not Provided"} 
            />
            <div>
              <SectionHeader title="Permanent Address" />
              <div className="flex flex-wrap gap-x-16 gap-y-6">
                <FieldDisplay
                  label="Address Line 1"
                  value={customerData.addressLine1}
                />
                <FieldDisplay
                  label="Address Line 2"
                  value={customerData.addressLine2}
                />
                <FieldDisplay label="City" value={customerData.city} />
                <FieldDisplay label="State" value={customerData.state} />
                <FieldDisplay label="Pincode" value={customerData.pincode} />
              </div>
            </div>
          </div>
        </div>
        <hr className="bg-gray-600"></hr>

        {/* Communication Address */}
        <div>
          <SectionHeader title="Communication Address" />
          <div className="p-2">
            <InfoBox message="All communication from the bank will be received on Communication address" />
          </div>
          <div className="mb-4">
            <CheckboxOption
              label="Communication address same as Aadhar card address."
              isSelected={customerData.communicationOption === "aadhaar"}
            />
          </div>
          <div className="flex flex-wrap">
            <FieldDisplay
              label="Address Type"
              value={customerData.addressType}
            />
          </div>
        </div>
        <hr className="bg-gray-600"></hr>
        {/* Personal Details */}
        <div>
          <SectionHeader title="Personal Details" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
            <FieldDisplay label="Email ID" value={customerData.emailId} />
            <FieldDisplay
              label="Marital Status"
              value={customerData.maritalStatus}
            />
            <FieldDisplay
              label="Father's Name"
              value={customerData.fatherName}
            />
            <FieldDisplay
              label="Mother's Name"
              value={customerData.motherName}
            />
          </div>
        </div>

        <hr className="bg-gray-600"></hr>
        {/* Professional Details */}
        <div>
          <SectionHeader title="Professional Details" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            <FieldDisplay label="Occupation" value={customerData.occupation} />
            <FieldDisplay
              label="Organization Type"
              value={customerData.organizationType}
            />
            <FieldDisplay
              label="Organization Name"
              value={customerData.organizationName}
            />
            <FieldDisplay
              label="Source of Funds"
              value={customerData.sourceOfFunds}
            />
            <FieldDisplay
              label="Gross Annual Income *"
              value={customerData.grossAnnualIncome}
            />
            <FieldDisplay
              label="Savings Account Type"
              value={customerData.savingsAccountType}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
