import React from "react";
import Spacer from "./Spacer";

interface MultipleSpacerProps {
  spacerCount: number;
}

const MultipleSpacer: React.FC<MultipleSpacerProps> = ({ spacerCount }) => {
  return (
    <>
      {/* Dynamically render spacers */}
      {[...Array(spacerCount)].map((_, index) => (
        <Spacer key={index} />
      ))}
    </>
  );
};

export default MultipleSpacer;
