"use client";
import React, { useState, useEffect } from 'react';
import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
  isVisible?: boolean;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 5000,
  onClose,
  isVisible = true,
}) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose?.();
    }, 300); // Wait for animation to complete
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          iconColor: 'text-green-600',
          icon: CheckCircleIcon,
        };
      case 'error':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          iconColor: 'text-red-600',
          icon: XCircleIcon,
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
          iconColor: 'text-yellow-600',
          icon: ExclamationTriangleIcon,
        };
      case 'info':
      default:
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          iconColor: 'text-blue-600',
          icon: InformationCircleIcon,
        };
    }
  };

  const styles = getTypeStyles();
  const IconComponent = styles.icon;

  if (!show) return null;

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 max-w-md w-full mx-auto
        transform transition-all duration-300 ease-in-out
        ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div
        className={`
          ${styles.bgColor} ${styles.borderColor} ${styles.textColor}
          border rounded-lg shadow-lg p-4 flex items-start space-x-3
        `}
      >
        {/* Icon */}
        <div className="flex-shrink-0">
          <IconComponent className={`h-5 w-5 ${styles.iconColor}`} />
        </div>

        {/* Message */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{message}</p>
        </div>

        {/* Close Button */}
        <div className="flex-shrink-0">
          <button
            onClick={handleClose}
            className={`
              ${styles.textColor} hover:opacity-75 focus:outline-none 
              focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent
              rounded-md p-1
            `}
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;