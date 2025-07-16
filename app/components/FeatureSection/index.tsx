import React from "react";
import FeatureCard from "../FeatureCard/index";
import {
  HiTrendingUp,
  HiShieldCheck,
  HiStar,
  HiCurrencyRupee,
} from "react-icons/hi";

const FeatureSection: React.FC = () => {
  return (
    <div className="w-[760px] h-[114px] flex justify-between items-center">
      <FeatureCard
        icon={<HiTrendingUp className="text-white w-5 h-5" />}
        title="High-Interest Rates"
        description="Earn up to 6.75% interest p.a."
      />
      <FeatureCard
        icon={<HiShieldCheck className="text-white w-5 h-5" />}
        title="Safer, Smarter Payments"
        description="Dynamic PIN, Super OTP, single use virtual cards"
      />
      <FeatureCard
        icon={<HiStar className="text-white w-5 h-5" />}
        title="Tier Upgrade Benefits"
        description="Become a megastar and enjoy benefits"
      />
      <FeatureCard
        icon={<HiCurrencyRupee className="text-white w-5 h-5" />}
        title="Use Your FD"
        description="Get liquidity instantly when you need it"
      />
    </div>
  );
};

export default FeatureSection;
