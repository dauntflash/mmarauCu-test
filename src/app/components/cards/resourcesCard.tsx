import Image from "next/image";
import React from "react";
const resource = [
  {
    id: 1,
    image: "/bg/images/f1.jpg",
    title: "Cu constitution",
    details:
      "the official document outlining the mission, vision and objectives of the christian union",
  },
  {
    id: 2,
    image: "/bg/images/f1.jpg",
    title: "Cu constitution",
    details:
      "the official document outlining the mission, vision and objectives of the christian union",
  },
  {
    id: 3,
    image: "/bg/images/f1.jpg",
    title: "Cu constitution",
    details:
      "the official document outlining the mission, vision and objectives of the christian union",
  },
  {
    id: 4,
    image: "/bg/images/f1.jpg",
    title: "Cu constitution",
    details:
      "the official document outlining the mission, vision and objectives of the christian union",
  },
];

const ResourcesCard = () => {
  return (
    <div className="w-[90%] sm:w-[80%] mx-auto h-full bg-blue-100">
      <div className="grid grid-col-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-4">
        {resource.map((detail, index) => (
          <div
            key={index}
            className="w-[90%]  rounded-lg flex flex-col  space-y-2 bg-blue-100 mx-auto shadow-lg border p-4">
            <Image
              src={detail.image}
              alt="background"
              width={400}
              height={400}
              className="object-cover items-center"
            />
            <h1 className="text-xl text-black font-semibold md:text-2xl text-left">
              {detail.title}
            </h1>
            <h2 className="text-sm text-black font-medium text-left">{detail.details}</h2>
            <button className="w-full   bg-[#393ee3] text-white pb-1">Download</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesCard;
