"use client";
import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface InfoBoxProps {
  message: string;
  type?: 'info' | 'warning' | 'success' | 'error';
  showIcon?: boolean;
  className?: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ 
  message, 
  type = 'info',
  showIcon = true,
  className = "" 
}) => {
  
  const getTypeStyles = () => {
    switch (type) {
      case 'info':
        return {
          container: 'bg-blue-50 border-blue-200 text-blue-800',
          icon: 'text-blue-600'
        };
      case 'warning':
        return {
          container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
          icon: 'text-yellow-600'
        };
      case 'success':
        return {
          container: 'bg-green-50 border-green-200 text-green-800',
          icon: 'text-green-600'
        };
      case 'error':
        return {
          container: 'bg-red-50 border-red-200 text-red-800',
          icon: 'text-red-600'
        };
      default:
        return {
          container: 'bg-blue-50 border-blue-200 text-blue-800',
          icon: 'text-blue-600'
        };
    }
  };

  const styles = getTypeStyles();

  return (
  <div
    className={`inline-flex items-start gap-3 p-4 rounded-lg border ${styles.container} ${className}`}
  >
    {showIcon && (
      <div className="flex-shrink-0 mt-0.5">
        <InformationCircleIcon className={`h-5 w-5 ${styles.icon}`} />
      </div>
    )}
    <div className="text-sm leading-relaxed">
      {message}
    </div>
  </div>
);

};

export default InfoBox;