"use client";
import React, { useState } from "react";
import TextBox from "../../components/TextBox/index";
import Button from "../../components/Button/index";
import Accordion from "../../components/Accord/index";
import OTPVerification from "../../components/OTP/index";
import { useCustomer } from "../../../context/CustDetail"; // Ensure this path is correct

const CustomerDetailsForm: React.FC = () => {
  const {
    customerData,
    isVerified,
    updateCustomerField,
    markVerified,
    isAccordionOpen,
    setAccordionOpen,
  } = useCustomer();
  //const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const handleVerify = () => {
     console.log("Button clicked");
    // Basic validation
    if (customerData.name && customerData.dob && isEmailValid) {
      console.log("Customer details verified:", customerData);
      markVerified(true);
      setShowOTP(true); // Show the OTP input

      console.log("Customer details verified:", customerData);
      // You can also save to localStorage here if needed
      localStorage.setItem("customer_details_verified", "true");
    }
  };
  const handleOtpSubmit = (otp: string) => {
    console.log("OTP verified successfully:", otp);
    setShowOTP(false);
    setAccordionOpen(false); // collapse only after OTP verified
  };

 const validateEmail = (value: string) => {
  setEmail(value);
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  setIsEmailValid(isValid);
  setEmailError(isValid ? "" : "Please enter a valid email address.");
};
  const isFormValid = Boolean(
    customerData.name && customerData.dob && isEmailValid
  );

  return (
    <Accordion
      title="Enter Customer Details"
      isVerified={isFormValid}
      isOpen={isAccordionOpen}
      onToggle={(open) => setAccordionOpen(open)}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Name Input */}
          <TextBox
            label="Name"
            value={customerData?.name || ""}
            readOnly
            onChange={() => {}}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />

          <TextBox
            label="Date of Birth"
            value={customerData?.dob || ""}
            readOnly
            onChange={() => {}}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />

          {/* Email Input */}
          <TextBox
            label="Email ID"
            placeholder="Enter email here"
            type="email"
            value={email}
            onChange={validateEmail}
            required={true}
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
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
        {showOTP && (
          <OTPVerification
            onSubmit={handleOtpSubmit}
            onClose={() => setShowOTP(false)}
            message="Enter the 6-digit OTP sent to the user's Email to continue."
          />
        )}
      </div>
    </Accordion>
  );
};
export default CustomerDetailsForm;
