// context/PanContext.tsx
"use client"; // required for context in app directory

import React, { createContext, useContext, useState } from "react";

type PanContextType = {
  pan: string;
  setPan: (value: string) => void;
};

const PanContext = createContext<PanContextType | undefined>(undefined);

export const PanProvider = ({ children }: { children: React.ReactNode }) => {
  const [pan, setPan] = useState("");

  return (
    <PanContext.Provider value={{ pan, setPan }}>
      {children}
    </PanContext.Provider>
  );
};

export const usePan = () => {
  const context = useContext(PanContext);
  if (!context) throw new Error("usePan must be used within PanProvider");
  return context;
};
