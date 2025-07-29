// components/UserMenu.tsx
'use client'
import { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { useRouter } from "next/navigation"; // if using Next.js
import LogoutPopup from "../Logoutpop/index";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
   const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const router = useRouter();

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };
  const handleLogout = () => {
    setShowLogoutPopup(true);
    
  };
  const confirmLogout = () => {
    console.log("Loggin off- to login page")
    setShowLogoutPopup(false);
    router.push("/login");
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Button Style */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2  rounded px-3 py-1 text-white hover:bg-white/10 transition"
      >
        <FaUser className="text-white text-sm" />
        <span className="font-medium text-white text-sm">Profile</span>
        <FiChevronDown className="text-white text-sm" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black/10 z-50">
          <div className="py-1">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => alert("My Profile")}
            >
              My Profile
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
      <LogoutPopup
        isOpen={showLogoutPopup}
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutPopup(false)}
      />



    </div>
  );
}
