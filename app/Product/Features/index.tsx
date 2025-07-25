import React from "react";
import FeatureCard from "../../components/FeatureCard";
import { HiEye, HiSearch, HiClock, HiDocumentText } from "react-icons/hi";

const Features: React.FC = () => {
  return (
    <div className="w-[760px] h-[114px] flex justify-between items-center">
      <FeatureCard
        icon={<HiEye className="text-white w-5 h-5" />}
        title="View All"
        description="Browse all available services in one place"
      />
      <FeatureCard
        icon={<HiSearch className="text-white w-5 h-5" />}
        title="Track Application"
        description="Check the current status of your submitted applications"
      />
      <FeatureCard
        icon={<HiClock className="text-white w-5 h-5" />}
        title="View Applications"
        description="Monitor progress  of ongoing submissions"
      />
      <FeatureCard
        icon={<HiDocumentText className="text-white w-5 h-5" />}
        title="Document Manage"
        description="Upload, view, and organize your important documents"
      />
    </div>
  );
};

export default Features;
