import React from 'react';
import Card from "../../components/Card/index";
import { useServices } from "../../../context/Service";


// Using your existing Card component
interface FieldDisplayProps {
  label: string;
  value: string;
  className?: string;
}

// Field Display Component - matches image styling
function FieldDisplay({ label, value, className = "" }: FieldDisplayProps) {
  return (
    <div className={`${className}`}>
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-sm font-medium text-gray-900 leading-relaxed">
        {value || "Not provided"}
      </div>
    </div>
  );
}

// SectionHeader Props
interface SectionHeaderProps {
  title: string;
}

// Section Header Component - matches image styling
function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <h3 className="text-base font-semibold text-gray-900 mb-4">{title}</h3>
  );
}

interface CheckboxOptionProps {
  label: string;
  isSelected: boolean;
}
// Checkbox Display Component - for WhatsApp Banking confirmation
function CheckboxOption({ label, isSelected }: CheckboxOptionProps) {
  return (
    <div className="flex items-start space-x-3">
      <div className={`w-4 h-4 border-2 rounded flex items-center justify-center mt-0.5 ${
        isSelected ? 'border-green-500 bg-green-500' : 'border-gray-400 bg-white'
      }`}>
        {isSelected && (
          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <span className="text-sm text-gray-700 leading-relaxed">{label}</span>
    </div>
  );
}

// Main Channel Services Component
export default function ChannelCard() {
    const { servicesData } = useServices();
  // Sample data - this will be replaced with context data
  const channelServicesData = {
    debitCardType: "Physical + Virtual",
    debitCardName: "Visa Signature PayWave Debit Card",
    numberOfChequeBooks: "1",
    numberOfChequeLeaves: "10",
    whatsappBankingEnabled: true
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="p-8">
        
        {/* Channel Services Section */}
        <div className="space-y-6">
          <SectionHeader title="Channel Services" />
          
          {/* Debit Card Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <FieldDisplay 
              label="Debit Card Type" 
              value={servicesData.debitCardType} 
            />
           
          </div>

          {/* Cheque Book Section */}
          <div className="mb-6">
            <SectionHeader title="Cheque Book" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <FieldDisplay 
                label="No. of Cheque Leaves" 
                value={servicesData.chequeLeaves} 
              />
            </div>
          </div>

          {/* WhatsApp Banking Section */}
          <div>
            <SectionHeader title="Whatsapp Banking" />
            <CheckboxOption 
              label="You'll receive a confirmation message to start using the service." 
              isSelected={channelServicesData.whatsappBankingEnabled}
            />
          </div>
        </div>

      </Card>
    </div>
  );
}