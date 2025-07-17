"use client";
import React, { useState } from 'react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isVerified?: boolean;
  defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ 
  title, 
  children, 
  isVerified = false, 
  defaultOpen = false 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full max-w-[1150.4px]  mx-auto">
      {/* Accordion Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={handleToggle}
      >
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center w-5 h-5 rounded-full ${
              isVerified ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <CheckIcon className={`w-3 h-3 ${isVerified ? 'text-white' : 'text-gray-600'}`} />
          </div>
          <ChevronDownIcon 
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div> {/* ✅ This was the missing closing tag */}

      {/* Accordion Content */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-400 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="pt-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
