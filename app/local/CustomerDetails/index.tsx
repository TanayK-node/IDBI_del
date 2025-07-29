"use client";
import React, { useState } from "react";
import TextBox from "../../components/TextBox/index";
import Button from "../../components/Button/index";
import Accordion from "../../components/Accord/index";
import OTPVerification from "../../components/OTP/index";
import { useCustomer } from "../../../context/CustDetail"; // Ensure this path is correct
import InfoBox from "../../components/InfoBox";
import Dropdown from "./drop";
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
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [isMobileValid, setIsMobileValid] = useState(false);

  const [countryCode, setCountryCode] = useState("");
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
    setIsEmailVerified(true);
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
  const countryCodes: string[] = [
    "+91 (IND)",
    "+1 (USA)",
    "+44 (UK)",
    "+81 (JPN)",
  ];
  const handleCountryCodeChange = (value: string) => {
    setCountryCode(value);
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
        {/* Row 1: Name & DOB */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div>

        
        {/* Mobile Number Row */}
        <div className="md:col-span-1 grid grid-cols-13 gap-4 items-end mt-4">
          {/* Country Code Dropdown (2 columns) */}
          <div className="col-span-2 pb-8">
            <Dropdown
              label="Country Code"
              placeholder="+91 (IND)"
              options={countryCodes} // ✅ use the array here
              value={countryCode}
              onChange={handleCountryCodeChange}
            />
          </div>

          {/* Mobile Number TextBox (7 columns) */}
          <div className="col-span-4">
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

          {/* Verify Button (3 columns) */}
          <div className="col-span-3 pb-6 flex justify-end w-3/4">
            <Button
              onClick={handleVerifyMobile}
              disabled={!isMobileValid || isMobileOtpVerified}
              className={`w-full px-4 py-2 mt-1 text-sm focus:ring-gray-500 ${
                isMobileOtpVerified
                  ? "bg-green-500 text-white cursor-default"
                  : isMobileValid
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-gray-400 cursor-not-allowed text-gray-200"
              }`}
            >
              {isMobileOtpVerified ? "Verified" : "Verify Number"}
            </Button>
          </div>
        </div>

        {/* Email Info Box */}
        <div className="col-span-full">
          <InfoBox message="Make sure your email ID is correct as all communication from bank would be done on this email" />
        </div>

        {/* Email Row */}
        <div className="w-full flex justify-start">
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-3 gap-4 items-end mt-4">
              <div className="col-span-2">
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
              <div className="pb-6 flex justify-end w-4/5">
                <Button
                  onClick={handleVerify}
                  disabled={!isFormValid || isEmailVerified}
                  className={`w-full px-4 py-2 mt-1 text-sm focus:ring-gray-500 ${
                    isEmailVerified
                      ? "bg-green-500 text-white cursor-default"
                      : isFormValid
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "bg-gray-400 cursor-not-allowed text-gray-200"
                  }`}
                >
                  {isEmailVerified ? "Email Verified" : "Verify Email"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* OTP Components */}
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
