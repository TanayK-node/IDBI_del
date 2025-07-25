"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  placeholder: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder,
  options,
  value,
  onChange,
  required = false,
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className={`mb-6 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02836C] focus:border-transparent text-left bg-white ${
            disabled
              ? "bg-gray-100 cursor-not-allowed"
              : "hover:border-gray-400"
          } ${selectedOption ? "text-[#2A2A28]" : "text-gray-500"}`}
        >
          <div className="flex items-center justify-between">
            <span>{displayText}</span>
            <ChevronDownIcon
              className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            <div className="max-h-[180px] overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleOptionClick(option.value)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 ${
                    value === option.value
                      ? "bg-[#02836C] text-white hover:bg-[#02836C]"
                      : "text-gray-900"
                  }`}
                >
                  <div className="text-base font-medium text-gray-900 ">
                    {option.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
