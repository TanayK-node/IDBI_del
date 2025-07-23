"use client";
import React, { useState } from "react";
import {
  CurrencyDollarIcon,
  GiftIcon,
  ShoppingBagIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import Accordion from "../../components/Accord/index";
import Dropdown from "../../components/DropBox/index";
import Button from "../../components/Button/index";

interface ChannelServicesData {
  debitCardType: string;
  chequeLeaves: string;
  whatsappBanking: boolean;
}

const ChannelServicesComponent: React.FC = () => {
  const [servicesData, setServicesData] = useState<ChannelServicesData>({
    debitCardType: "physical-virtual",
    chequeLeaves: "10",
    whatsappBanking: false,
  });

  const chequeOptions = [
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
  ];

  const [isServicesSaved, setIsServicesSaved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (
    field: keyof ChannelServicesData,
    value: string | boolean
  ) => {
    setServicesData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
  // You can add validation here if needed
  setIsServicesSaved(true);

  // ✅ Set localStorage flag
  localStorage.setItem("channel_services_saved", "true");
  console.log("Channel services saved:", servicesData);
};

  return (
   <Accordion
  title="Channel Services"
  isVerified={isServicesSaved}
  isOpen={isExpanded}
  onToggle={setIsExpanded}
>
  <div className="space-y-6">
    {/* Debit Card Type */}
    <div className="space-y-4">
      <h4 className="text-base font-semibold text-gray-900">
        Debit Card Type
      </h4>
      <div className="flex space-x-6">
        {["physical-virtual", "virtual-only"].map((type) => (
          <label key={type} className="flex items-center">
            <input
              type="radio"
              name="debitCardType"
              value={type}
              checked={servicesData.debitCardType === type}
              onChange={(e) =>
                handleInputChange("debitCardType", e.target.value)
              }
              className="h-4 w-4 text-[#02836C] focus:ring-[#02836C] border-gray-300"
            />
            <span className="ml-3 text-sm text-gray-700">
              {type === "physical-virtual"
                ? "Physical + Virtual"
                : "Virtual Only"}
            </span>
          </label>
        ))}
      </div>
    </div>

        {/* Recommendation Message */}
        <div className="text-sm text-gray-600  p-1 rounded-lg">
          To unlock the best rewards and discounts on the IDBI Zero Balance
          Saving Account, we recommend the Visa Signature PayWave Debit Card.
        </div>

        {/* Card Display Section */}
        <div className="bg-gradient-to-r from-teal-100 to-blue-100 p-6 rounded-lg">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Card Image */}
            <div className="lg:w-1/2 w-full">
              <img
                src="/assets/images/Card/Card.png" // ✅ fix your path to start from `/public` if using Next.js
                alt="Debit Card"
                className="w-full h-auto rounded-lg "
              />
            </div>

            {/* Features */}
            <div className="lg:w-1/2 w-full">
              <h3 className="text-lg font-semibold text-teal-600 text-center mb-4">
                Key Features & Benefits
              </h3>

              <div className="flex justify-center gap-8">
                {[
                  {
                    icon: (
                      <CurrencyDollarIcon className="h-8 w-8 text-teal-600 mb-2 mx-auto" />
                    ),
                    lines: ["2% Cross", "Currency", "Markup"],
                  },
                  {
                    icon: (
                      <GiftIcon className="h-8 w-8 text-teal-600 mb-2 mx-auto" />
                    ),
                    lines: ["15% Worth", "Reward", "Points"],
                  },
                  {
                    icon: (
                      <ShoppingBagIcon className="h-8 w-8 text-teal-600 mb-2 mx-auto" />
                    ),
                    lines: ["10% Worth", "Discount", "on Shopping"],
                  },
                ].map((feature, idx) => (
                  <div key={idx} className="text-center">
                    {feature.icon}
                    {feature.lines.map((line, i) => (
                      <div
                        key={i}
                        className="text-xs text-gray-700 font-medium"
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                <button className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center gap-1 mx-auto">
                  <EyeIcon className="h-4 w-4" />
                  View More Features
                </button>
              </div>

              <div className="text-center text-sm text-gray-600 mt-2">
                Fee: ₹599.00 per year (Taxes Extra)
              </div>
            </div>
          </div>
        </div>

        {/* Cheque Book Dropdown */}
        <div>
          <h4 className="text-base font-medium text-gray-900 mb-3">
            Cheque Book
          </h4>
          <Dropdown
            label="No. of Cheque Leaves"
            placeholder="Select number of cheque leaves"
            options={chequeOptions}
            value={servicesData.chequeLeaves}
            onChange={(value) => handleInputChange("chequeLeaves", value)}
            className="w-100 "
          />
          
        </div>

        {/* WhatsApp Banking */}
        <div>
          <h4 className="text-base font-medium text-gray-900 mb-3">
            WhatsApp Banking
          </h4>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={servicesData.whatsappBanking}
              onChange={(e) =>
                handleInputChange("whatsappBanking", e.target.checked)
              }
              className="h-4 w-4 text-[#02836C] focus:ring-[#02836C] border-gray-300 rounded"
            />
            <span className="ml-3 text-sm text-gray-700">
              You'll receive a confirmation message to start using the service.
            </span>
          </label>
        </div>
        {/*button*/}
        <div className="text-center mt-6">
          <Button
            onClick={() => {
              handleSave();
              setIsServicesSaved(true);   // ✅ shows green tick
              setIsExpanded(false);       // ✅ closes accordion
              console.log("Channel Services Updated");
            }}
            disabled={!servicesData.debitCardType || !servicesData.chequeLeaves}
            className={`w-auto px-6 py-3 focus:ring-gray-500 ${
              servicesData.debitCardType && servicesData.chequeLeaves
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Update Services
          </Button>
        </div>
      </div>
    </Accordion>
  );
};

export default ChannelServicesComponent;
