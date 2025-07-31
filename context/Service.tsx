"use client"

import React, { createContext, useContext, useState } from "react";

type ServicesDataType = {
  debitCardType: string;
  chequeLeaves: string;
  whatsappBanking: boolean;
};

type ServicesContextType = {
  servicesData: ServicesDataType;
  handleInputChange: (field: keyof ServicesDataType, value: any) => void;
};

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export const ServicesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [servicesData, setServicesData] = useState<ServicesDataType>({
    debitCardType: "",
    chequeLeaves: "",
    whatsappBanking: false,
  });

  const handleInputChange = (field: keyof ServicesDataType, value: any) => {
    setServicesData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ServicesContext.Provider value={{ servicesData, handleInputChange }}>
      {children}
    </ServicesContext.Provider>
  );
};

// Hook to use context
export const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error("useServices must be used within a ServicesProvider");
  }
  return context;
};
