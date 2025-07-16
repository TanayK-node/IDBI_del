"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface DropdownOption {
  id: string;
  label: string;
}

interface ServiceDropdownProps {
  options: DropdownOption[];
  defaultValue?: string;
  onSelect?: (option: DropdownOption) => void;
  className?: string;
}

const ServiceDropdown: React.FC<ServiceDropdownProps> = ({
  options,
  defaultValue = "Open Savings Account",
  onSelect,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: DropdownOption) => {
    setSelectedValue(option.label);
    setIsOpen(false);
    onSelect?.(option);
  };

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={handleToggle}
        className="flex items-center justify-between w-full px-4 py-2 text-left-md hover:bg-gray-50 min-w-0"
      >
        <span className="text-gray-900 font-medium text-xl whitespace-nowrap truncate">
          {selectedValue}
        </span>
        <ChevronDownIcon
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option)}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDropdown;
