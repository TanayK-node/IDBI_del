"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";


export interface ProfessionalDetailsData {
  occupation: string;
  organizationType: string;
  organizationName: string;
  sourceOfFunds: string;
  grossAnnualIncome: string;
}
const initialData: ProfessionalDetailsData = {
  occupation: "",
  organizationType: "",
  organizationName: "",
  sourceOfFunds: "",
  grossAnnualIncome: "",
};

interface ProfessionalDetailsContextType {
  profData: ProfessionalDetailsData;
  setProfData: (data: ProfessionalDetailsData) => void;
  updateProfField: (
    field: keyof ProfessionalDetailsData,
    value: string
  ) => void;
}

const ProfessionalDetailsContext = createContext<ProfessionalDetailsContextType | undefined>(undefined);

export const useProfessionalDetails = () => {
  const context = useContext(ProfessionalDetailsContext);
  if (!context) throw new Error("Must be used inside ProfessionalDetailsProvider");
  return context;
};

export const ProfessionalDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [profData, setProfData] = useState<ProfessionalDetailsData>(initialData);

  const updateProfField = (
    field: keyof ProfessionalDetailsData,
    value: string
  ) => {
    setProfData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ProfessionalDetailsContext.Provider
      value={{ profData, setProfData, updateProfField }}
    >
      {children}
    </ProfessionalDetailsContext.Provider>
  );
};
