import React from "react";
import FeatureCard from "../FeatureCard/index";


const FeatureSection: React.FC = () => {
  return (
    <div className="w-[760px] h-[114px] flex justify-between items-center">
      <FeatureCard
        icon={
          <img
            src="/assets/images/Hero/Icon1.png" // Replace with your actual image path
            alt="High Interest"
            className="w-5 h-5 bg-white"
          />
        }
        title="High-Interest Rates"
        description="Earn up to 6.75% interest p.a."
      />
      <FeatureCard
        icon={
          <img
            src="/assets/images/Hero/Icon2.png" // Replace with your actual image path
            alt="High Interest"
            className="w-5 h-5"
          />
        }
        title="Safer, Smarter Payments"
        description="Dynamic PIN, Super OTP, single use virtual cards"
      />
      <FeatureCard
        icon={
          <img
            src="/assets/images/Hero/Icon3.png" // Replace with your actual image path
            alt="High Interest"
            className="w-5 h-5"
          />
        }
        title="Tier Upgrade Benefits"
        description="Become a megastar and enjoy benefits"
      />
      <FeatureCard
        icon={
          <img
            src="/assets/images/Hero/Icon4.png" // Replace with your actual image path
            alt="High Interest"
            className="w-5 h-5"
          />
        }
        title="Use Your FD"
        description="Get liquidity instantly when you need it"
      />
    </div>
  );
};

export default FeatureSection;
