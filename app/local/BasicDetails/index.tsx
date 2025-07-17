"use client";
import React, { useState } from "react";
import TextBox from "../../components/TextBox/index";
import Button from "../../components/Button/index";
import Accordion from "../../components/Accord/index";

interface BasicDetailsProps {
  onVerify?: (basicData: BasicData) => void;
  className?: string;
}

export interface BasicData {
  aadhaarNumber: string;
}


const BasicDetails: React.FC<BasicDetailsProps> = ({
  onVerify,
  className = "",
}) => {
  const [basicData, setBasicData] = useState<BasicData>({
    aadhaarNumber: "",
  });

  const [isVerified, setIsVerified] = useState(false);

  const handleInputChange = (field: keyof BasicData, value: string) => {
    setBasicData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVerify = () => {
    if (basicData.aadhaarNumber.trim().length >= 12) {
      setIsVerified(true);
      onVerify?.(basicData);
      console.log("Aadhaar verified:", basicData.aadhaarNumber);
    }
  };

  const isFormValid =
    basicData.aadhaarNumber.trim() !== "" &&
    basicData.aadhaarNumber.trim().length >= 12;

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
      <Accordion
        title="Basic Details"
        isVerified={isVerified}
        defaultOpen={false}
      >
        <div className="flex items-end justify-between flex-wrap gap-4">
          {/* TextBox */}
          <div>
            <TextBox
              label="Aadhaar Number/VID"
              placeholder="Enter Aadhaar Number/VID"
              value={basicData.aadhaarNumber}
              onChange={(value) => handleInputChange("aadhaarNumber", value)}
              required
              className="w-full sm:w-[336px] h-[48px] text-base"
            />
          </div>

          {/* Button aligned right */}
          <div className="ml-auto mb-1">
            <Button
              onClick={handleVerify}
              disabled={!isFormValid}
              className={`w-auto px-6 py-3 rounded-full focus:ring-gray-500 ${
                isFormValid
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Verify
            </Button>
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default BasicDetails;
