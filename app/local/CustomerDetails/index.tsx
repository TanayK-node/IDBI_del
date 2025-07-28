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
  const [showMobileOTP, setShowMobileOTP] = useState(false);
  const [isMobileOtpVerified, setIsMobileOtpVerified] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [isMobileValid, setIsMobileValid] = useState(false);

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

  const handleVerifyMobile = () => {
    console.log("Verify button clicked");
    console.log("mobile value:", mobile);
    console.log("Length:", mobile.length);

    const isValidMobile = /^[0-9]{10}$/.test(mobile);

    if (mobile && isValidMobile) {
      console.log("Mobile number verified:", mobile);

      // Callback to mark as verified (if needed)
      setShowMobileOTP(true); // Show OTP input field
      localStorage.setItem("mobile_verified", "true");
      setMobileError(""); // clear error
    } else {
      console.log("Invalid mobile number");
      setMobileError("Please enter a valid 10-digit mobile number.");
    }
  };

  const handleOtpSubmitMobile = (otp: string) => {
    console.log("Mobile OTP verified successfully:", otp);

    // Simulate successful OTP verification (or replace with real logic)
    setIsMobileOtpVerified(true); // ✅ Mark OTP as verified
    setShowMobileOTP(false); // ✅ Hide OTP field
  };

  const validateEmail = (value: string) => {
    setEmail(value);
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setIsEmailValid(isValid);
    setEmailError(isValid ? "" : "Please enter a valid email address.");
  };

  const validateMobile = (value: string) => {
    setMobile(value);

    const isValid = /^[0-9]{10}$/.test(value);
    setIsMobileValid(isValid);
    setMobileError(
      isValid || value === ""
        ? ""
        : "Please enter a valid mobile number. (10 digits)"
    );
  };
  const isMobileFormValid = isMobileValid;
  const isMobilOtpFormValid = isMobileValid && isMobileOtpVerified;
  const isFormValid = Boolean(
    customerData.name && customerData.dob && isEmailValid && isMobilOtpFormValid
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
          <div className="flex flex-col">
            <TextBox
              label="Email ID"
              placeholder="Enter email here"
              type="text"
              value={email}
              onChange={validateEmail}
              required={true}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <div className="flex flex-col">
              <TextBox
                label="Mobile Number"
                placeholder="Enter Mobile Number"
                type="text"
                value={mobile}
                onChange={validateMobile}
                required={true}
              />
              {mobileError && (
                <p className="text-red-500 text-sm mt-1">{mobileError}</p>
              )}
            </div>
          </div>
          <div className="pt-6">
          <Button
            onClick={handleVerifyMobile}
            disabled={!isMobileFormValid}
            className={`pt-px-2 py-1 text-sm focus:ring-gray-500 ${
              isMobileFormValid
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-gray-400 cursor-not-allowed text-gray-200"
            }`}
          >
            Verify Number
          </Button>
          </div>
        </div>

        <div className="flex justify-end w-full pt-1">
          <Button
            onClick={handleVerify}
            disabled={!isFormValid}
            className={`w-0.1 px-6 py-3 focus:ring-gray-500 ${
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
        {showMobileOTP && (
          <OTPVerification
            onSubmit={handleOtpSubmitMobile}
            onClose={() => setShowOTP(false)}
            message="Enter the 6-digit OTP sent to the user's Phone Number to continue."
          />
        )}
      </div>
    </Accordion>
  );
};
export default CustomerDetailsForm;
