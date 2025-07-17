import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 w-full max-w-[1150.4px]  mx-auto ${className}`}>
      {children}
    </div>
  );
}