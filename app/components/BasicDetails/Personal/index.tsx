"use client";
import React, { useState } from "react";
import TextBox from "../../TextBox/index";
import Dropdown from "../../DropBox/index";
import Accordion from "../../Accord/index";

interface PersonalDetailsProps {
  onSave?: (data: PersonalDetailsData) => void;
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
  onSave,
  className = "",
}) => {
  const [isVerified, setIsVerified] = useState(false);
  const [formData, setFormData] = useState<PersonalDetailsData>({
    customerEmail: "",
    emailForCommunication: false,
    maritalStatus: "",
    fatherName: "",
    motherName: "",
  });

  const handleInputChange = (field: keyof PersonalDetailsData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const isFormValid = 
      formData.customerEmail.trim() !== "" &&
      formData.maritalStatus.trim() !== "" &&
      formData.fatherName.trim() !== "" &&
      formData.motherName.trim() !== "";

    if (isFormValid) {
      setIsVerified(true);
      onSave?.(formData);
      console.log("Personal details saved:", formData);
    }
  };

  const isFormValid = 
    formData.customerEmail.trim() !== "" &&
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
      <Accordion title="Personal Details" isVerified={isVerified} defaultOpen={!isVerified}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <TextBox
              label="Customer's Email ID"
              placeholder="Enter Customer's Email ID"
              value={formData.customerEmail}
              onChange={(value) => handleInputChange("customerEmail", value)}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="emailForCommunication"
              checked={formData.emailForCommunication}
              onChange={(e) => handleInputChange("emailForCommunication", e.target.checked)}
              className="w-4 h-4 text-[#02836C] border-gray-300 rounded focus:ring-[#02836C]"
            />
            <label htmlFor="emailForCommunication" className="text-sm text-gray-700">
              Make sure your email ID is correct as all the communications from bank will be sent on this email address.
            </label>
          </div>

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

          {!isVerified && (
            <div className="flex justify-end mt-6">
              <button
                onClick={handleSave}
                disabled={!isFormValid}
                className={`px-6 py-3 rounded-full focus:ring-gray-500 ${
                  isFormValid
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-gray-400 cursor-not-allowed text-white"
                }`}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </Accordion>
    </div>
  );
};

export default PersonalDetails;