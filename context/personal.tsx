// PersonalDetailsContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface PersonalDetailsData {
  customerEmail: string;
  emailForCommunication: boolean;
  maritalStatus: string;
  fatherName: string;
  motherName: string;
}

const initialPersonalDetails: PersonalDetailsData = {
  customerEmail: "",
  emailForCommunication: false,
  maritalStatus: "",
  fatherName: "",
  motherName: "",
};

interface PersonalDetailsContextType {
  personalData: PersonalDetailsData;
  setPersonalData: (data: PersonalDetailsData) => void;
  updatePersonalField: (field: keyof PersonalDetailsData, value: string | boolean) => void;
}

const PersonalDetailsContext = createContext<PersonalDetailsContextType | undefined>(undefined);

export const usePersonalDetails = () => {
  const context = useContext(PersonalDetailsContext);
  if (!context) throw new Error("usePersonalDetails must be used within a PersonalDetailsProvider");
  return context;
};

export const PersonalDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [personalData, setPersonalData] = useState<PersonalDetailsData>(initialPersonalDetails);

  const updatePersonalField = (field: keyof PersonalDetailsData, value: string | boolean) => {
    setPersonalData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <PersonalDetailsContext.Provider value={{ personalData, setPersonalData, updatePersonalField }}>
      {children}
    </PersonalDetailsContext.Provider>
  );
};
