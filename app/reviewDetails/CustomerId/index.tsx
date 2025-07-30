'use client'
import React, {useState}from 'react'
import Card from "../../components/Card/index"; 
import { useUser } from "../../../context/panContext";

const CustomerId = () => {
      const { pan } = useUser();
  return (
        <Card className="p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Customer ID Proof
              </h2>
            </div>
            
            {/* Content */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Permanent Account Number (PAN)
                </label>
                <div className="text-base font-medium text-gray-900">
                  {pan || "PAN not set"}
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </Card>
  )
}

export default CustomerId;