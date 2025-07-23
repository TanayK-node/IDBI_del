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
          <div className="flex justify-center mb-4">
            <img
              src="../assets/images/Succes.gif"
              alt="Success Animation"
              className="w-32 h-32"
            />
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
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                    />
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
