import React from "react";

const DownloadApp = () => {
  return (
    <div className="mt-20 text-left">
      <p className="text-[#2A2A28] text-sm mb-4 pl-4">Download IDBI Mobile app</p>

      {/* Container with border and padding */}
      <div className="  rounded-sm p-3 bg-white inline-block">
        <div className="flex items-center space-x-3">
          {/* App Store Badge */}
          <a href="#" className="inline-block">
            <div className="bg-black rounded-md px-3 py-2 flex items-center space-x-2">
              <img
                src="/assets/apple-brands.svg"
                alt="Apple Logo"
                className="w-6 h-6"
              />

              <div className="text-white">
                <div className="text-xs leading-none">Download on </div>
                <div className="text-sm font-semibold leading-none">
                  App Store
                </div>
              </div>
            </div>
          </a>

          {/* Google Play Badge */}
          <a href="#" className="inline-block">
            <div className="bg-black rounded-md px-3 py-2 flex items-center space-x-2">
              <img
                src="/assets/google-play-brands.svg"
                alt="google Logo"
                className="w-6 h-6"
              />

              <div className="text-white">
                <div className="text-xs leading-none">Download on </div>
                <div className="text-sm font-semibold leading-none">
                  Google Play
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
