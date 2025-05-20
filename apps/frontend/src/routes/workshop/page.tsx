"use client";

import { useParams } from "react-router";
import { workshopItems } from "../../data/workshop";

const WorkShopInfo = () => {
  const slug = useParams().slug

  // Filter workshopItems based on the slug
  const filteredItems = slug
    ? workshopItems.filter((item) => item.slug === slug)
    : workshopItems;

  const item = filteredItems[0];

  return (
    <>
      {slug ? (
        <div className="flex flex-col lg:flex-row h-auto lg:h-screen">
          <div className="w-full lg:w-1/2 h-full relative">
            <img
              src={item.img}
              className="rounded-r-3xl w-full h-full object-cover hidden lg:block"
              alt="Main image"
            />
            <div className="absolute bottom-4 left-4 bg-lime-200 px-11 py-2 rounded-xl font-medium">
              {item.date}
            </div>
          </div>
          <div className="lg:mt-0 lg:ml-8 w-full lg:w-1/2">
            <h1 className="mt-7 text-4xl lg:text-6xl font-custom">
              {item.title}
            </h1>
            <div className="mt-5 max-w-full lg:max-w-xl">
              <p className="text-lg break-words">
                {item.description}
              </p>
            </div>
            <div className="mt-9">
              <h1 className="text-4xl font-bold">Presenters/Guests</h1>
              <div className="mt-5">
                {item.people.map((person, index) => (
                  <div key={index} className="flex items-center mb-4">
                    <img
                      src={person.img}
                      alt={person.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h2 className="font-bold">{person.name}</h2>
                      <p className="text-sm text-gray-500">{person.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No slug provided.</div>
      )}
    </>
  );
}

export default WorkShopInfo