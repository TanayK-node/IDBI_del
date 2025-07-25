"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import ProdHero from "./ProdHero";
import ServiceDropdown from "../components/ServiceDropdown";
import { useRouter } from "next/navigation";
import Toast from "../components/Toast";
const Product = () => {
  const [selectedService, setSelectedService] = useState("Savings Account");
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<
    "success" | "error" | "warning" | "info"
  >("info");
  const [showToast, setShowToast] = useState(false);
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
  const handleCloseToast = () => {
    setShowToast(false);
    setToastMessage(""); // Clear message when toast is closed
  };
  const handleServiceSelect = (option: any) => {
    setSelectedService(option.label);
    console.log("Selected service:", option);

    setToastMessage("Redirecting...");
    setToastType("success");
    setShowToast(true);
    setTimeout(() => {
      router.push("/");
    }, 500); // 1.5 second delay
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-950">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        {/* Service Dropdown */}
        <div className="mb-6">
          <ServiceDropdown
            options={serviceOptions}
            defaultValue={selectedService}
            onSelect={handleServiceSelect}
            className="w-[300px]"
          />
        </div>
        <ProdHero />
      </div>
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={toastType === "success" ? 2000 : 5000} // Shorter duration for success
          onClose={handleCloseToast}
          isVisible={showToast}
        />
      )}
    </div>
  );
};

export default Product;
