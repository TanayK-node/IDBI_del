"use client";
import React from "react";
import Header from "../components/Header/index";
import AddFund from "../local/Fund/index";

import Button from "../components/Button/index";
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
          <Button
            onClick={handleProceed}
            className="px-3 py-1.5 text-sm rounded-2xl bg-orange-500 text-white hover:bg-orange-600"
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddFunds;
