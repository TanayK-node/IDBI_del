"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CustomerIDProofPage from "./local/CustomerPAN";
import ServiceDropdown from "./components/ServiceDropdown";
import CustomerDetailsForm from "./local/CustomerDetails/index";
import type { BasicData } from "./local/BasicDetails/index";
import CompleteForm from "./local/BasicDetails/index";
import BranchBankCard from "./local/Branch/index";
import Nominee from "./local/Nominee";
import ChannelServicesComponent from "./local/ChannelService/index";
import IndianResidentCard from "./local/Resident/index";
import ProceedFooter from "./components/Proceed/index";
import PhotoCapture from "./local/Face/index";
import SignatureCapture from "./local/Sign/index"; // Assuming you have a SignatureCapture component
import { CustomerProvider } from "@/context/CustDetail"; // Ensure this path is correct
import { Router } from "lucide-react";
import Toast from "./components/Toast/index";

export default function Home() {
  const [selectedService, setSelectedService] = useState(
    "Open Savings Account"
  );
  const [showBranchCard, setShowBranchCard] = useState(false);
  const [showNominee, setShowNominee] = useState(false);
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<
    "success" | "error" | "warning" | "info"
  >("info");
  const [showToast, setShowToast] = useState(false);
  const [customerData, setCustomerData] = useState<{
    name: string;
    dob: string;
  } | null>(null);
  const serviceOptions = [
    {
      id: "savings",
      label: "Savings Account",
      subOptions: [
        { id: "regular", label: "Regular" },
        { id: "corporate", label: "Corporate Salary" },
        { id: "nre", label: "NRE" },
        { id: "nro", label: "NRO" },
      ],
    },
    {
      id: "credit",
      label: "Credit Cards",
    },
    {
      id: "fd",
      label: "Fixed Deposits",
    },
    {
      id: "loans",
      label: "Loans",
    },
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
    setTimeout(() => {
      router.push("/Congratulations");
    }, 1000); // 1.5 seconds delay
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

        {/* Customer Proof and Details */}

        <CustomerProvider>
          <CustomerIDProofPage setCustomerData={setCustomerData} />
          <CustomerDetailsForm />
        </CustomerProvider>

        {/* Photo Capture Section */}
        <div className="mt-4">
          <PhotoCapture />
        </div>

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
          <div className="mt-4">
            <BranchBankCard
              branchName="Bank Details"
              branchCode="IBKL0000126"
              address="World Trade Centre, Ground Floor, Cuffe Parade, Mumbai 400 005"
              onChangeClick={() => setShowBranchCard(false)}
            />
          </div>
        )}
        {showNominee && (
          <div className="mt-6">
            <Nominee onChangeClick={() => setShowNominee(false)} />
          </div>
        )}
        <div className="mt-4">
          <ChannelServicesComponent />
        </div>
        <div className="mt-4">
          <IndianResidentCard />
        </div>
        <div className="mt-4">
          <SignatureCapture />
        </div>
        {/* Proceed Footer */}
        <div className="mt-6">
          <ProceedFooter onProceed={handleProceed} />
        </div>
      </div>
          
    </div>
    
  );
}
