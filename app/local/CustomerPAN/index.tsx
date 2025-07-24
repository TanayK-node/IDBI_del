"use client";

import { useState } from "react";
import React from "react";
import Accordion from "../../components/Accord/index";
import TextBox from "../../components/TextBox/index";
import Button from "../../components/Button/index";
import StatusPopup from "../../components/PopUp/index";
import { useStatusPopup } from "../../hooks/Popup";
import dummy from "./dummy.json"; // Assuming this is the path to your dummy data
import { useCustomer } from "../../../context/CustDetail";

interface CustomerIdProofPageProps {
  setCustomerData: (data: { name: string; dob: string }) => void;
}

const CustomerIdProofPage: React.FC<CustomerIdProofPageProps> = ({
  setCustomerData,
}) => {
  const [pan, setPan] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [formOpen, setFormOpen] = useState(true);
  const { popup, showLoading, showSuccess, showError, hidePopup } =
    useStatusPopup();
  const { updateCustomerField, markVerified,isAccordionOpen,
    setAccordionOpen } = useCustomer();

  const handleVerify = async () => {
  if (!pan.trim()) return;

  showLoading(
    "Verifying PAN",
    "Please wait while we verify the PAN details securely from the NSDL site."
  );

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const upperPan = pan.toUpperCase();
    const panDetails = (
      dummy as Record<string, { name: string; dob: string }>
    )[upperPan];

    if (panDetails) {
     
      
      localStorage.setItem("idproof_verified", "true");
      updateCustomerField("name", panDetails.name);
      updateCustomerField("dob", panDetails.dob);
      console.log("✅ PAN Verified:", upperPan);
      console.log("✅ Name:", panDetails.name);
      console.log("✅ DOB:", panDetails.dob);
      setAccordionOpen(true); // from useCustomer()
      setIsVerified(true);
      setFormOpen(false);

      showSuccess(
        "PAN Verified",
        "Customer PAN has been successfully verified."
      );
    } else {
      showError(
        "Verification Failed",
        "Could not verify PAN details. Please check the PAN."
      );
    }
  } catch (error) {
    showError("Error", "Something went wrong. Please try again.");
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
        showCloseButton={popup.status !== "loading"}
        autoClose={popup.status === "success"}
        autoCloseDelay={1500}
        onClose={hidePopup} // <-- Add this
      />
    </div>
  );
};

export default CustomerIdProofPage;
