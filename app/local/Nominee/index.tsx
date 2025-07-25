"use client";
import React, { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import Card from "../../components/Card/index";
import TextBox from "../../components/TextBox/index";
import Dropdown from "../../components/DropBox/index";
import Button from "../../components/Button/index";
import Accordion from "../../components/Accord/index";

interface NomineeData {
  name: string;
  relationship: string;
  dateOfBirth: string;
  mobileNumber: string;
  addressLine1: string;
  addressLine2: string;
  pinCode: string;
}

interface GuardianData {
  name: string;
  relationship: string;
  dateOfBirth: string;
  mobileNumber: string;
  addressLine1: string;
  addressLine2: string;
  pinCode: string;
}

interface NomineeProps {
  onChangeClick?: () => void;
}

const Nominee: React.FC<NomineeProps> = ({ onChangeClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [nomineeData, setNomineeData] = useState<NomineeData>({
    name: "",
    relationship: "",
    dateOfBirth: "",
    mobileNumber: "",
    addressLine1: "",
    addressLine2: "",
    pinCode: "",
  });
  const [guardianData, setGuardianData] = useState<GuardianData>({
    name: "",
    relationship: "",
    dateOfBirth: "",
    mobileNumber: "",
    addressLine1: "",
    addressLine2: "",
    pinCode: "",
  });
  const [sameAsCustomer, setSameAsCustomer] = useState(false);
  const [guardianSameAsNominee, setGuardianSameAsNominee] = useState(false);
  const [isNomineeSaved, setIsNomineeSaved] = useState(false);
  const [showGuardianSection, setShowGuardianSection] = useState(false);

  // Check if nominee is under 18
  const calculateAge = (birthDate: string) => {
    if (!birthDate) return 0;

    const birth = new Date(birthDate);
    const today = new Date();

    const birthYear = birth.getUTCFullYear();
    const birthMonth = birth.getUTCMonth();
    const birthDay = birth.getUTCDate();

    const todayYear = today.getUTCFullYear();
    const todayMonth = today.getUTCMonth();
    const todayDay = today.getUTCDate();

    let age = todayYear - birthYear;

    if (
      todayMonth < birthMonth ||
      (todayMonth === birthMonth && todayDay < birthDay)
    ) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    const age = calculateAge(nomineeData.dateOfBirth);
    setShowGuardianSection(age < 18 && age > 0);

    // Reset guardian data if nominee is 18 or older
    if (age >= 18) {
      setGuardianData({
        name: "",
        relationship: "",
        dateOfBirth: "",
        mobileNumber: "",
        addressLine1: "",
        addressLine2: "",
        pinCode: "",
      });
      setGuardianSameAsNominee(false);
    }
  }, [nomineeData.dateOfBirth]);
  const [mobileError, setMobileError] = useState("");
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, "").slice(0, 10);
    handleInputChange("mobileNumber", cleaned);
    setMobileError(cleaned.length === 10 ? "" : "Invalid mobile number");
  };
  const handleInputChange = (field: keyof NomineeData, value: string) => {
    let filteredValue = value;

    // Apply filtering only for name field
    if (field === "name") {
      filteredValue = value.replace(/[0-9]/g, ""); // remove digits
    }

    setNomineeData((prev) => ({
      ...prev,
      [field]: filteredValue,
    }));
  };

  const handleGuardianInputChange = (
    field: keyof GuardianData,
    value: string
  ) => {
    setGuardianData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddNominee = () => {
    setIsExpanded(true);
  };

  const handleRemoveNominee = () => {
    setIsExpanded(false);
    setNomineeData({
      name: "",
      relationship: "",
      dateOfBirth: "",
      mobileNumber: "",
      addressLine1: "",
      addressLine2: "",
      pinCode: "",
    });
    setGuardianData({
      name: "",
      relationship: "",
      dateOfBirth: "",
      mobileNumber: "",
      addressLine1: "",
      addressLine2: "",
      pinCode: "",
    });
    setSameAsCustomer(false);
    setGuardianSameAsNominee(false);
    setIsNomineeSaved(false);
    setShowGuardianSection(false);
  };

  const relationshipOptions = [
    { value: "Spouse", label: "Spouse" },
    { value: "Child", label: "Child" },
    { value: "Parent", label: "Parent" },
    { value: "Sibling", label: "Sibling" },
    { value: "Other", label: "Other" },
  ];

  const guardianRelationshipOptions = [
    { value: "Father", label: "Father" },
    { value: "Mother", label: "Mother" },
    { value: "Guardian", label: "Guardian" },
    { value: "Other", label: "Other" },
  ];

  // Validation for save button
  const isNomineeValid =
    nomineeData.name && nomineeData.relationship && nomineeData.dateOfBirth;
  const isGuardianValid =
    !showGuardianSection ||
    (guardianData.name &&
      guardianData.relationship &&
      guardianData.dateOfBirth);
  const canSave = isNomineeValid && isGuardianValid;

  if (!isExpanded && !isNomineeSaved) {
    return (
      <Card className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-medium text-gray-900">
              Want to add a nominee?
            </h3>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              Optional
            </span>
          </div>

          {isNomineeSaved && (
            <div className="flex items-center gap-1 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="mt-4">
          <button
            onClick={handleAddNominee}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors"
          >
            <UserPlusIcon className="h-5 w-5" />
            Add Nominee
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Accordion
      title="Nominee Details"
      isVerified={isNomineeSaved}
      isOpen={isExpanded}
      onToggle={setIsExpanded}
    >
      <div className="p-6 space-y-6">
        {/* Name and Relationship */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextBox
            label="Name"
            placeholder="Enter Name"
            value={nomineeData.name}
            onChange={(value) => handleInputChange("name", value)}
            required
          />

          <Dropdown
            label="Relationship"
            placeholder="Select Relationship"
            value={nomineeData.relationship}
            onChange={(value) => handleInputChange("relationship", value)}
            options={relationshipOptions}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="date"
              value={nomineeData.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02836C] focus:border-transparent text-[#2A2A28]"
              required
            />
            {showGuardianSection && (
              <p className="text-sm text-blue-600 mt-1">
                Guardian details are required as nominee age is less than 18
                years
              </p>
            )}
          </div>
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number <span className="text-red-500">*</span>
          </label>

          <div className="flex">
            {/* Wrapper for positioning dropdown arrow */}
            <div className="relative">
              <select className="h-[48px] pr-10 pl-4 border border-gray-300 rounded-l-md bg-gray-50 text-[#2A2A28] text-base focus:outline-none focus:ring-2 focus:ring-[#02836C] appearance-none">
                <option value="+91">+91 (IND)</option>
                <option value="+1">+1 (USA)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+61">+61 (AUS)</option>
                <option value="+81">+81 (JAP)</option>
              </select>

              {/* Custom arrow using SVG */}
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                <svg
                  className="w-4 h-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Input Field + Error */}
            <div className="flex flex-col w-full">
              <input
                type="tel"
                placeholder="Enter Mobile Number"
                value={nomineeData.mobileNumber}
                onChange={handleMobileChange}
                className="h-[48px] px-4 border border-l-0 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#02836C] text-[#2A2A28] placeholder-gray-500 text-base"
              />

              {mobileError && (
                <p className="text-red-500 text-sm mt-2">{mobileError}</p>
              )}
            </div>
          </div>
        </div>

        {/* Address Same As Customer */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="sameAsCustomer"
            checked={sameAsCustomer}
            onChange={(e) => setSameAsCustomer(e.target.checked)}
            className="h-4 w-4 text-[#02836C] border-gray-300 rounded"
          />
          <label
            htmlFor="sameAsCustomer"
            className="ml-2 text-sm text-gray-700"
          >
            Nominee address same as customer's communication address
          </label>
        </div>

        {/* Address Lines - Show only if not sameAsCustomer */}
        {!sameAsCustomer && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextBox
              label="Address Line 1"
              placeholder="Enter Address"
              value={nomineeData.addressLine1}
              onChange={(value) => handleInputChange("addressLine1", value)}
              required
            />

            <TextBox
              label="Address Line 2 (Optional)"
              placeholder="Enter Address"
              value={nomineeData.addressLine2}
              onChange={(value) => handleInputChange("addressLine2", value)}
            />

            <TextBox
              label="Pin Code"
              placeholder="Enter Pin Code"
              value={nomineeData.pinCode}
              onChange={(value) => handleInputChange("pinCode", value)}
              required
            />
          </div>
        )}

        {/* Guardian Section */}
        {showGuardianSection && (
          <div className="border-t pt-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              Guardian Details
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Guardian details are required as nominee age is less than 18 years
            </p>

            {/* Guardian Name and Relationship */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <TextBox
                label="Name"
                placeholder="Enter Name"
                value={guardianData.name}
                onChange={(value) => handleGuardianInputChange("name", value)}
                required
              />

              <Dropdown
                label="Relationship with Nominee"
                placeholder="Select Relationship"
                value={guardianData.relationship}
                onChange={(value) =>
                  handleGuardianInputChange("relationship", value)
                }
                options={guardianRelationshipOptions}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="date"
                  value={guardianData.dateOfBirth}
                  onChange={(e) =>
                    handleGuardianInputChange("dateOfBirth", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02836C] focus:border-transparent text-[#2A2A28]"
                  required
                />
              </div>
            </div>

            {/* Guardian Mobile Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="flex">
                <select className="px-3 py-3 border border-gray-300 rounded-l-md bg-gray-50">
                  <option value="+91">+91</option>
                </select>
                <input
                  type="tel"
                  placeholder="Enter Mobile Number"
                  value={guardianData.mobileNumber}
                  onChange={(e) =>
                    handleGuardianInputChange("mobileNumber", e.target.value)
                  }
                  className="flex-1 px-4 py-3 border border-l-0 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#02836C] text-[#2A2A28] placeholder-gray-500"
                  required
                />
              </div>
            </div>

            {/* Guardian Address Same As Nominee */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="guardianSameAsNominee"
                checked={guardianSameAsNominee}
                onChange={(e) => setGuardianSameAsNominee(e.target.checked)}
                className="h-4 w-4 text-[#02836C] border-gray-300 rounded"
              />
              <label
                htmlFor="guardianSameAsNominee"
                className="ml-2 text-sm text-gray-700"
              >
                Guardian address same as nominee address
              </label>
            </div>

            {/* Guardian Address Lines - Show only if guardianSameAsNominee is false */}
            {!guardianSameAsNominee && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextBox
                  label="Address Line 1"
                  placeholder="Enter Address"
                  value={guardianData.addressLine1}
                  onChange={(value) =>
                    handleGuardianInputChange("addressLine1", value)
                  }
                  required
                />

                <TextBox
                  label="Address Line 2 (Optional)"
                  placeholder="Enter Address"
                  value={guardianData.addressLine2}
                  onChange={(value) =>
                    handleGuardianInputChange("addressLine2", value)
                  }
                />

                <TextBox
                  label="Pin Code"
                  placeholder="Enter Pin Code"
                  value={guardianData.pinCode}
                  onChange={(value) =>
                    handleGuardianInputChange("pinCode", value)
                  }
                  required
                />
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between pt-4">
          <button
            onClick={handleRemoveNominee}
            className="text-red-500 hover:text-red-600 text-sm font-medium"
          >
            Remove Nominee
          </button>

          <Button
            onClick={() => {
              setIsNomineeSaved(true);
              setIsExpanded(false); // 👈 closes the accordion
            }}
            disabled={!canSave}
            className={`w-auto px-6 py-3 focus:ring-gray-500 ${
              canSave
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Save Nominee
          </Button>
        </div>
      </div>
    </Accordion>
  );
};

export default Nominee;
