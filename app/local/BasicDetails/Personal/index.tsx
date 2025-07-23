"use client";
import React, { useState } from "react";
import TextBox from "../../../components/TextBox/index"; 
import Dropdown from "../../../components/DropBox/index";
import InfoBox from "../../../components/InfoBox/index"; 

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
    onChange({
      ...formData,
      [field]: val,
    });
  };

  const isFormValid =
    
    formData.maritalStatus.trim() !== "" &&
    formData.fatherName.trim() !== "" &&
    formData.motherName.trim() !== "";

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
          

          {/* Info Box */}
          <InfoBox message="Make sure your email ID is correct as all communication from bank would be done on this email" />

          {/* Marital Status, Father's, and Mother's Name */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Dropdown
              label="Marital Status"
              placeholder="Select Status"
              options={maritalStatusOptions}
              value={formData.maritalStatus}
              onChange={(value) => handleInputChange("maritalStatus", value)}
              required
            />
            <TextBox
              label="Father's Name"
              placeholder="Enter Father's name"
              value={formData.fatherName}
              onChange={(value) => handleInputChange("fatherName", value)}
              required
            />
            <TextBox
              label="Mother's Name"
              placeholder="Enter Mother's name"
              value={formData.motherName}
              onChange={(value) => handleInputChange("motherName", value)}
              required
            />
          </div>

          
        </div>
      
    </div>
  );  
};

export default PersonalDetails;
