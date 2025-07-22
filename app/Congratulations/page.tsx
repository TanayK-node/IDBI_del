"use client"; // 👈 This makes it a Client Component

import { useRouter } from "next/navigation";
import { NextPage } from "next";
import Header from "../components/Header/index";
import CongratulationsComponent from "../local/CongratsScreen/index";
import ProceedFooter from "../components/Proceed/index";

const CongratulationsPage: NextPage = () => {
  const router = useRouter();

  const handleProceed = () => {
    router.push("/Congratulations"); // or your desired route
  };

  return (
    <>
      <Header />

      <CongratulationsComponent
        accountNumber="1234567894455"
        branch="Palace Road Branch"
        ifscCode="IDBI23456789"
      />
      <ProceedFooter onProceed={handleProceed} />
    </>
  );
};

export default CongratulationsPage;
