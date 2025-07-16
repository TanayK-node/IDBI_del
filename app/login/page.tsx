"use client";

import React, { useState } from "react";
import TextBox from "../components/TextBox/index";
import Button from "../components/Button/index";
import DownloadApp from "../components/AppDownload/index";
import Logo from '../../public/assets/images/Logo/Logo.png'

const LoginPage: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleProceed = () => {
    // Handle login logic here
    console.log("Login attempt:", { userId, password });
  };
  const handleforgotpwd = () => {
    // Handle login logic here
    console.log("Forgot Password:");
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
              <img src="/assets/images/Logo/Logo.png" alt="Logo" className="h-16  " />
              
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
              Please enter your login
              <br />
              Credentials
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
                  value={userId}
                  onChange={setUserId}
                />

                <TextBox
                  label="Password"
                  placeholder="Please enter your password"
                  type="password"
                  value={password}
                  onChange={setPassword}
                />

                <div className="flex flex-col">
                  <Button onClick={handleProceed}>Proceed</Button>

                  <p
                    onClick={handleforgotpwd}
                    className="mt-2 text-sm text-gray-500 underline hover:text-orange-600 active:text-orange-600 cursor-pointer pl-6"
                  >
                    Forgot Password
                  </p>
                </div>
                <DownloadApp />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
