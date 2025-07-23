"use client"; // 👈 This makes it a Client Component

import { useRouter } from "next/navigation";
import { NextPage } from "next";
import Header from "../components/Header/index";
import CongratulationsComponent from "../local/CongratsScreen/index";
import ProceedFooter from "../components/Proceed/index";

const CongratulationsPage: NextPage = () => {
  const router = useRouter();

  const handleProceed = () => {
    console.log("Proceeding to next step");
  };

  return (
    <>
      <Header />
      <div>
      <CongratulationsComponent
        accountNumber="1234567894455"
        branch="Palace Road Branch"
        ifscCode="IDBI23456789"
      />
      <ProceedFooter onProceed={handleProceed} />
      </div>
      
    </>
  );
};

export default CongratulationsPage;
