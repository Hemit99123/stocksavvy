"use client";

import React, { useState, useRef, type MouseEvent } from "react";
import AboutItem from "./common/AboutItem";
import MultipleSpacer from "../../../components/common/Spacers/MultipleSpacer";
import WorkshopItem from "./common/WorkshopItem";
import { workshopItems } from "../../../data/workshop";
import { aboutItems } from "../../../data/about";
import { IoIosInformationCircle } from "react-icons/io";
import Header from "./common/Header";

const About: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef<HTMLUListElement | null>(null);

  // Function to handle mouse down (start of drag)
  const handleMouseDown = (e: MouseEvent<HTMLUListElement>): void => {
    if (scrollContainerRef.current) {
      setIsDragging(true);
      setStartX(e.clientX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  // Function to handle mouse move (during drag)
  const handleMouseMove = (e: MouseEvent<HTMLUListElement>): void => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.clientX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Function to handle mouse up (end of drag)
  const handleMouseUp = (): void => {
    setIsDragging(false);
  };

  return (
    <div className="px-4">
      <Header 
        smalltext="Built by students, for students"
        title="What is Stock Savvy about?"
      />
      {/* Main content container */}
      <div className="max-w-5xl mx-auto mb-8">
        <p className="text-gray-600 text-lg mt-4 text-center">
          Stock Savvy is a financial literacy initiative that helps young and
          aspiring high school students learn about economic concepts such as
          saving and spending, teaches investment strategies, and provides steps
          to becoming a successful investor.
        </p>
      </div>

      {/* About section mapped from array */}
      <ul className="lg:flex items-center justify-center lg:space-x-28 space-y-10 lg:space-y-0">
        {aboutItems.map((item, index) => (
          <li key={index}>
            <AboutItem icon={item.icon} title={item.title} desc={item.desc} />
          </li>
        ))}
      </ul>

      <MultipleSpacer spacerCount={4} />

      {/* Workshops section mapped from array */}
      <div className="text-start">
        <div className="flex items-center space-x-2.5 font-semibold text-3xl text-green-900">
          <IoIosInformationCircle />
          <p>Workshops Information</p>
        </div>
        <p className="lg:text-lg text-gray-600">
          These are the various topics/partners we have completed a workshop
          with!
        </p>

        {/* Scrollable container for workshops */}
        <ul
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-5 py-4 no-scrollbar"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} // To stop dragging if mouse leaves the area
        >
          {workshopItems.map((workshop, index) => (
            <a href={`/workshop/${workshop.slug}`} key={index}>
              <WorkshopItem
                img={workshop.img}
                title={workshop.title}
                fontColor={workshop.fontColor}
              />
            </a>
          ))}
        </ul>

        <MultipleSpacer spacerCount={3} />
      </div>
    </div>
  );
};

export default About;
