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
    router.push("/AddFunds"); // Navigate to the Add Funds page
  };

  return (
    <>
      <Header />
      <div>
      <CongratulationsComponent
        accountNumber="12345678944"
        branch="Mumbai Main Branch"
        ifscCode="IDBI23456789"
      />
      <ProceedFooter onProceed={handleProceed} />
      </div>
      
    </>
  );
};

export default CongratulationsPage;
