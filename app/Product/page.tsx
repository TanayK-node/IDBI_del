"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import ProdHero from "./ProdHero";
import ServiceDropdown from "../components/ServiceDropdown";
import { useRouter } from "next/navigation";


const Product = () => {
  const [selectedService, setSelectedService] = useState("Savings Account");
    const router = useRouter();
 
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

  const handleServiceSelect = (option: any) => {
    setSelectedService(option.label);
    console.log("Selected service:", option);
    router.push("/")
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
    </div>
  );
};

export default Product;
