"use client";
import React, { useEffect, useState } from "react";
import TextBox from "../../../components/TextBox/index";
import InfoBox from "../../../components/InfoBox/index";
import dummyDataRaw from "../aadhar.json";

export interface CommunicationAddressData {
  address?: string;
  communicationSameAsAadhaar?: boolean;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  [key: string]: any;
}

interface CommunicationAddressProps {
  value: CommunicationAddressData;
  onChange: (data: CommunicationAddressData) => void;
  aadhaarNumber: string;
  className?: string;
}

const dummyData = dummyDataRaw as Record<
  string,
  {
    name: string;
    gender: string;
    dob: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
  }
>;

const CommunicationAddress: React.FC<CommunicationAddressProps> = ({
  value,
  onChange,
  aadhaarNumber,
  className = "",
}) => {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (
      aadhaarNumber &&
      dummyData[aadhaarNumber] &&
      value.communicationSameAsAadhaar
    ) {
      const { addressLine1, addressLine2, city, state, pincode } =
        dummyData[aadhaarNumber];

      const updatedData = {
        ...value,
        addressLine1,
        addressLine2,
        city,
        state,
        pincode,
      };

      onChange(updatedData);
      setIsVerified(true);
    }
  }, [aadhaarNumber, value.communicationSameAsAadhaar]);

  const handleInputChange = (
    field: keyof CommunicationAddressData,
    fieldValue: string | boolean
  ) => {
    const updatedData = {
      ...value,
      [field]: fieldValue,
    };
    onChange(updatedData);
  };

  return (
    <div className={className}>
      <div className="space-y-4">
        <h1 className="text-3xl">Permananet Address</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 1
            </label>
            <input
              type="text"
              value={dummyData[aadhaarNumber]?.addressLine1 || ""}
              readOnly
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 2
            </label>
            <input
              type="text"
              value={dummyData[aadhaarNumber]?.addressLine2 || ""}
              readOnly
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              value={dummyData[aadhaarNumber]?.city || ""}
              readOnly
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              type="text"
              value={dummyData[aadhaarNumber]?.state || ""}
              readOnly
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pincode
            </label>
            <input
              type="text"
              value={dummyData[aadhaarNumber]?.pincode || ""}
              readOnly
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        <InfoBox
          message="All communication from the Bank will be received on communication address."
          type="info"
          className="mb-4"
        />

        <div className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            id="communicationSameAsAadhaar"
            checked={value.communicationSameAsAadhaar ?? false}
            onChange={(e) =>
              handleInputChange("communicationSameAsAadhaar", e.target.checked)
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

        {!value.communicationSameAsAadhaar && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextBox
                label="Address Line 1"
                placeholder="Enter Address Line 1"
                value={value.addressLine1 ||""}
                onChange={(val) => handleInputChange("addressLine1", val)}
              />
              <TextBox
                label="Address Line 2"
                placeholder="Enter Address Line 2"
                value={value.addressLine2 ||""}
                onChange={(val) => handleInputChange("addressLine2", val)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <TextBox
                label="City"
                placeholder="Enter City"
                value={value.city || ""}
                onChange={(val) => handleInputChange("city", val)}
              />
              <TextBox
                label="State"
                placeholder="Enter State"
                value={value.state || ""}
                onChange={(val) => handleInputChange("state", val)}
              />
              <TextBox
                label="Pincode"
                placeholder="Enter Pincode"
                value={value.pincode || ""}
                onChange={(val) => handleInputChange("pincode", val)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CommunicationAddress;
