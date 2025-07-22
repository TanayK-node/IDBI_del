import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
interface CustomerData {
  name: string;
  dob: string;
  email: string;
  mobile?: string;
}

interface CustomerContextType {
  customerData: CustomerData;
  isVerified: boolean;
  setCustomerData: (data: CustomerData) => void;
  setIsVerified: (verified: boolean) => void;
  updateCustomerField: (field: keyof CustomerData, value: string) => void;
}

// Create Context
const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

// Context Provider Component
export const CustomerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    dob: "",
    email: "",
    mobile: "",
  });
  
  const [isVerified, setIsVerified] = useState(false);

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
    setIsVerified,
    updateCustomerField,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};

// Custom hook to use context
export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};

// Card Component
function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 w-full max-w-[1150.4px] mx-auto ${className}`}>
      {children}
    </div>
  );
}