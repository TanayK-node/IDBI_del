"use client";
import React, { useState } from "react";
import Toast from "../../../components/Toast/index";
const PaymentLink = ({
  setProBut,
}: {
  setProBut: (value: boolean) => void;
}) => {
  const [link] = useState("https://pay.example.com/txn/ABC123");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<
    "success" | "error" | "warning" | "info"
  >("info");
  const [showToast, setShowToast] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setToastMessage("Link Copied Succesfully!");
      setToastType("success");
      setShowToast(true);
      setProBut(true);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };
  const handleCloseToast = () => {
    setShowToast(false);
    setToastMessage(""); // Clear message when toast is closed
  };
  const handleSend = () => {
    setToastMessage("Link Sent Succesfully!");
    setToastType("success");
    setShowToast(true);
    setProBut(true);
  };

  return (
    <div className="flex flex-col space-y-4 p-4  rounded-xl  bg-white">
      <input
        type="text"
        value={link}
        readOnly
        className="px-4 py-2 border rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
      />
      <div className="flex space-x-4">
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
        >
          Send Link
        </button>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Copy Link
        </button>
      </div>
      {/* Toast Component */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={toastType === "success" ? 2000 : 5000} // Shorter duration for success
          onClose={handleCloseToast}
          isVisible={showToast}
        />
      )}
    </div>
  );
};

export default PaymentLink;
