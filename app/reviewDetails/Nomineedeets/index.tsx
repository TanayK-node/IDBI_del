import React from "react";
import Card from "@/app/components/Card";
import { useNominee } from "../../../context/Nomineecon";

// FieldDisplay Props
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

// Main Nominee Details Component
export default function NomineeDetailsCard() {
  const { nomineeData, sameAsCustomer } = useNominee();
 

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
      <Card className="p-8">
        {/* Nominee Details Section */}
        <div>
          <SectionHeader title="Nominee Details" />

          {/* First Row - Name, Relationship, Date of Birth */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <FieldDisplay label="Name" value={nomineeData.name} />
            <FieldDisplay
              label="Relationship"
              value={nomineeData.relationship}
            />
            <FieldDisplay
              label="Date of Birth"
              value={nomineeData.dateOfBirth}
            />
          </div>

          {/* Second Row - Mobile Number, Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FieldDisplay
              label="Mobile Number"
              value={nomineeData.mobileNumber}
            />
            {!sameAsCustomer && (
              <>
                <p>
                  <strong>Address Line 1:</strong> {nomineeData.addressLine1}
                </p>
                <p>
                  <strong>Address Line 2:</strong> {nomineeData.addressLine2}
                </p>
                <p>
                  <strong>Pin Code:</strong> {nomineeData.pinCode}
                </p>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
