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
import Dummy from "../CustomerPAN/dummy.json";
import { useCustomer } from "../../../context/CustDetail";
import rawAadhaarData from "./aadhar.json";
import OTPVerification from "../../components/OTP/index";

interface CompleteFormProps {
  basicData: BasicData;
  onSubmit?: (allData: CompleteFormData) => void;
  className?: string;
  onSubmitSuccess?: () => void;
}

export interface BasicData {
  aadhaarNumber: string;
  vid?: string;
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
interface AadhaarRecord {
  name: string;
  gender: string;
  dob: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

const aadhaarData = rawAadhaarData as Record<string, AadhaarRecord>;

const CompleteForm: React.FC<CompleteFormProps> = ({
  basicData: initialBasicData,
  onSubmit,
  onSubmitSuccess,
  className = "",
}) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [formVerified, setFormVerified] = useState(false);
  const [formOpen, setFormOpen] = useState(true);
  const [showNominee, setShowNominee] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [idType, setIdType] = useState("aadhaar");
const [aadhaarType, setAadhaarType] = useState<"aadhaar" | "vid">("aadhaar");

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );

  const [basicData, setBasicData] = useState<BasicData>(initialBasicData);

  const handleOtpSubmit = (otp: string) => {
    console.log("OTP verified successfully:", otp);
    setIsVerified(true); // ✅ Now mark the section as verified
    setShowOTP(false);
    setIsAccordionOpen(true); // collapse only after OTP verified
  };
  const handleInputChange = (field: keyof BasicData, value: string) => {
    setBasicData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setVerificationError(null);
  };

  const isFormValid =
  (aadhaarType === "aadhaar" && basicData.aadhaarNumber.replace(/\D/g, "").length === 12) ||
  (aadhaarType === "vid" && basicData.vid?.replace(/\D/g, "").length === 16);

// Aadhaar should be 12 digits

  const handleVerify = async () => {
    setIsVerifying(true);
    setVerificationError(null);

    try {
      const response = await mockVerifyAadhaar(basicData.aadhaarNumber);

      if (response.success) {
        setBasicData((prev) => ({
          ...prev,
          name: response.data!.name,
          gender: response.data!.gender,
          dateOfBirth: response.data!.dateOfBirth,
          address: response.data!.address,
        }));
        setShowOTP(true); // Show OTP after success
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
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

    const record = aadhaarData[aadhaarNumber];

    if (!record) {
      return {
        success: false,
        error: "No record found for this Aadhaar number.",
      };
    }

    return {
      success: true,
      data: {
        name: record.name,
        gender: record.gender,
        dateOfBirth: record.dob,
        address: `${record.addressLine1}, ${record.addressLine2}`,
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
    personalDetailsData?.maritalStatus?.trim() &&
    personalDetailsData?.fatherName?.trim() &&
    personalDetailsData?.motherName?.trim() &&
    ProfessionalDetailsData?.occupation?.trim() &&
    ProfessionalDetailsData?.organizationType?.trim();
  ProfessionalDetailsData?.organizationName?.trim();
  ProfessionalDetailsData?.sourceOfFunds?.trim();
  ProfessionalDetailsData?.grossAnnualIncome?.trim();
  ProfessionalDetailsData?.savingsAccountType?.trim();

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
      console.log("Setting showNominee to true");
      setShowNominee(true);
      onSubmitSuccess?.(); // Call the success callback if provided
      onSubmit?.(allData);
      console.log("Complete form submitted:", allData);
      localStorage.setItem("basic_details", "true");
    }
  };
  function formatMaskedAadhaar(value: string): string {
    const clean = value.replace(/\D/g, "").slice(0, 12);
    if (clean.length < 12) return clean.replace(/(\d{4})(?=\d)/g, "$1 ");
    const masked = "XXXXXXXX" + clean.slice(-4);
    return masked.replace(/(.{4})(?=.)/g, "$1 ");
  }
  function formatMaskedVid(value?: string): string {
  if (!value) return ""; // fallback if undefined or empty

  const clean = value.replace(/\D/g, "").slice(0, 16);
  if (clean.length < 16) return clean.replace(/(\d{4})(?=\d)/g, "$1 ");
  const masked = "XXXXXXXXXXXX" + clean.slice(-4);
  return masked.replace(/(.{4})(?=.)/g, "$1 ");
}

  /*const handleEditBasicDetails = () => {
    setIsVerified(false);
    setBasicData((prev) => ({
      aadhaarNumber: prev.aadhaarNumber,
      // Clear other fields
      name: undefined,
      gender: undefined,
      dateOfBirth: undefined,
      address: undefined,
    }));
  };*/

  return (
    <div
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}
    >
      {/* Conditional rendering based on verification status */}
      <Accordion
        title="Basic Details"
        isVerified={isVerified}
        isOpen={isAccordionOpen}
        onToggle={(open) => setIsAccordionOpen(open)}
      >
        <div className="space-y-4 pb-4">
          {!isVerified ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select ID Type <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="idType"
                      value="aadhaar"
                      checked={idType === "aadhaar"}
                      onChange={() => setIdType("aadhaar")}
                      className="mr-2"
                    />
                    Aadhaar
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="idType"
                      value="vid"
                      checked={idType === "vid"}
                      onChange={() => setIdType("vid")}
                      className="mr-2"
                    />
                    VID
                  </label>
                </div>
              </div>
              <div className="flex items-end justify-between flex-wrap gap-4">
                {/* Conditional TextBox */}
                <div className="flex items-end justify-between flex-wrap gap-4">
                  <div className="flex-1 min-w-[280px]">
                    {idType === "aadhaar" ? (
                      <TextBox
                        label="Aadhaar Number"
                        placeholder="Enter 12-digit Aadhaar Number"
                        value={formatMaskedAadhaar(basicData.aadhaarNumber)}
                        onChange={(value) => {
                          const cleanValue = value
                            .replace(/\D/g, "")
                            .slice(0, 12);
                          handleInputChange("aadhaarNumber", cleanValue);
                        }}
                        required
                        className="w-full sm:w-[336px] h-[48px] text-base"
                      />
                    ) : (
                      <TextBox
                        label="VID"
                        placeholder="Enter 16-digit Virtual ID"
                        value={formatMaskedVid(basicData.vid ?? "")}
                        onChange={(value) => {
                          const cleanValue = value
                            .replace(/\D/g, "")
                            .slice(0, 16);
                          handleInputChange("vid", cleanValue);
                        }}
                        required
                        className="w-full sm:w-[336px] h-[48px] text-base"
                      />
                    )}
                  </div>
                </div>

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

              {showOTP && (
                <OTPVerification
                  onSubmit={handleOtpSubmit}
                  onClose={() => setShowOTP(false)}
                  message="UIDAI has sent a temporary OTP to your mobile number (Valid for 10 mins)"
                />
              )}

              {verificationError && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                  {verificationError}
                </div>
              )}

              {isVerifying && (
                <div className="text-orange-600 text-sm bg-orange-50 p-3 rounded-md">
                  Please wait while we verify your Aadhaar details...
                </div>
              )}
            </>
          ) : (
            <>
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
              </div>
            </>
          )}
        </div>
      </Accordion>

      {/* Show remaining sections only after verification */}
      {isVerified && (
        <>
          {/* Spacing between previous section and this accordion */}
          <div className="my-6" />

          <Accordion
            title="Communication Details"
            isOpen={formOpen}
            onToggle={setFormOpen}
            isVerified={formVerified}
          >
            {/* Communication Address Section */}
            <div className="mb-6">
              <CommunicationAddress
                value={communicationAddressData}
                onChange={setCommunicationAddressData}
                aadhaarNumber={basicData.aadhaarNumber}
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
            <div className="mb-24">
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
