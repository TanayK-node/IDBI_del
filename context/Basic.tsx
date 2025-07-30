
"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface BasicData {
  aadhaarNumber: string;
  vid?: string;
  name?: string;
  gender?: string;
  dateOfBirth?: string;
  address?: string;
}

const initialBasicData: BasicData = {
  aadhaarNumber: "",
};

interface BasicDataContextType {
  basicData: BasicData;
  setBasicData: (data: BasicData) => void;
  updateBasicField: (field: keyof BasicData, value: string) => void;
}

const BasicDataContext = createContext<BasicDataContextType | undefined>(undefined);

export const useBasicData = () => {
  const context = useContext(BasicDataContext);
  if (!context) {
    throw new Error("useBasicData must be used within a BasicDataProvider");
  }
  return context;
};

export const BasicDataProvider = ({ children }: { children: ReactNode }) => {
  const [basicData, setBasicData] = useState<BasicData>(initialBasicData);

  const updateBasicField = (field: keyof BasicData, value: string) => {
    setBasicData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <BasicDataContext.Provider value={{ basicData, setBasicData, updateBasicField }}>
      {children}
    </BasicDataContext.Provider>
  );
};
