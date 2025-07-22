"use client";
import React, { useState } from "react";
import TextBox from "../../components/TextBox/index";
import Button from "../../components/Button/index";
import Accordion from "../../components/Accord/index";

import { useCustomer } from "../../../context/CustDetail"; // Ensure this path is correct

const CustomerDetailsForm: React.FC = () => {
  const { customerData, isVerified, updateCustomerField, setIsVerified } = useCustomer();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const handleVerify = () => {
    // Basic validation
    if (customerData.name && customerData.dob && customerData.email) {
      setIsVerified(true);
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
      <TextBox
        label="Name"
        placeholder="Rajesh Kumar"
        value={customerData.name}
        onChange={(value) => updateCustomerField("name", value)}
        required={true}
      />

      {/* Date of Birth Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date of Birth <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="date"
          value={customerData.dob}
          onChange={(e) => updateCustomerField("dob", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02836C] focus:border-transparent text-[#2A2A28]"
          required
        />
      </div>

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