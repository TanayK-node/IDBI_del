"use client"

import React, { createContext, useContext, useState } from "react";

type NomineeData = {
  name: string;
  relationship: string;
  dateOfBirth: string;
  mobileNumber: string;
  addressLine1?: string;
  addressLine2?: string;
  pinCode?: string;
};

type NomineeContextType = {
  nomineeData: NomineeData;
  setNomineeData: React.Dispatch<React.SetStateAction<NomineeData>>;
  sameAsCustomer: boolean;
  setSameAsCustomer: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultValues: NomineeData = {
  name: "",
  relationship: "",
  dateOfBirth: "",
  mobileNumber: "",
  addressLine1: "",
  addressLine2: "",
  pinCode: "",
};

const NomineeContext = createContext<NomineeContextType | undefined>(undefined);

export const NomineeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nomineeData, setNomineeData] = useState<NomineeData>(defaultValues);
  const [sameAsCustomer, setSameAsCustomer] = useState(false);

  return (
    <NomineeContext.Provider value={{ nomineeData, setNomineeData, sameAsCustomer, setSameAsCustomer }}>
      {children}
    </NomineeContext.Provider>
  );
};

export const useNominee = () => {
  const context = useContext(NomineeContext);
  if (!context) {
    throw new Error("useNominee must be used within a NomineeProvider");
  }
  return context;
};
