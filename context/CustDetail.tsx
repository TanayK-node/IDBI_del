"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
interface CustomerData {
  name: string;
  mobile: string;
  email: string;
  dob?: string;
}

interface CustomerContextType {
  customerData: CustomerData;
  isVerified: boolean;
  setCustomerData: (data: CustomerData) => void;
  markVerified: (verified: boolean) => void;
  updateCustomerField: (field: keyof CustomerData, value: string) => void;
  isAccordionOpen: boolean;
  setAccordionOpen: (open: boolean) => void;
}

// Create Context
const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

// Provider
export const CustomerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    dob: "",
    email: "",
    mobile: "",
  });

  const [isVerified, markVerified] = useState(false);
  const [isAccordionOpen, setAccordionOpen] = useState(false);

  const updateCustomerField = (field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const value: CustomerContextType = {
    customerData,
    isVerified,
    setCustomerData,
    markVerified,
    updateCustomerField,
    isAccordionOpen,
    setAccordionOpen,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};

// Hook
export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};
