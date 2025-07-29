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
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 overflow-auto">
          <CongratulationsComponent
            accountNumber="12345678944"
            branch="Nariman Point Branch"
            ifscCode="IDBI23456789"
          />
        </div>
        <div className="justify-center flex pb-18">
          <ProceedFooter onProceed={handleProceed} />
        </div>
        
      </div>
    </>
  );
};

export default CongratulationsPage;
