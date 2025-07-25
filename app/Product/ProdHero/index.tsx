import React from "react";
import Features from "../Features/index";

export default function ProdHero() {
  return (
    <div className="sm:px-6 lg:px-8 pb-8 ">
      <div className="relative bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 overflow-hidden rounded-3xl max-w-full mx-auto lg:max-w-[1200px] lg:h-[248px] h-auto">
        <div className="w-full h-full px-4 sm:px-6 lg:px-0 py-8 lg:py-0">
          <div className="pl-6 grid grid-cols-1 lg:grid-cols-2 items-start gap-6 lg:gap-0 h-full">
            <div>
              <h1 className="text-white text-2xl mb-4 lg:mb-6 pt-4">
                IDBI Assisted Customer Onboarding Portal
              </h1>
              <Features />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
