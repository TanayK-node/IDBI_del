"use client";
import React, { useState } from "react";
import TextBox from "../../../components/TextBox/index"; // Adjust path as needed
import Accordion from "../../../components/Accord/index";
import InfoBox from "../../../components/InfoBox/index"; // Adjust path as needed
import Button from "../../../components/Button/index"; // Adjust path as needed

interface CommunicationAddressProps {
  onSave?: (data: CommunicationAddressData) => void;
  className?: string;
}

export interface CommunicationAddressData {
  communicationSameAsAadhaar: boolean;
  communicationFromBank: boolean;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

const CommunicationAddress: React.FC<CommunicationAddressProps> = ({
  onSave,
  className = "",
}) => {
  const [isVerified, setIsVerified] = useState(false);
  const [formData, setFormData] = useState<CommunicationAddressData>({
    communicationSameAsAadhaar: false,
    communicationFromBank: true,
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleInputChange = (
    field: keyof CommunicationAddressData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const isFormValid =
      formData.addressLine1.trim() !== "" &&
      formData.city.trim() !== "" &&
      formData.state.trim() !== "" &&
      formData.pincode.trim() !== "";

    if (isFormValid) {
      setIsVerified(true);
      onSave?.(formData);
      console.log("Communication address saved:", formData);
    }
  };

  const isFormValid =
    formData.addressLine1.trim() !== "" &&
    formData.city.trim() !== "" &&
    formData.state.trim() !== "" &&
    formData.pincode.trim() !== "";

  return (
    <div className={className}>
      <Accordion
        title="Communication Address"
        isVerified={isVerified}
        defaultOpen={!isVerified}
      >
        <div className="space-y-4">
          <InfoBox
            message="All communication from the Bank will be received on communication address."
            type="info"
            className="mb-4"
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="communicationSameAsAadhaar"
              checked={formData.communicationSameAsAadhaar}
              onChange={(e) =>
                handleInputChange(
                  "communicationSameAsAadhaar",
                  e.target.checked
                )
              }
              className="w-4 h-4 text-[#02836C] border-gray-300 rounded focus:ring-[#02836C]"
            />
            <label
              htmlFor="communicationSameAsAadhaar"
              className="text-sm text-gray-700"
            >
              Communication address same as Aadhaar card address
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextBox
              label="Address Line 1"
              placeholder="Enter Address Line 1"
              value={formData.addressLine1}
              onChange={(value) => handleInputChange("addressLine1", value)}
              required
            />
            <TextBox
              label="Address Line 2"
              placeholder="Enter Address Line 2"
              value={formData.addressLine2}
              onChange={(value) => handleInputChange("addressLine2", value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextBox
              label="City"
              placeholder="Enter City"
              value={formData.city}
              onChange={(value) => handleInputChange("city", value)}
              required
            />
            <TextBox
              label="State"
              placeholder="Enter State"
              value={formData.state}
              onChange={(value) => handleInputChange("state", value)}
              required
            />
            <TextBox
              label="Pincode"
              placeholder="Enter Pincode"
              value={formData.pincode}
              onChange={(value) => handleInputChange("pincode", value)}
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

export default CommunicationAddress;
