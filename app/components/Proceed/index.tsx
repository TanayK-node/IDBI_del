'use client';
import React, { useEffect, useState } from "react";
import Button from "../Button/index";

interface ProceedFooterProps {
  onProceed: () => void;
  className?:string;
}

const ProceedFooter: React.FC<ProceedFooterProps> = ({ onProceed }) => {
  const [sectionCompletion, setSectionCompletion] = useState({
    idproof: false,
    customerdetails: false,
    basicdetails: false,
    channel: false,
  });

  useEffect(() => {
    const checkVerified = () => {
      const idproof = localStorage.getItem("idproof_verified") === "true";
      const channel = localStorage.getItem("channel_services_saved") === "true";
      const basicdetails = localStorage.getItem("basic_details") === "true"; // <-- fixed
      const customerdetails =
        localStorage.getItem("customer_details") === "true"; // <-- fixed
      
      const updatedStatus = {
        idproof,
        channel,
        basicdetails,
        customerdetails,

      };

      
      setSectionCompletion(updatedStatus);
    };

    checkVerified(); // Initial check
    const interval = setInterval(checkVerified, 500);

    return () => clearInterval(interval);
  }, []);

  const isAllSectionsSaved = Object.values(sectionCompletion).every(Boolean);

  return (
    <div>
      <Button
        onClick={onProceed}
        disabled={!isAllSectionsSaved}
        className={`px-4 py-2 rounded font-semibold text-white transition duration-300 ${
          isAllSectionsSaved
            ? "bg-orange-500 hover:bg-orange-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Proceed
      </Button>
    </div>
  );
};

export default ProceedFooter;
