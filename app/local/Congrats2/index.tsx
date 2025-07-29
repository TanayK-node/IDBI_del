"use client";
import React, { useState } from "react";
import Button from "../../components/Button/index";
import { useRouter } from "next/navigation";
import Toast from "../../components/Toast/index";

const TransferSuccessful = ({
  successImage = null,
  fundingAmount = "90,000.00",
  onGoHome = () => console.log("Go to Home clicked"),
}) => {
  const router = useRouter();
  const handleGoHome = () => {
    onGoHome(); // optional callback
    router.push("/"); // ✅ redirect only on button click
  };
  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString("en-GB");
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${date}, ${time}`;
  };

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<
    "success" | "error" | "warning" | "info"
  >("info");
  const [showToast, setShowToast] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setToastMessage("Transaction ID Copied successfully");
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
  const generateTransactionId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const transactionId = generateTransactionId();
  const currentDateTime = getCurrentDateTime();

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-full h-auto lg:max-w-[1200px] lg:h-[600px] p-8 flex flex-col justify-between overflow-auto">
        {/* TOP SECTION */}
        <div className="bg-gray-200 rounded-xl p-6 mb-6">
          <div className="flex justify-center mb-4">
            <img
              src="../assets/images/Succes.gif"
              alt="Success Animation"
              className="w-32 h-32"
            />
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Transfer Successful
            </h2>
            <p className="text-gray-600 text-sm">
              Funds have been added to your account!
            </p>
          </div>
        </div>

        {/* TRANSACTION INFO */}
        <div className="rounded-xl border border-black p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Transaction Information
          </h3>
          <hr className="border-black mb-4" />

          <div className="grid grid-cols-4 gap-6 items-center text-sm text-gray-900">
            {/* Transaction ID */}
            <div>
              <p className="text-xs text-gray-500 mb-1">Transaction ID</p>
              <div className="flex items-center gap-1">
                <p className="font-medium">{transactionId}</p>
                <button
                  onClick={() => handleCopy(transactionId)}
                  className="text-green-600 transition-transform duration-200 hover:scale-110"
                  aria-label="Copy account number"
                >
                  <img src="/assets/images/copy.png" />
                </button>
              </div>
            </div>

            {/* Funding Amount */}
            <div>
              <p className="text-xs text-gray-500 mb-1">Funding Amount</p>
              <p className="font-medium">₹{fundingAmount}</p>
            </div>

            {/* Completed On */}
            <div>
              <p className="text-xs text-gray-500 mb-1">Completed On</p>
              <p className="font-medium">{currentDateTime}</p>
            </div>

            {/* Payment Mode */}
            <div>
              <p className="text-xs text-gray-500 mb-1">Payment Mode</p>
              <p className="font-semibold">IMPS</p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-2 flex justify-center">
          <Button
            onClick={handleGoHome}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded-lg font-medium transition-colors duration-200"
          >
            Go to Home
          </Button>
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

export default TransferSuccessful;
