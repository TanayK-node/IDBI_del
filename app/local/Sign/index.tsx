"use client";

import React, { useState, useRef, FC } from "react";

// --- SVG Icon Components ---

const UploadIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const TrashIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

/**
 * @component SignatureCapture
 * @description A component for uploading a signature image.
 */
const SignatureCapture: FC = () => {
  const [signatureImage, setSignatureImage] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSignatureImage(e.target?.result as string);
        const sizeInKb = (file.size / 1024).toFixed(1);
        setFileInfo({ name: file.name, size: `${sizeInKb} KB` });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSignatureImage(null);
    setFileInfo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleContainerClick = () => {
    if (!signatureImage) {
      fileInputRef.current?.click();
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <div
        className={`relative w-full max-w-6xl mx-auto bg-white border-2 rounded-xl p-6 transition-all duration-300 ease-in-out ${
          signatureImage
            ? "border-solid border-gray-200"
            : "border-dashed border-gray-300 hover:border-teal-500 flex flex-col justify-center items-center min-h-[125px] cursor-pointer"
        }`}
        onClick={handleContainerClick}
      >
        {signatureImage && fileInfo ? (
          <div className="text-left w-full">
            <h3 className="text-gray-700 font-semibold text-base mb-4">
              Customer's Signature
            </h3>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <img
                  src={signatureImage}
                  alt="Signature"
                  className="w-14 h-14 rounded-lg object-contain bg-gray-100 shadow-sm p-1"
                />
                <div className="ml-4">
                  <p className="font-semibold text-sm text-gray-800">
                    {fileInfo.name}
                  </p>
                  <p className="text-xs text-gray-500">{fileInfo.size}</p>
                </div>
              </div>
              <button
                onClick={handleDelete}
                className="p-2 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                <TrashIcon className="w-6 h-6 text-red-500 hover:text-red-600" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <UploadIcon className="h-10 w-10 text-teal-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">
              Capture Signature
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-xs">
              Take a clear picture of the customer's signature for verification
              with PAN.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SignatureCapture;
