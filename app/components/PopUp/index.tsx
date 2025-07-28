"use client";
import React from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
  ArrowUpOnSquareStackIcon,
} from "@heroicons/react/24/outline";

export type PopupStatus = "loading" | "success" | "error" | "uploaded";

interface StatusPopupProps {
  isOpen: boolean;
  status: PopupStatus;
  title: string;
  message: string;
  onClose?: () => void;
  showCloseButton?: boolean;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

const StatusPopup: React.FC<StatusPopupProps> = ({
  isOpen,
  status,
  title,
  message,
  onClose,
  showCloseButton = true,
  autoClose = false,
  autoCloseDelay = 3000,
}) => {
  React.useEffect(() => {
    if (isOpen && autoClose && status !== "loading") {
      const timer = setTimeout(() => {
        onClose?.();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, status, onClose]);

  if (!isOpen) return null;

  const getStatusConfig = () => {
    switch (status) {
      case "loading":
        return {
          icon: (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          ),
          iconBgColor: "bg-orange-50",
          titleColor: "text-gray-900",
          messageColor: "text-gray-600",
        };
      case "uploaded":
        return {
          icon: (
            <ArrowUpOnSquareStackIcon className="h-6 w-6 text-blue-500" />
          ),
          iconBgColor: "bg-blue-50",
          titleColor: "text-gray-800",
          messageColor: "text-gray-600",
        };
      case "success":
        return {
          icon: <CheckCircleIcon className="h-12 w-12 text-green-500" />,
          iconBgColor: "bg-green-50",
          titleColor: "text-gray-900",
          messageColor: "text-gray-600",
        };
      case "error":
        return {
          icon: <XCircleIcon className="h-12 w-12 text-red-500" />,
          iconBgColor: "bg-red-50",
          titleColor: "text-gray-900",
          messageColor: "text-gray-600",
        };
      default:
        return {
          icon: null,
          iconBgColor: "bg-gray-50",
          titleColor: "text-gray-900",
          messageColor: "text-gray-600",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75  transition-opacity z-10"
        onClick={status !== "loading" ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative z-20 bg-white rounded-lg shadow-xl p-6 mx-4 max-w-md w-full transform transition-all">
        {/* Close Button */}
        {showCloseButton && status !== "loading" && onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}

        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div
            className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full ${config.iconBgColor} mb-4`}
          >
            {config.icon}
          </div>

          {/* Title */}
          <h3 className={`text-lg font-semibold ${config.titleColor} mb-2`}>
            {title}
          </h3>

          {/* Message */}
          <p className={`text-sm ${config.messageColor} leading-relaxed`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusPopup;
