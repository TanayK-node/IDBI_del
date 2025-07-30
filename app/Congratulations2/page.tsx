"use client"; // 👈 This makes it a Client Component

import { useRouter } from "next/navigation";
import { NextPage } from "next";
import Header from "../components/Header/index";
import TransferSuccessful from "../local/Congrats2";


const CongratulationsPage: NextPage = () => {
  const router = useRouter();
  const handleGoHome = () => {
    console.log("Home");
  };

  return (
    <>
      <Header />
      <TransferSuccessful
        
        onGoHome={handleGoHome}
        
      />
    </>
  );
};

export default CongratulationsPage;
