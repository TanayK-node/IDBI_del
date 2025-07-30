"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context
interface FundingContextType {
  fundingAmount: string;
  setFundingAmount: (value: string) => void;
}

// Create the context
const FundingContext = createContext<FundingContextType | undefined>(undefined);

// Provider component
export const FundingProvider = ({ children }: { children: ReactNode }) => {
  const [fundingAmount, setFundingAmount] = useState("");

  return (
    <FundingContext.Provider value={{ fundingAmount, setFundingAmount }}>
      {children}
    </FundingContext.Provider>
  );
};

// Custom hook for easier usage
export const useFunding = () => {
  const context = useContext(FundingContext);
  if (!context) {
    throw new Error("useFunding must be used within a FundingProvider");
  }
  return context;
};
