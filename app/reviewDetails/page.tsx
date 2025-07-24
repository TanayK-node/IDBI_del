"use client";

import React, { useState } from "react";
import Header from "../components/Header"; // Update path as needed
import ServiceDropdown from "../components/ServiceDropdown"; // Update path as needed
import Hero from "../components/Hero"; // Update path as needed
import CustomerId from "./CustomerId/index"; // Update path as needed
import { PanProvider } from "@/context/panContext"; // Ensure this path is correct
import CustomerDetailsDisplay from "./CustomerDisplay/index"; // Update path as needed
import { CustomerProvider } from "@/context/CustDetail";
import DetailsCard from "./BasicDetails";
import NomineeDetailsCard from "./Nomineedeets";
import BranchBankCard from "../local/Branch";
import Resident from "../local/Resident"
import ChannelCard from "./Channel";


export default function ReviewDetails() {
  const [selectedService, setSelectedService] =
    React.useState("Savings Account");
  const serviceOptions = [
    { id: "savings", label: "Savings Account" },
    { id: "loans", label: "Loans" },
    { id: "credit-cards", label: "Credit Cards" },
    { id: "fd", label: "FD" },
    { id: "rd", label: "RD" },
  ];
  const handleServiceSelect = (option: any) => {
    setSelectedService(option.label);
    console.log("Selected service:", option);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-950">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        {/* Service Dropdown */}
        <div className="mb-6">
          <ServiceDropdown
            options={serviceOptions}
            defaultValue="Savings Account"
            onSelect={handleServiceSelect}
            className="w-75"
          />
        </div>

        <Hero />
        <div className="space-y-6">
          <PanProvider>
            <CustomerProvider>
              <CustomerId />
              <CustomerDetailsDisplay />
            </CustomerProvider>
          </PanProvider>

          {/*Context left */}
          <DetailsCard />
          <NomineeDetailsCard />
          <BranchBankCard
            branchName="Bank Details"
            branchCode="IBKL0000126"
            address="World Trade Centre, Ground Floor, Cuffe Parade, Mumbai 400 005"
          />
          <ChannelCard/>
          <Resident/>
        </div>
      </div>
    </div>
  );
}
