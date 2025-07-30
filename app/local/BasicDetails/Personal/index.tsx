"use client";
import React, { useState } from "react";
import TextBox from "../../../components/TextBox/index"; 
import Dropdown from "../../../components/DropBox/index";
import InfoBox from "../../../components/InfoBox/index"; 
import { usePersonalDetails } from "../../../../context/personal";

interface PersonalDetailsProps {
  value: PersonalDetailsData;
  onChange: (data: PersonalDetailsData) => void;
  className?: string;
}

export interface PersonalDetailsData {
  customerEmail: string;
  emailForCommunication: boolean;
  maritalStatus: string;
  fatherName: string;
  motherName: string;
}


const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  value,
  onChange,
  className = "",
}) => {
  const formData = value;

 const handleInputChange = (
  field: keyof PersonalDetailsData,
  val: string | boolean
) => {
  if (
    (field === "fatherName" || field === "motherName") &&
    typeof val === "string"
  ) {
    const isValid = /^[a-zA-Z\s]*$/.test(val);
    if (!isValid) return; // prevent update if invalid
  }

  onChange({
    ...formData,
    [field]: val,
  });
};

  const { personalData, updatePersonalField } = usePersonalDetails();
  const isFormValid =
    
    personalData.maritalStatus.trim() !== "" &&
    personalData.fatherName.trim() !== "" &&
    personalData.motherName.trim() !== "";

  // Dropdown options
  const maritalStatusOptions = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "divorced", label: "Divorced" },
    { value: "widowed", label: "Widowed" },
  ];

  return (
    <div className={className}>
        <h1 className="text-3xl pb-4">Personal Details</h1>
        <div className="space-y-4">
          {/* Customer Email */}

          {/* Marital Status, Father's, and Mother's Name */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Dropdown
              label="Marital Status"
              placeholder="Select Status"
              options={maritalStatusOptions}
              value={personalData.maritalStatus}
               onChange={(value) => updatePersonalField("maritalStatus", value)}
              required
            />
            <TextBox
              label="Father's Name"
              placeholder="Enter Father's name"
              value={personalData.fatherName}
              onChange={(value) => updatePersonalField("fatherName", value)}
              required
            />
            <TextBox
              label="Mother's Name"
              placeholder="Enter Mother's name"
              value={personalData.motherName}
              onChange={(value) => updatePersonalField("motherName", value)}
              required
            />
          </div>

          
        </div>
      
    </div>
  );  
};

export default PersonalDetails;
