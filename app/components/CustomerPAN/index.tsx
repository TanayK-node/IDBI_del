'use client';

import { useState } from 'react';
import React from 'react';
import Accordion from '../Accord/index';
import TextBox from '../TextBox/index';
import Button from '../Button/index';

const CustomerIdProofPage = () => {
  const [pan, setPan] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    if (pan.trim()) {
      setIsVerified(true);
      console.log('PAN verified:', pan);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Accordion
        title="Customer ID Proof"
        isVerified={isVerified}
        defaultOpen={false}
      >
        <div className="flex justify-between items-end flex-wrap gap-4">
          <div >
            <TextBox
              label="Permanent Account Number (PAN)"
              placeholder="Enter PAN"
              value={pan}
              onChange={setPan}
              className="w-full sm:w-[336px] h-[48px]"
              required
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
  );
};

export default CustomerIdProofPage;
