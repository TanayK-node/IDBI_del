"use client";
import React from "react";
import Header from "../components/Header/index";
import AddFund from "../local/Fund/index";
import ProceedFooter from "../components/Proceed";

import { useRouter } from "next/navigation";

const AddFunds = () => {
  const router = useRouter();

  const handleProceed = () => {
    console.log("Proceeding to next step");
    router.push("/Congratulations2"); // Navigate to the Add Funds page
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col min-h-screen">
        <AddFund />

        {/* Place button just below AddFund */}
        <div className="self-end mt-4 mr-4 pb-2">
          <ProceedFooter
            onProceed={handleProceed}
            className="px-3 py-1.5 text-sm rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default AddFunds;
