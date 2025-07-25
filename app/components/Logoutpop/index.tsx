// components/LogoutPopup.tsx
'use client';
import React from 'react';

interface LogoutPopupProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutPopup({ isOpen, onConfirm, onCancel }: LogoutPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 bg-black-100 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6">
        <h2 className="text-lg font-semibold mb-4">Log Out?</h2>
        <p className="mb-6">Are you sure you want to log out of your account?</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-orange-600 text-white hover:bg-oramge-700"
            onClick={onConfirm}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
