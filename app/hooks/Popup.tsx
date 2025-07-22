"use client";
import { useState } from 'react';
import { PopupStatus } from '../components/PopUp/index';

interface PopupState {
  isOpen: boolean;
  status: PopupStatus;
  title: string;
  message: string;
}

export const useStatusPopup = () => {
  const [popup, setPopup] = useState<PopupState>({
    isOpen: false,
    status: 'loading',
    title: '',
    message: '',
  });

  const showPopup = (status: PopupStatus, title: string, message: string) => {
    setPopup({
      isOpen: true,
      status,
      title,
      message,
    });
  };

  const hidePopup = () => {
    setPopup(prev => ({
      ...prev,
      isOpen: false,
    }));
  };

  // Convenience methods
  const showLoading = (title: string = 'Loading...', message: string = 'Please wait while we process your request.') => {
    showPopup('loading', title, message);
  };

  const showSuccess = (title: string = 'Success!', message: string = 'Operation completed successfully.') => {
    showPopup('success', title, message);
  };

  const showError = (title: string = 'Error', message: string = 'Something went wrong. Please try again.') => {
    showPopup('error', title, message);
  };

  return {
    popup,
    showPopup,
    hidePopup,
    showLoading,
    showSuccess,
    showError,
  };
};