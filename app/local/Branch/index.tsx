import React from 'react';
import Card  from '../../components/Card/index'; // Adjust path as needed

interface BankBranchCardProps {
  branchName: string;
  branchCode: string;
  address: string;
  onChangeClick?: () => void;
  className?: string;
}

export default function BankBranchCard({
  branchName,
  branchCode,
  address,
  onChangeClick,
  className = ""
}: BankBranchCardProps) {
  return (
    <Card className={`p-4 ${className}`}>
      <div className="space-y-2">
        {/* Header with branch name and change button */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 text-base">
            {branchName}
          </h3>
          <button
            onClick={onChangeClick}
            className="text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors"
          >
            Change
          </button>
        </div>

        {/* Branch location */}
        <div className="text-gray-800 text-sm font-medium">
          Mumbai Main Branch
        </div>

        {/* IFSC Code */}
        <div className="text-gray-600 text-sm">
          IFSC Code: {branchCode}
        </div>

        {/* Address */}
        <div className="text-gray-600 text-sm leading-relaxed">
          {address}
        </div>
      </div>
    </Card>
  );
}