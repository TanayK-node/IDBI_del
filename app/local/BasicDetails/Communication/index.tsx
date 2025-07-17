"use client";
import React, { useState } from "react";
import TextBox from "../../../components/TextBox/index"; // 
import InfoBox from "../../../components/InfoBox/index"; // Adjust path as needed

export interface CommunicationAddressData {
  communicationSameAsAadhaar: boolean;
  communicationFromBank: boolean;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

interface CommunicationAddressProps {
  value: CommunicationAddressData;
  onChange: (data: CommunicationAddressData) => void;
  className?: string;
}



const CommunicationAddress: React.FC<CommunicationAddressProps> = ({
  value,
  onChange,
  className = "",
}) => {
  const [isVerified, setIsVerified] = useState(false);
  

  const handleInputChange = (
  field: keyof CommunicationAddressData,
  fieldValue: string | boolean // <-- renamed from `value` to `fieldValue`
) => {
  const updatedData = {
    ...value, // `value` is the prop (CommunicationAddressData)
    [field]: fieldValue, // update just the field
  };
  onChange(updatedData); // send updated object to parent
};

  

  const isFormValid =
    value.addressLine1.trim() !== "" &&
    value.city.trim() !== "" &&
    value.state.trim() !== "" &&
    value.pincode.trim() !== "";

  return (
    <div className={className}>
      
        <div className="space-y-4">
          <h1 className="text-3xl">Communication Details</h1>
          <InfoBox
            message="All communication from the Bank will be received on communication address."
            type="info"
            className="mb-4"
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="communicationSameAsAadhaar"
              checked={value.communicationSameAsAadhaar}
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
              value={value.addressLine1}
              onChange={(value) => handleInputChange("addressLine1", value)}
              required
            />
            <TextBox
              label="Address Line 2"
              placeholder="Enter Address Line 2"
              value={value.addressLine2}
              onChange={(value) => handleInputChange("addressLine2", value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextBox
              label="City"
              placeholder="Enter City"
              value={value.city}
              onChange={(value) => handleInputChange("city", value)}
              required
            />
            <TextBox
              label="State"
              placeholder="Enter State"
              value={value.state}
              onChange={(value) => handleInputChange("state", value)}
              required
            />
            <TextBox
              label="Pincode"
              placeholder="Enter Pincode"
              value={value.pincode}
              onChange={(value) => handleInputChange("pincode", value)}
              required
            />
          </div>

          
        </div>

    </div>
  );
};

export default CommunicationAddress;
