"use client";
import React, { useState } from "react";
import TextBox from "../../../components/TextBox/index"; // Adjust path as needed
import Button from "../../../components/Button/index"; // Adjust path as needed
import Dropdown from "../../../components/DropBox/index";
import Accordion from "../../../components/Accord/index";

interface ProfessionalDetailsProps {
  onSave?: (data: ProfessionalDetailsData) => void;
  className?: string;
}

export interface ProfessionalDetailsData {
  occupation: string;
  organizationType: string;
  organizationName: string;
  sourceOfFunds: string;
  grossAnnualIncome: string;
  savingsAccountType: string;
}

const ProfessionalDetails: React.FC<ProfessionalDetailsProps> = ({
  onSave,
  className = "",
}) => {
  const [isVerified, setIsVerified] = useState(false);
  const [formData, setFormData] = useState<ProfessionalDetailsData>({
    occupation: "",
    organizationType: "",
    organizationName: "",
    sourceOfFunds: "",
    grossAnnualIncome: "",
    savingsAccountType: "",
  });

  const handleInputChange = (
    field: keyof ProfessionalDetailsData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const isFormValid =
      formData.occupation.trim() !== "" &&
      formData.organizationType.trim() !== "" &&
      formData.organizationName.trim() !== "" &&
      formData.sourceOfFunds.trim() !== "" &&
      formData.grossAnnualIncome.trim() !== "" &&
      formData.savingsAccountType.trim() !== "";

    if (isFormValid) {
      setIsVerified(true);
      onSave?.(formData);
      console.log("Professional details saved:", formData);
    }
  };

  const isFormValid =
    formData.occupation.trim() !== "" &&
    formData.organizationType.trim() !== "" &&
    formData.organizationName.trim() !== "" &&
    formData.sourceOfFunds.trim() !== "" &&
    formData.grossAnnualIncome.trim() !== "" &&
    formData.savingsAccountType.trim() !== "";

  // Dropdown options
  const occupationOptions = [
    { value: "employed", label: "Employed" },
    { value: "self-employed", label: "Self Employed" },
    { value: "business", label: "Business" },
    { value: "student", label: "Student" },
    { value: "retired", label: "Retired" },
    { value: "unemployed", label: "Unemployed" },
  ];

  const organizationTypeOptions = [
    { value: "private", label: "Private Company" },
    { value: "public", label: "Public Company" },
    { value: "government", label: "Government" },
    { value: "ngo", label: "NGO" },
    { value: "other", label: "Other" },
  ];

  const sourceOfFundsOptions = [
    { value: "salary", label: "Salary" },
    { value: "business", label: "Business Income" },
    { value: "investment", label: "Investment" },
    { value: "pension", label: "Pension" },
    { value: "other", label: "Other" },
  ];

  const savingsAccountTypeOptions = [
    { value: "regular", label: "Regular Savings" },
    { value: "premium", label: "Premium Savings" },
    { value: "salary", label: "Salary Account" },
    { value: "senior", label: "Senior Citizen" },
  ];

  return (
    <div className={className}>
      <Accordion
        title="Professional Details"
        isVerified={isVerified}
        defaultOpen={!isVerified}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Dropdown
              label="Occupation"
              placeholder="Select Occupation"
              options={occupationOptions}
              value={formData.occupation}
              onChange={(value) => handleInputChange("occupation", value)}
              required
            />
            <Dropdown
              label="Organization Type"
              placeholder="Select Organization Type"
              options={organizationTypeOptions}
              value={formData.organizationType}
              onChange={(value) => handleInputChange("organizationType", value)}
              required
            />
            <TextBox
              label="Organization Name"
              placeholder="Enter Organization Name"
              value={formData.organizationName}
              onChange={(value) => handleInputChange("organizationName", value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Dropdown
              label="Source of Funds"
              placeholder="Select Organization Type"
              options={sourceOfFundsOptions}
              value={formData.sourceOfFunds}
              onChange={(value) => handleInputChange("sourceOfFunds", value)}
              required
            />
            <TextBox
              label="Gross Annual Income"
              placeholder="Enter Gross Annual Income"
              value={formData.grossAnnualIncome}
              onChange={(value) =>
                handleInputChange("grossAnnualIncome", value)
              }
              required
            />
            <Dropdown
              label="Type of Savings Account"
              placeholder="Select Savings Account Type"
              options={savingsAccountTypeOptions}
              value={formData.savingsAccountType}
              onChange={(value) =>
                handleInputChange("savingsAccountType", value)
              }
              required
            />
          </div>

          {!isVerified && (
            <div className="flex justify-end mt-6">
              <Button onClick={handleSave} disabled={!isFormValid}>
                Save
              </Button>
            </div>
          )}
        </div>
      </Accordion>
    </div>
  );
};

export default ProfessionalDetails;
