"use client";
import React, { useState } from "react";
import TextBox from "../../components/TextBox/index";
import Button from "../../components/Button/index";
import Accordion from "../../components/Accord/index";

interface CustomerDetailsProps {
  onVerify?: (customerData: CustomerData) => void;
  defaultOpen?: boolean;
}

interface CustomerData {
  name: string;
  dob: string;
  email: string;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  onVerify,
  defaultOpen = false,
}) => {
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    dob: "",
    email: "",
  });

  const [isVerified, setIsVerified] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVerify = () => {
    // Basic validation
    if (customerData.name && customerData.dob && customerData.email) {
      setIsVerified(true);
      onVerify?.(customerData);
      setFormOpen(false);
      localStorage.setItem("customer_details", "true");
    }
  };

  const isFormValid =
    customerData.name && customerData.dob && customerData.email;

  return (
    <Accordion
      title="Customer Details"
      isVerified={isVerified}
      isOpen={formOpen}
      onToggle={setFormOpen}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextBox
              label="Name"
              placeholder="Rajesh Kumar"
              value={customerData.name}
              onChange={(value) => handleInputChange("name", value)}
              required
            />

            <TextBox
              label="DOB"
              placeholder="dd-mm-yyyy"
              type="text"
              value={customerData.dob}
              onChange={(value) => handleInputChange("dob", value)}
              required
            />

            <TextBox
              label="Email ID"
              placeholder="Rajesh456@gmail.com"
              type="text"
              value={customerData.email}
              onChange={(value) => handleInputChange("email", value)}
              required
            />
          </div>

          <div className="flex justify-end w-full pt-1">
            <div className="w-1/2 flex justify-end">
              <Button
                onClick={handleVerify}
                disabled={!isFormValid}
                className={`w-auto px-6 py-3 focus:ring-gray-500 ${
                  isFormValid
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Verify
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default CustomerDetails;
