"use client";

import { useState } from "react";
import React from "react";
import Accordion from "../../components/Accord/index";
import TextBox from "../../components/TextBox/index";
import Button from "../../components/Button/index";
import StatusPopup from '../../components/PopUp/index';
import { useStatusPopup } from '../../hooks/Popup';


const CustomerIdProofPage = () => {
  const [pan, setPan] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const { popup, showLoading, showSuccess, showError, hidePopup } = useStatusPopup();

  const handleVerify = async () => {
  if (!pan.trim()) return;

  // Show loading popup
  showLoading(
    'Verifying PAN',
    'Please wait while we verify the PAN details securely from the NSDL site.'
  );

  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Random success/failure for demo
    const isSuccess = 1;

    if (isSuccess) {
      setIsVerified(true);
      setFormOpen(false);
      localStorage.setItem("idproof_verified", "true");

      console.log("PAN verified:", pan);

      showSuccess(
        'PAN Verified',
        'Customer PAN has been successfully verified from the NSDL database.'
      );
    } else {
      showError(
        'Verification Failed',
        'Could not verify PAN details. Please check the PAN and try again.'
      );
    }
  } catch (error) {
    showError(
      'Connection Error',
      'Failed to connect to verification service. Please check your internet connection and try again.'
    );
  }
};



 return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <Accordion
    title="Customer ID Proof"
    isVerified={isVerified}
    isOpen={formOpen}
      onToggle={setFormOpen}
  >
    <div className="flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
      {/* TextBox on the left */}
      <div>
        <TextBox
          label="Permanent Account Number (PAN)"
          placeholder="Enter PAN"
          value={pan}
          onChange={setPan}
          className="w-full sm:w-[336px] h-[48px]"
          required
        />
      </div>

      {/* Button on the right */}
      <div>
        <Button
          onClick={handleVerify}
          disabled={!pan.trim()}
          className={`w-auto px-6 py-3 focus:ring-gray-500 ${
            pan.trim()
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Verify
        </Button>
      </div>
      {/* Status Popup */}
      
    </div>
  </Accordion>
  <StatusPopup
        isOpen={popup.isOpen}
        status={popup.status}
        title={popup.title}
        message={popup.message}
        onClose={hidePopup}
        showCloseButton={popup.status !== 'loading'}
        autoClose={popup.status === 'success'}
        autoCloseDelay={3000}
      />
</div>

);

};

export default CustomerIdProofPage;
