import React from "react";

interface AboutItemProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}
const AboutItem: React.FC<AboutItemProps> = ({ icon, title, desc }) => {
  return (
    <div className="text-start">
      <div className="text-xl lg:text-3xl text-green-900">{icon}</div>
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="max-w-4xl text-sm text-gray-600">
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default AboutItem;
