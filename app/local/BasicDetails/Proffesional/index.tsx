"use client";
import React, { useState } from "react";
import TextBox from "../../../components/TextBox/index"; // Adjust path as needed
import Dropdown from "../../../components/DropBox/index";

interface ProfessionalDetailsProps {
  value: ProfessionalDetailsData;
  onChange: (data: ProfessionalDetailsData) => void;
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
  value,
  onChange,
  className = "",
}) => {
  const [isVerified, setIsVerified] = useState(false);

  const handleInputChange = (
    field: keyof ProfessionalDetailsData,
    fieldValue: string | boolean // <-- renamed from `value` to `fieldValue`
  ) => {
    const updatedData = {
      ...value, // `value` is the prop (CommunicationAddressData)
      [field]: fieldValue, // update just the field
    };
    onChange(updatedData); // send updated object to parent
  };

  const handleSave = () => {
    const isFormValid =
      value.occupation.trim() !== "" &&
      value.organizationType.trim() !== "" &&
      value.organizationName.trim() !== "" &&
      value.sourceOfFunds.trim() !== "" &&
      value.grossAnnualIncome.trim() !== "" &&
      value.savingsAccountType.trim() !== "";

    if (isFormValid) {
      setIsVerified(true);
      onChange?.(value);
      console.log("Professional details saved:", value);
    }
  };

  const isFormValid =
    value.occupation.trim() !== "" &&
    value.organizationType.trim() !== "" &&
    value.organizationName.trim() !== "" &&
    value.sourceOfFunds.trim() !== "" &&
    value.grossAnnualIncome.trim() !== "" &&
    value.savingsAccountType.trim() !== "";

  // Dropdown options
  const occupationOptions = [
    { value: "salaried", label: "Salaried" },
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



  return (
    <div className={className}>
      <h1 className="text-3xl pb-4">Professional Details</h1>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative overflow-visible">
            <Dropdown
              label="Occupation"
              placeholder="Select Occupation"
              options={occupationOptions}
              value={value.occupation}
              onChange={(value) => handleInputChange("occupation", value)}
              required
            />
          </div>
          <Dropdown
            label="Organization Type"
            placeholder="Select Organization Type"
            options={organizationTypeOptions}
            value={value.organizationType}
            onChange={(value) => handleInputChange("organizationType", value)}
            required
          />
          <TextBox
            label="Organization Name"
            placeholder="Enter Organization Name"
            value={value.organizationName}
            onChange={(value) => handleInputChange("organizationName", value)}
            
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative overflow-visible">
            <Dropdown
              label="Source of Funds"
              placeholder="Select Organization Type"
              options={sourceOfFundsOptions}
              value={value.sourceOfFunds}
              onChange={(value) => handleInputChange("sourceOfFunds", value)}
              required
            />
          </div>
          <Dropdown
            label="Gross Annual Income"
            placeholder="Select Gross Annual Income"
            options={[
              { label: "Below ₹2,50,000", value: "Below ₹2,50,000" },
              {
                label: "₹2,50,000 - ₹5,00,000",
                value: "₹2,50,000 - ₹5,00,000",
              },
              {
                label: "₹5,00,000 - ₹10,00,000",
                value: "₹5,00,000 - ₹10,00,000",
              },
              { label: "Above ₹10,00,000", value: "Above ₹10,00,000" },
            ]}
            value={value.grossAnnualIncome}
            onChange={(value) => handleInputChange("grossAnnualIncome", value)}
            required
          />
          
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetails;
