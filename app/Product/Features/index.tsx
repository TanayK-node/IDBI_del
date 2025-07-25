import React from "react";
import FeatureCard from "../../components/FeatureCard";
import {
  HiOutlineEye,
  HiOutlineStar,
  HiOutlineClock,
  HiOutlineDocumentText,
} from "react-icons/hi2";

const Features: React.FC = () => {
  return (
    <div className="w-[760px] h-[114px] flex justify-between items-center">
      <FeatureCard
        icon={<HiOutlineEye className="text-black w-5 h-5" />}
        title="View All"
        description="Browse all available services in one place"
      />
      <FeatureCard
        icon={<HiOutlineStar className="text-black w-5 h-5" />}
        title="Track Application"
        description="Check the current status of your submitted applications"
      />
      <FeatureCard
        icon={<HiOutlineClock className="text-black w-5 h-5" />}
        title="View Reports"
        description="Monitor progress of ongoing submissions"
      />
      <FeatureCard
        icon={<HiOutlineDocumentText className="text-black w-5 h-5" />}
        title="Manage Document"
        description="Upload, view, and organize your important documents"
      />
    </div>
  );
};

export default Features;
