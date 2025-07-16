'use client';

import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CustomerIDProofPage from './components/CustomerPAN';
import ServiceDropdown from './components/ServiceDropdown';
import CustomerDetails from './components/CustomerDetails';
import BasicDetails from './components/BasicDetails';
import type { BasicData } from './components/BasicDetails';

export default function Home() {
  const [selectedService, setSelectedService] = useState("Open Savings Account");

  const serviceOptions = [
    { id: 'savings', label: 'Open Savings Account' },
    { id: 'loans', label: 'Loans' },
    { id: 'credit-cards', label: 'Credit Cards' },
    { id: 'fd', label: 'FD' },
    { id: 'rd', label: 'RD' },
  ];

  const handleBasicDetailsVerify = (basicData: BasicData) => {
  console.log('Basic details verified:', basicData);
  // Handle verification logic here
  // API call, state update, etc.
};

  const handleServiceSelect = (option: any) => {
    setSelectedService(option.label);
    console.log('Selected service:', option);
  };

  const handleProceed = () => {
    console.log("application"); 
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Page Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="mb-6">
          <ServiceDropdown
            options={serviceOptions}
            defaultValue="Open Savings Account"
            onSelect={handleServiceSelect}
            className="w-75 "
          />
        </div>

        <Hero />

        {/* Customer ID Proof Section */}
        <CustomerIDProofPage />
        <CustomerDetails
          onVerify={handleProceed}
          defaultOpen={true}
        />
        <BasicDetails onVerify={handleBasicDetailsVerify} />
      </div>
    </div>
  );
}
