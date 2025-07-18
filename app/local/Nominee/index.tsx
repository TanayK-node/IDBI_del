"use client";
import React, { useState } from "react";
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
  const [sameAsCustomer, setSameAsCustomer] = useState(false);
  const [isNomineeSaved, setIsNomineeSaved] = useState(false);

  const handleInputChange = (field: keyof NomineeData, value: string) => {
    setNomineeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddNominee = () => {
    setIsExpanded(true);
  };

 const handleRemoveNominee = () => {
  setIsExpanded(false); // collapse the accordion
  setNomineeData({
    name: "",
    relationship: "",
    dateOfBirth: "",
    mobileNumber: "",
    addressLine1: "",
    addressLine2: "",
    pinCode: "",
  });
  setSameAsCustomer(false);
  setIsNomineeSaved(false); // Optional: reset the saved state
};


  const relationshipOptions = [
    { value: "Spouse", label: "Spouse" },
    { value: "Child", label: "Child" },
    { value: "Parent", label: "Parent" },
    { value: "Sibling", label: "Sibling" },
    { value: "Other", label: "Other" },
  ];

  if (!isExpanded) {
  return (
    <Card className="p-6">
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
      isVerified={isNomineeSaved} // ✅ controls green tick
      isOpen={isExpanded} // ✅ controls accordion open/close
      onToggle={setIsExpanded} // ✅ toggles accordion state
    >
      <div className="p-6 space-y-6">
        {/* Name and Relationship */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextBox
            label="Name"
            placeholder="Input Text"
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
          </div>
        </div>

        {/* Mobile Number */}
        <div>
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
              value={nomineeData.mobileNumber}
              onChange={(e) =>
                handleInputChange("mobileNumber", e.target.value)
              }
              className="flex-1 px-4 py-3 border border-l-0 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#02836C] text-[#2A2A28] placeholder-gray-500"
              required
            />
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

        {/* Address Lines */}
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
              setIsNomineeSaved(true); // ✅ mark as saved
              setIsExpanded(false); // ✅ close accordion
            }}
            disabled={
              !nomineeData.name ||
              !nomineeData.relationship ||
              !nomineeData.dateOfBirth
            }
            className={`w-auto px-6 py-3 focus:ring-gray-500 ${
              nomineeData.name &&
              nomineeData.relationship &&
              nomineeData.dateOfBirth
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
