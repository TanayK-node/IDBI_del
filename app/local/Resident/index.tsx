import React, { useState } from 'react';
import Card from '../../components/Card/index';

const IndianResidentCard = () => {
  const [selectedOption, setSelectedOption] = useState('Yes');

  return (
    <div className="p-4">
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Are you an Indian Resident?
        </h3>
        
        <div className="flex gap-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="indianResident"
              value="Yes"
              checked={selectedOption === 'Yes'}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="sr-only"
            />
            <div className="relative">
              <div className={`w-5 h-5 rounded-full border-2 ${
                selectedOption === 'Yes' 
                  ? 'border-teal-500 bg-teal-500' 
                  : 'border-gray-300 bg-white'
              }`}>
                {selectedOption === 'Yes' && (
                  <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                )}
              </div>
            </div>
            <span className="ml-3 text-gray-700 font-medium">Yes</span>
          </label>
          
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="indianResident"
              value="No"
              checked={selectedOption === 'No'}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="sr-only"
            />
            <div className="relative">
              <div className={`w-5 h-5 rounded-full border-2 ${
                selectedOption === 'No' 
                  ? 'border-teal-500 bg-teal-500' 
                  : 'border-gray-300 bg-white'
              }`}>
                {selectedOption === 'No' && (
                  <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                )}
              </div>
            </div>
            <span className="ml-3 text-gray-700 font-medium">No</span>
          </label>
        </div>
      </Card>
    </div>
  );
};

export default IndianResidentCard;