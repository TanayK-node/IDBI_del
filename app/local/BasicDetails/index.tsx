"use client";
import React, { useState } from "react";
import Accordion from "../../components/Accord/index";
import CommunicationAddress, {
  CommunicationAddressData,
} from "./Communication/index";
import PersonalDetails, { PersonalDetailsData } from "./Personal/index";
import ProfessionalDetails, {
  ProfessionalDetailsData,
} from "./Proffesional/index";
import TextBox from "../../components/TextBox/index"; // Adjust path as needed
import Button from "../../components/Button/index"; // Adjust path as needed

interface CompleteFormProps {
  basicData: BasicData;
  onSubmit?: (allData: CompleteFormData) => void;
  className?: string;
}

export interface BasicData {
  aadhaarNumber: string;
  name?: string;
  gender?: string;
  dateOfBirth?: string;
  address?: string;
}

export interface CompleteFormData {
  basicData: BasicData;
  communicationAddress: CommunicationAddressData;
  personalDetails: PersonalDetailsData;
  professionalDetails: ProfessionalDetailsData;
}

// Mock verified data interface
interface VerifiedAadhaarData {
  name: string;
  gender: string;
  dateOfBirth: string;
  address: string;
}

const CompleteForm: React.FC<CompleteFormProps> = ({
  basicData: initialBasicData,
  onSubmit,
  className = "",
}) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [formVerified, setFormVerified] = useState(false);
  const [formOpen, setFormOpen] = useState(true);

  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );

  const [basicData, setBasicData] = useState<BasicData>(initialBasicData);

  const handleInputChange = (field: keyof BasicData, value: string) => {
    setBasicData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setVerificationError(null);
  };

  const isFormValid = basicData.aadhaarNumber.trim().length >= 12; // Aadhaar should be 12 digits

  const handleVerify = async () => {
    setIsVerifying(true);
    setVerificationError(null);

    try {
      // Simulate API call for Aadhaar verification
      // Replace this with your actual verification logic
      const response = await mockVerifyAadhaar(basicData.aadhaarNumber);

      if (response.success) {
        setBasicData((prev) => ({
          ...prev,
          name: response.data!.name,
          gender: response.data!.gender,
          dateOfBirth: response.data!.dateOfBirth,
          address: response.data!.address,
        }));
        setIsVerified(true);
      } else {
        setVerificationError(
          response.error || "Verification failed. Please try again."
        );
      }
    } catch (error) {
      setVerificationError("Network error. Please try again.");
      console.error("Verification failed:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  // Mock verification function - replace with your actual API call
  const mockVerifyAadhaar = async (
    aadhaarNumber: string
  ): Promise<{
    success: boolean;
    data?: VerifiedAadhaarData;
    error?: string;
  }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock validation
    if (aadhaarNumber.length !== 12) {
      return {
        success: false,
        error: "Invalid Aadhaar number. Must be 12 digits.",
      };
    }

    // Mock success response
    return {
      success: true,
      data: {
        name: "Rajan Kumar",
        gender: "Male",
        dateOfBirth: "04/07/1987",
        address:
          "123, Jasmine Apartments, Palace Road, Bangalore, Karnataka - 560003",
      },
    };
  };

  const [personalDetailsData, setPersonalDetailsData] =
    useState<PersonalDetailsData>({
      customerEmail: "",
      emailForCommunication: false,
      maritalStatus: "",
      fatherName: "",
      motherName: "",
    });

  const [communicationAddressData, setCommunicationAddressData] =
    useState<CommunicationAddressData>({
      communicationSameAsAadhaar: false,
      communicationFromBank: true, // or false — depends on your default
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
    });
  const [ProfessionalDetailsData, setProfessionalDetailsData] =
    useState<ProfessionalDetailsData>({
      occupation: "",
      organizationType: "",
      organizationName: "",
      sourceOfFunds: "",
      grossAnnualIncome: "",
      savingsAccountType: "",
    });

  const isAllSectionsSaved =
    communicationAddressData && personalDetailsData && ProfessionalDetailsData;

  const handleFinalSubmit = () => {
    console.log("Trying to submit form...");
    console.log("communicationAddressData:", communicationAddressData);
    console.log("personalDetailsData:", personalDetailsData);
    console.log("professionalDetailsData:", ProfessionalDetailsData);

    if (
      communicationAddressData &&
      personalDetailsData &&
      ProfessionalDetailsData
    ) {
      const allData: CompleteFormData = {
        basicData,
        communicationAddress: communicationAddressData,
        personalDetails: personalDetailsData,
        professionalDetails: ProfessionalDetailsData,
      };
      setFormOpen(false);
      setFormVerified(true);
      onSubmit?.(allData);
      console.log("Complete form submitted:", allData);
    }
  };

  const handleEditBasicDetails = () => {
    setIsVerified(false);
    setBasicData((prev) => ({
      aadhaarNumber: prev.aadhaarNumber,
      // Clear other fields
      name: undefined,
      gender: undefined,
      dateOfBirth: undefined,
      address: undefined,
    }));
  };

  return (
    <div
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}
    >
      {/* Conditional rendering based on verification status */}
      {!isVerified ? (
        // Before Verification - Input Form
        <Accordion title="Basic Details" isVerified={false} defaultOpen={false}>
          <div className="space-y-4">
            <div className="flex items-end justify-between flex-wrap gap-4">
              {/* TextBox */}
              <div className="flex-1 min-w-[280px]">
                <TextBox
                  label="Aadhaar Number/VID"
                  placeholder="Enter 12-digit Aadhaar Number"
                  value={basicData.aadhaarNumber}
                  onChange={(value) =>
                    handleInputChange("aadhaarNumber", value)
                  }
                  required
                  className="w-full sm:w-[336px] h-[48px] text-base"
                />
              </div>

              {/* Button aligned right */}
              <div className="ml-auto mb-1">
                <Button
                  onClick={handleVerify}
                  disabled={!isFormValid || isVerifying}
                  className={`w-auto px-6 py-3 rounded-full focus:ring-gray-500 ${
                    isFormValid && !isVerifying
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "bg-gray-400 cursor-not-allowed text-gray-600"
                  }`}
                >
                  {isVerifying ? "Verifying..." : "Verify"}
                </Button>
              </div>
            </div>

            {/* Error message */}
            {verificationError && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                {verificationError}
              </div>
            )}

            {/* Loading indicator */}
            {isVerifying && (
              <div className="text-orange-600 text-sm bg-orange-50 p-3 rounded-md">
                Please wait while we verify your Aadhaar details...
              </div>
            )}
          </div>
        </Accordion>
      ) : (
        // After Verification - Summary View
        <div className="mb-6">
          <Accordion
            title="Basic Details"
            isVerified={true}
            defaultOpen={false}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Name:</span>
                  <div className="text-gray-900">{basicData.name}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Aadhaar Number:
                  </span>
                  <div className="text-gray-900">{basicData.aadhaarNumber}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Gender:</span>
                  <div className="text-gray-900">{basicData.gender}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Date of Birth:
                  </span>
                  <div className="text-gray-900">{basicData.dateOfBirth}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Address:</span>
                  <div className="text-gray-900">{basicData.address}</div>
                </div>
              </div>

              {/* Edit button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleEditBasicDetails}
                  className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                >
                  Edit Details
                </button>
              </div>
            </div>
          </Accordion>
        </div>
      )}

      {/* Show remaining sections only after verification */}
      {isVerified && (
        <>
          <Accordion
            title="Complete Application Form"
              isOpen={formOpen}
              onToggle={setFormOpen}
              isVerified={formVerified}
          >
            {/* Communication Address Section */}
            <div className="mb-6">
              <CommunicationAddress
                value={communicationAddressData}
                onChange={setCommunicationAddressData}
              />
              <hr className="my-4 border-t border-gray-300" />
            </div>

            {/* Personal Details Section */}
            <div className="mb-6">
              <PersonalDetails
                value={personalDetailsData}
                onChange={setPersonalDetailsData}
              />
              <hr className="my-4 border-t border-gray-300" />
            </div>

            {/* Professional Details Section */}
            <div className="mb-6">
              <ProfessionalDetails
                value={ProfessionalDetailsData}
                onChange={setProfessionalDetailsData}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleFinalSubmit}
                disabled={!isAllSectionsSaved}
              
                className={`${
                  isAllSectionsSaved
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Submit Application
              </Button>
            </div>
          </Accordion>
        </>
      )}
    </div>
  );
};

export default CompleteForm;
