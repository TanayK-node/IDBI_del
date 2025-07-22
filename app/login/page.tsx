"use client";

import React, { useState } from "react";
import TextBox from "../components/TextBox/index";
import Button from "../components/Button/index";
import DownloadApp from "../components/AppDownload/index";
import Logo from "../../public/assets/images/Logo/Logo.png";
import { useRouter } from "next/navigation";
import users from "../../dummy.json"; // Assuming this is the path to your dummy data
import Toast from "../components/Toast/index"; // Importing Toast component

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
    const [showToast, setShowToast] = useState(false);

   const handleProceed = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      console.log("Login successful:", { username });
      
      // Show success toast
      setToastMessage("Login successful! Redirecting...");
      setToastType("success");
      setShowToast(true);
      
      // Delay redirect to show success message
      setTimeout(() => {
        router.push("/");
      }, 1500); // 1.5 second delay
      
    } else {
      // Show error toast
      setToastMessage("Invalid login credentials");
      setToastType("error");
      setShowToast(true);
    }
  };
  const handleforgotpwd = () => {
    // Handle login logic here
    console.log("Forgot Password:");
  };
   const handleCloseToast = () => {
    setShowToast(false);
    setToastMessage(''); // Clear message when toast is closed
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Green background with logo and welcome text */}
      <div className="w-1/2 bg-[#02836C] flex items-center justify-center relative overflow-hidden">
        {/* Background geometric pattern */}

        <div className="relative z-10 text-center">
          {/* IDBI Bank Logo */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2">
              <img
                src="/assets/images/Logo/Logo.png"
                alt="Logo"
                className="h-16  "
              />
            </div>
          </div>

          {/* Welcome text */}
          <h1 className="text-white text-[32px] font-light leading-snug tracking-normal text-left mb-4 pl-8">
            Welcome to the
            <br />
            <span className="font-medium">IDBI Bank</span>
          </h1>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="w-full max-w-md px-8">
          <div className="bg-white rounded-lg  p-8">
            <h2 className="text-2xl font-sans text-[#2A2A28] mb-8">
              Login Credentials
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleProceed();
              }}
            >
              <div>
                <TextBox
                  label="User ID"
                  placeholder="Please enter your ID"
                  value={username}
                  onChange={setUsername}
                />

                <TextBox
                  label="Password"
                  placeholder="Please enter your password"
                  type="password"
                  value={password}
                  onChange={setPassword}
                />

                <div className="flex flex-col">
                  <Button
                    onClick={handleProceed}
                    disabled={!username || !password}
                    className={`w-full py-2 px-4 rounded ${
                      username && password
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Proceed
                  </Button>

                  <p
                    onClick={handleforgotpwd}
                    className="mt-2 text-sm text-gray-500 underline hover:text-orange-600 active:text-orange-600 cursor-pointer pl-6"
                  >
                    Forgot Password
                  </p>
                </div>
                <DownloadApp />
                 {/* Toast Component */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          duration={toastType === 'success' ? 2000 : 5000} // Shorter duration for success
          onClose={handleCloseToast}
          isVisible={showToast}
        />)}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
