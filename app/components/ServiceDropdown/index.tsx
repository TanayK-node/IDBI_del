"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface DropdownOption {
  id: string;
  label: string;
  subOptions?: DropdownOption[];
}

interface ServiceDropdownProps {
  options: DropdownOption[];
  defaultValue?: string;
  onSelect?: (option: { main: string; sub?: string }) => void;
  className?: string;
}

const ServiceDropdown: React.FC<ServiceDropdownProps> = ({
  options,
  defaultValue = "Select Option",
  onSelect,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMain, setSelectedMain] = useState<string>("");
  const [selectedSub, setSelectedSub] = useState<string>("");
  const [hoveredMainId, setHoveredMainId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMainHover = (id: string) => {
    setHoveredMainId(id);
  };

  const handleMainClick = (main: DropdownOption) => {
    if (!main.subOptions || main.subOptions.length === 0) {
      setSelectedMain(main.label);
      setSelectedSub("");
      setIsOpen(false);
      onSelect?.({ main: main.label });
    }
  };

  const handleSubSelect = (sub: DropdownOption, main: DropdownOption) => {
    setSelectedMain(main.label);
    setSelectedSub(sub.label);
    setIsOpen(false);
    onSelect?.({ main: main.label, sub: sub.label });
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayLabel = selectedMain
    ? `${selectedMain}${selectedSub ? ` (${selectedSub})` : ""}`
    : defaultValue;

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="flex items-center justify-between w-full px-4 py-2 text-left-md hover:bg-gray-50 min-w-0"
      >
        <span className="text-gray-900 font-medium text-xl whitespace-nowrap truncate">
          {displayLabel}
        </span>
        <ChevronDownIcon
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 flex">
          {/* Main Options */}
          <div className="py-1 min-w-[180px]">
            {options.map((option) => (
              <div
                key={option.id}
                className="relative group"
                onMouseEnter={() => handleMainHover(option.id)}
              >
                <button
                  onClick={() => handleMainClick(option)}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex justify-between items-center"
                >
                  {option.label}
                  {option.subOptions && <ChevronRightIcon className="w-4 h-4 text-gray-400" />}
                </button>

                {/* Sub Options */}
                {option.subOptions && hoveredMainId === option.id && (
                  <div className="absolute left-full top-0 ml-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 min-w-[160px]">
                    {option.subOptions.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleSubSelect(sub, option)}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDropdown;
