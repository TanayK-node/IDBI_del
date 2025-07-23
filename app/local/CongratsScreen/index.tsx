"use client";

import React from "react";

// Define the props for the component
interface CongratulationsProps {
  accountNumber: string;
  branch: string;
  ifscCode: string;
}

// Handle the copy to clipboard functionality
const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text).then(
    () => {
      // Optional: Show a success message to the user
      alert("Account number copied to clipboard!");
    },
    (err) => {
      // Optional: Handle errors
      console.error("Could not copy text: ", err);
    }
  );
};

const CongratulationsComponent: React.FC<CongratulationsProps> = ({
  accountNumber,
  branch,
  ifscCode,
}) => {
  return (
    // Main container to center the card on the page
    <div className="flex  items-center justify-center bg-slate-50 p-4 pt-20 pb-14">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white p-12 text-center shadow-lg">
       
        {/* Success Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500">
            <svg
              className="h-10 w-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Congratulations!
        </h1>
        <p className="mb-2 text-base font-medium text-gray-600">
          IDBI Savings Account has been opened!
        </p>
        <p className="mb-10 text-sm text-gray-500">
          A Customer Details PDF has been sent to the customer’s
          <br />
          registered email and mobile number.
        </p>

        {/* Account Details Box */}
        <div className="rounded-xl border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-y-0 divide-y divide-gray-200">
            {/* Account Number */}
            <div className="p-6 text-left">
              <div className="mb-1 text-xs text-gray-500">Account Number</div>
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-gray-800">
                  {accountNumber}
                </span>
                <button
                  onClick={() => handleCopy(accountNumber)}
                  className="text-green-600 transition-transform duration-200 hover:scale-110"
                  aria-label="Copy account number"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.353-.026.69.02.993.124a2.25 2.25 0 011.56 1.402m-5.152 0c.264.03.53.052.81.052h3.376M3 10.5v6.75a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25V10.5a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 10.5z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Branch */}
            <div className="p-6 text-left">
              <div className="mb-1 text-xs text-gray-500">Branch</div>
              <div className="text-base font-semibold text-gray-800">
                {branch}
              </div>
            </div>

            {/* IFSC Code */}
            <div className="p-6 text-left">
              <div className="mb-1 text-xs text-gray-500">IFSC Code</div>
              <div className="text-base font-semibold text-gray-800">
                {ifscCode}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CongratulationsComponent;