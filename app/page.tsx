"use client";

import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CustomerIDProofPage from "./local/CustomerPAN";
import ServiceDropdown from "./components/ServiceDropdown";
import CustomerDetails from "./local/CustomerDetails";
import type { BasicData } from "./local/BasicDetails/index";
import CompleteForm from "./local/BasicDetails/index";
import BranchBankCard from "./local/Branch/index";
import Nominee from "./local/Nominee";
import ChannelServicesComponent from "./local/ChannelService/index";

export default function Home() {
  const [selectedService, setSelectedService] = useState(
    "Open Savings Account"
  );
  const [showBranchCard, setShowBranchCard] = useState(false);
  const [showNominee, setShowNominee] = useState(false);

  const serviceOptions = [
    { id: "savings", label: "Open Savings Account" },
    { id: "loans", label: "Loans" },
    { id: "credit-cards", label: "Credit Cards" },
    { id: "fd", label: "FD" },
    { id: "rd", label: "RD" },
  ];

  const handleBasicDetailsVerify = (basicData: BasicData) => {
    console.log("Basic details verified:", basicData);
    // Handle verification logic here
  };

  const handleServiceSelect = (option: any) => {
    setSelectedService(option.label);
    console.log("Selected service:", option);
  };

  const handleSubmit = (allData: any) => {
    console.log("All data submitted:", allData);
    // Additional submission logic
  };

  const handleProceed = () => {
    console.log("application");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Service Dropdown */}
        <div className="mb-6">
          <ServiceDropdown
            options={serviceOptions}
            defaultValue="Open Savings Account"
            onSelect={handleServiceSelect}
            className="w-75"
          />
        </div>

        <Hero />

        {/* Customer Proof and Details */}
        <CustomerIDProofPage />
        <CustomerDetails onVerify={handleProceed} defaultOpen={true} />

        {/* Aadhaar + Complete Form Section */}
        <CompleteForm
          basicData={{ aadhaarNumber: "" }}
          onSubmit={handleSubmit}
          onSubmitSuccess={() => {
            setShowBranchCard(true);
            setShowNominee(true);
          }}
        />

        {/* Render Branch Card only after form submitted */}
        {showBranchCard && (
          <div className="mt-6">
            <BranchBankCard
              branchName="Palace Road Branch"
              branchCode="IDBI000001"
              address="123, Jasmine Apartments, Palace Road, Bangalore, Karnataka - 560003"
              onChangeClick={() => setShowBranchCard(false)}
            />
          </div>
        )}
        {showNominee && (
          <div className="mt-6">
            <Nominee onChangeClick={() => setShowNominee(false)} />
          </div>
        )}
        <ChannelServicesComponent />
      </div>
    </div>
  );
}
