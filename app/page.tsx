'use client';

import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Card from './components/Card';
import Accordion from './components/Accordion';
import TextBox from './components/TextBox';
import Button from './components/Button';

export default function Home() {
  const [pan, setPan] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <CustomerIdProofPage />
  );
}

const CustomerIdProofPage = () => {
  const [pan, setPan] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    if (pan.trim()) {
      setIsVerified(true);
      console.log('PAN verified:', pan);
    }
  };

  const handleProceed = () => {
    console.log('Proceeding with application');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-medium text-gray-900">Open Savings Account</h1>
          <svg
            className="w-5 h-5 ml-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <Hero />

      {/* Customer ID Proof Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
          <Accordion title="Customer ID Proof" isVerified={isVerified} defaultOpen={false}>
            <div className="flex space-x-4 items-end">
              <div className="flex-1">
                <TextBox
                  label="Permanent Account Number (PAN)"
                  placeholder="Enter PAN"
                  value={pan}
                  onChange={setPan}
                />
              </div>
              <div className="mb-6">
                <Button
                  onClick={handleVerify}
                  disabled={!pan.trim()}
                  className="w-auto px-6 py-3 bg-gray-400 hover:bg-gray-500 focus:ring-gray-500"
                >
                  Verify
                </Button>
              </div>
            </div>
          </Accordion>
       
      </div>
    </div>
  );
};
