import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string; // Optional link prop
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, href }) => (
  <a
  href={href || '#'}
  className="w-[165px] h-[114px] bg-black/40 backdrop-blur-md rounded-lg p-2.5 text-white text-center hover:bg-black/60 transition-all duration-200"
>
  <div className="flex justify-center mb-2">
    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
      {icon}
    </div>
  </div>
  <h3 className="font-semibold text-xs mb-1">{title}</h3>
  <p className="text-[10px] text-gray-200 leading-tight">{description}</p>
</a>
);

export default FeatureCard;