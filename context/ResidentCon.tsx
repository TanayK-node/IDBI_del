"use client"

import React, { createContext, useContext, useState } from "react";

type IndianResidentContextType = {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
};

const IndianResidentContext = createContext<IndianResidentContextType | undefined>(undefined);

export const IndianResidentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState("Yes"); // Default to "Yes" or ""

  return (
    <IndianResidentContext.Provider value={{ selectedOption, setSelectedOption }}>
      {children}
    </IndianResidentContext.Provider>
  );
};

export const useIndianResident = () => {
  const context = useContext(IndianResidentContext);
  if (!context) {
    throw new Error("useIndianResident must be used within an IndianResidentProvider");
  }
  return context;
};
