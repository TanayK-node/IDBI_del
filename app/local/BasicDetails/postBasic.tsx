"use client";
import React, { useState } from "react";
import Accordion from "../Accord/index";
import CommunicationAddress, { CommunicationAddressData } from "./Communication/index";
import PersonalDetails, { PersonalDetailsData } from "./Personal/index";
import ProfessionalDetails, { ProfessionalDetailsData } from "./Proffesional/index";

interface CompleteFormProps {
  basicData: BasicData;
  onSubmit?: (allData: CompleteFormData) => void;
  className?: string;
}

export interface BasicData {
  aadhaarNumber: string;
}

export interface CompleteFormData {
  basicData: BasicData;
  communicationAddress: CommunicationAddressData;
  personalDetails: PersonalDetailsData;
  professionalDetails: ProfessionalDetailsData;
}

const CompleteForm: React.FC<CompleteFormProps> = ({
  basicData,
  onSubmit,
  className = "",
}) => {
  const [communicationAddressData, setCommunicationAddressData] = useState<CommunicationAddressData | null>(null);
  const [personalDetailsData, setPersonalDetailsData] = useState<PersonalDetailsData | null>(null);
  const [professionalDetailsData, setProfessionalDetailsData] = useState<ProfessionalDetailsData | null>(null);

  const handleCommunicationAddressSave = (data: CommunicationAddressData) => {
    setCommunicationAddressData(data);
  };

  const handlePersonalDetailsSave = (data: PersonalDetailsData) => {
    setPersonalDetailsData(data);
  };

  const handleProfessionalDetailsSave = (data: ProfessionalDetailsData) => {
    setProfessionalDetailsData(data);
  };

  const handleFinalSubmit = () => {
    if (communicationAddressData && personalDetailsData && professionalDetailsData) {
      const allData: CompleteFormData = {
        basicData,
        communicationAddress: communicationAddressData,
        personalDetails: personalDetailsData,
        professionalDetails: professionalDetailsData,
      };
      onSubmit?.(allData);
      console.log("Complete form submitted:", allData);
    }
  };

  const isAllSectionsSaved = communicationAddressData && personalDetailsData && professionalDetailsData;

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
      {/* Basic Details Summary */}
      <div className="mb-6">
        <Accordion title="Basic Details" isVerified={true} defaultOpen={false}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Name:</span>
              <div className="text-gray-900">Rajan Kumar</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Aadhaar Number:</span>
              <div className="text-gray-900">{basicData.aadhaarNumber}</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Gender:</span>
              <div className="text-gray-900">Male</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Date of Birth:</span>
              <div className="text-gray-900">04/07/1987</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Address:</span>
              <div className="text-gray-900">123, Jasmine Apartments, Palace Road, Bangalore, Karnataka - 560003</div>
            </div>
          </div>
        </Accordion>
      </div>

      {/* Communication Address Section */}
      <div className="mb-6">
        <CommunicationAddress onSave={handleCommunicationAddressSave} />
      </div>

      {/* Personal Details Section */}
      <div className="mb-6">
        <PersonalDetails onSave={handlePersonalDetailsSave} />
      </div>

      {/* Professional Details Section */}
      <div className="mb-6">
        <ProfessionalDetails onSave={handleProfessionalDetailsSave} />
      </div>

      {/* Final Submit Button */}
      {isAllSectionsSaved && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleFinalSubmit}
            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Submit Application
          </button>
        </div>
      )}
    </div>
  );
};

export default CompleteForm;