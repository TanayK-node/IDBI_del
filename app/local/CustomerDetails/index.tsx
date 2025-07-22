"use client";
import React, { useState } from "react";
import TextBox from "../../components/TextBox/index";
import Button from "../../components/Button/index";
import Accordion from "../../components/Accord/index";

import { useCustomer } from "../../../context/CustDetail"; // Ensure this path is correct
interface CustomerDetailsProps {
  customerData: { name: string; dob: string } | null;
}


const CustomerDetailsForm: React.FC = () => {
  const { customerData, isVerified, updateCustomerField, markVerified } = useCustomer();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const handleVerify = () => {
    // Basic validation
    if (customerData.name && customerData.dob && customerData.email) {
      console.log("Customer details verified:", customerData);
      markVerified(true);
      setIsAccordionOpen(false);
      console.log("Customer details verified:", customerData);
      // You can also save to localStorage here if needed
      localStorage.setItem("customer_details_verified", "true");
    }
  };

  const isFormValid = Boolean(customerData.name && customerData.dob && customerData.email);


  return (
    <Accordion 
   title="Enter Customer Details"
  isVerified={isFormValid}
  isOpen={isAccordionOpen}
  onToggle={(open) => setIsAccordionOpen(open)}
>
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Name Input */}
      <TextBox label="Name" value={customerData?.name || ""} readOnly  onChange={() => {}} />
      <TextBox label="Date of Birth" value={customerData?.dob || ""} readOnly  onChange={() => {}} />

      {/* Email Input */}
      <TextBox
        label="Email ID"
        placeholder="Enter email here"
        type="text"
        value={customerData.email}
        onChange={(value) => updateCustomerField("email", value)}
        required={true}
      />

     
    </div>

    <div className="flex justify-end w-full pt-1">
         <Button
      onClick={handleVerify}
      disabled={!isFormValid}
      className={`w-auto px-6 py-3 focus:ring-gray-500  ${
        isFormValid
          ? "bg-orange-500 hover:bg-orange-600 text-white"
          : "bg-gray-400 cursor-not-allowed text-gray-200"
      }`}
    >
      Verify
    </Button>
    </div>
  </div>
</Accordion>
  );
};
export default CustomerDetailsForm;