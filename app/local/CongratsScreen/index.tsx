"use client";

import React , {useState} from "react";
import Toast from  "../../components/Toast/index"

// Define the props for the component
interface CongratulationsProps {
  accountNumber: string;
  branch: string;
  ifscCode: string;
  cifno:string;
}

// Handle the copy to clipboard functionality
const CongratulationsComponent: React.FC<CongratulationsProps> = ({
  accountNumber,
  branch,
  ifscCode,
  cifno,
}) => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
  const [showToast, setShowToast] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setToastMessage("Account Number Copied successfully");
        setToastType("success");
        setShowToast(true);
      },
      (err) => {
        console.error("Could not copy text: ", err);
        setToastMessage("Could not copy Account number");
        setToastType("error");
        setShowToast(true);
      }
    );
  };
  return (
    // Main container to center the card on the page
    <div className="flex  items-center justify-center bg-slate-50 p-4 pt-5 pb-6">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white p-6 text-center shadow-lg">
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
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-y-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
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
                  <img src="/assets/images/Copy.png"/>
                </button>
              </div>
            </div>
            {/* cif */}
            <div className="p-6 text-left">
              <div className="mb-1 text-xs text-gray-500">CIF no.</div>
              <div className="text-base font-semibold text-gray-800">
                {cifno}
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
      {showToast && (
  <Toast
    message={toastMessage}
    type={toastType}
    onClose={() => setShowToast(false)}
  />
)}
    </div>
    
  );
};

export default CongratulationsComponent;
