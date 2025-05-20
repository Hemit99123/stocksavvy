import React from "react";

interface WorkshopItemProps {
  img: string;
  title: string;
  fontColor: "black" | "white";
}

const WorkshopItem: React.FC<WorkshopItemProps> = ({
  img,
  title,
  fontColor,
}) => {
  return (
    <div
      className={`flex items-center justify-center rounded-3xl text-${fontColor} cursor-pointer relative`}
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: 300,
        height: 400,
      }}
    >
      <h1 className="font-black text-4xl absolute bottom-4 left-4">
        {title}
      </h1>
    </div>
  );
};

export default WorkshopItem;
