"use client";

import React, { useState, useRef, FC, useEffect } from "react";
import StatusPopup from "../../components/PopUp/index";
import { useStatusPopup } from "../../hooks/Popup";
// --- SVG Icon Components ---

const CameraIcon: FC<{ className?: string }> = ({ className }) => (
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
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const CheckIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const RetakeIcon: FC<{ className?: string }> = ({ className }) => (
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
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
  </svg>
);

const CancelIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
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
 * @component PhotoCapture
 * @description A component for capturing a photo using the device camera.
 * It displays a placeholder, then a live camera feed, and finally a preview with a retake option.
 */
const PhotoCapture: FC = () => {
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: string;
  } | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "verifying" | "verified"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const {
    popup,
    showLoading,
    showSuccess,
    showUploaded,
    showError,
    hidePopup,
  } = useStatusPopup();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsCameraOn(false);
    }
  };

  const startCamera = async () => {
    stopCamera();
    setError(null);
    setPreviewImage(null);
    setFinalImage(null);
    setFileInfo(null);

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });
      setStream(mediaStream);
      setIsCameraOn(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      if (err instanceof Error) {
        if (
          err.name === "NotAllowedError" ||
          err.name === "PermissionDeniedError"
        ) {
          setError(
            "Camera access was denied. Please allow camera access in your browser settings."
          );
        } else {
          setError(
            "Could not access the camera. Please ensure it is not in use by another application."
          );
        }
      } else {
        setError("An unknown error occurred while accessing the camera.");
      }
      setIsCameraOn(false);
    }
  };

  const handleCapturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        setPreviewImage(dataUrl);
      }
    }
  };

  const handleCancel = () => {
    stopCamera();
    setPreviewImage(null);
  };

  const handleRetake = () => {
    setPreviewImage(null);
  };

  const handleOk = async () => {
    if (previewImage) {
      showUploaded("Photo has been successfully uploaded");

      setTimeout(() => {
        showLoading(
          "Matching Customer Photo",
          "Please wait while we compare the photo with your aadhar records."
        );
        setVerificationStatus("verifying");
      }, 1500); // Delay to allow "uploaded" popup to be visible

      setTimeout(() => {
        setFinalImage(previewImage);

        // Estimate file size from base64 string
        const sizeInBytes = Math.ceil((previewImage.length * 3) / 4);
        const sizeInKb = (sizeInBytes / 1024).toFixed(1);
        setFileInfo({ name: "customer-photo.jpeg", size: `${sizeInKb} KB` });

        showSuccess(
          "Photo Match Succesful",
          "Customer's photo matched Aadhaar with 60% accuracy, You can proceed."
        );
        setVerificationStatus("verified");
        stopCamera();
        setPreviewImage(null);
      }, 3000); // total delay (uploaded + loading)
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent onClick from firing
    setFinalImage(null);
    setFileInfo(null);
  };

  useEffect(() => {
    if (isCameraOn && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [isCameraOn, stream]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <>
      <div
        className={`relative w-full max-w-6xl mx-auto bg-white border-2 rounded-xl p-6 transition-all duration-300 ease-in-out ${
          finalImage
            ? "border-solid border-gray-200"
            : "border-dashed border-gray-300 hover:border-teal-500 flex flex-col justify-center items-center min-h-[125px] cursor-pointer"
        }`}
        onClick={!finalImage ? startCamera : undefined}
      >
        {finalImage && fileInfo ? (
          <div className="text-left w-full">
            <h3 className="text-gray-700 font-semibold text-base mb-4">
              Customer's Photo
            </h3>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <img
                  src={finalImage}
                  alt="Customer"
                  className="w-14 h-14 rounded-lg object-cover bg-gray-100 shadow-sm"
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
            {verificationStatus === "verifying" && (
              <p className="text-sm text-yellow-600 animate-pulse mt-2">
                Verifying Photo...
              </p>
            )}
            {verificationStatus === "verified" && (
              <p className="text-sm text-green-600 font-semibold mt-2">
                Photo Verified ✅
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <CameraIcon className="h-10 w-10 text-teal-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">
              Capture Photo
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-xs">
              Take a clear picture of the customer's face for verification with
              Aadhaar.
            </p>
            {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
          </div>
        )}
      </div>

      {isCameraOn && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className={`w-full h-full object-cover ${
              previewImage ? "hidden" : "block"
            }`}
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          )}
          <div className="absolute bottom-0 left-0 w-full p-8 flex justify-center items-center bg-black bg-opacity-40">
            {previewImage ? (
              <div className="flex items-center space-x-12">
                <button
                  onClick={handleCancel}
                  className="p-4 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors shadow-lg"
                >
                  <CancelIcon className="w-8 h-8" />
                </button>
                <button
                  onClick={handleRetake}
                  className="p-4 bg-gray-200 rounded-full text-gray-800 hover:bg-gray-300 transition-colors shadow-lg"
                >
                  <RetakeIcon className="w-8 h-8" />
                </button>
                <button
                  onClick={handleOk}
                  className="p-4 bg-green-500 rounded-full text-white hover:bg-green-600 transition-colors shadow-lg"
                >
                  <CheckIcon className="w-8 h-8" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleCapturePhoto}
                className="w-20 h-20 bg-white rounded-full border-4 border-teal-500 hover:bg-gray-200 transition-colors shadow-lg"
                aria-label="Capture Photo"
              ></button>
            )}
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
      <StatusPopup
        isOpen={popup.isOpen}
        status={popup.status}
        title={popup.title}
        message={popup.message}
        showCloseButton={popup.status !== "loading"}
        autoClose={popup.status === "success"}
        autoCloseDelay={2000}
        onClose={hidePopup} // <-- Add this
      />
    </>
  );
};
export default PhotoCapture;
