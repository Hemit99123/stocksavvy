import React from 'react'

interface MissionItemProps {
    isLifted: boolean;
    title: string;
    text: string;
    color: "light-green" | "green";
}

const MissionItem: React.FC<MissionItemProps> = ({ color, title, text, isLifted }) => {
  return (
    <div 
      className={`${color === "green" ? "bg-green-500 text-white" : "bg-green-300"} 
                  rounded-lg p-6 
                  ${isLifted ? 'lg:transform lg:translate-y-[-15px]' : 'lg:transform lg:translate-y-[15px]'}`}
    >
      <h2 className="text-4xl font-bold mb-2">{title}</h2>
      <p>{text}</p>
    </div>
  );
}

export default MissionItem;
