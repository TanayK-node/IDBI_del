// context/UserContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  pan: string;
  setPan: (value: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [pan, setPan] = useState("");

  return (
    <UserContext.Provider value={{ pan, setPan }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
