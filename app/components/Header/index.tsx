"use client";
import Image from "next/image";
import { useState } from "react";
import UserMenu from "../Userprofile/index";

export default function Header() {
  const [isHindi, setIsHindi] = useState(false);

  const handleLanguageToggle = () => {
    setIsHindi(!isHindi);
    // Add your language change logic here
    console.log("Language changed to:", isHindi ? "English" : "Hindi");
  };

  return (
    <header className="bg-[#02836C] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <Image
                src="/assets/images/Logo/Logo.png" // Replace with your logo path
                alt="IDBI Bank Logo"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="flex items-center space-x-2">
              <span
                className={`text-sm font-medium ${
                  !isHindi ? "text-white" : "text-white/60"
                }`}
              >
                English
              </span>
              <button
                onClick={handleLanguageToggle}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isHindi ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`text-sm font-medium ${
                  isHindi ? "text-white" : "text-white/60"
                }`}
              >
                हिन्दी
              </span>
            </div>

            {/* User Icon */}
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
