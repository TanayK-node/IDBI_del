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
      </div>
    </div>
  );
};

export default AddFunds;
