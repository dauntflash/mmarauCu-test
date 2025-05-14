import Image from "next/image";
import Link from "next/link";
import React from "react";

const photoCard = [
  {
    title: "THE GREAT CALL by HOGLA WANJOHI",
    date: "February 23rd 2025",
    image: "/bg/images/f1.jpg",
    link: "/",
  },
  {
    title: "THE GREAT CALL by HOGLA WANJOHI",
    date: "February 23rd 2025",
    image: "/bg/images/f1.jpg",
    link: "/",
  },
  {
    title: "THE GREAT CALL by HOGLA WANJOHI",
    date: "February 23rd 2025",
    image: "/bg/images/f1.jpg",
    link: "/",
  },
  {
    title: "THE GREAT CALL by HOGLA WANJOHI",
    date: "February 23rd 2025",
    image: "/bg/images/f1.jpg",
    link: "/",
  },
];

function GooglePhotosCard() {
  return (
    <div className="w-full m-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-7">
      {photoCard.map((card, index) => (
        <div
          key={index}
          className="shadow-2xl rounded-lg w-[65%] h-[400] mx-auto overflow-hidden flex flex-col-reverse">
          <div className="text-center my-4 p-3">
            <h1 className="text-xl mb-2">{card.title}</h1>
            <h1 className="text-md font-[30] mb-2">{card.date}</h1>
            <Link href={card.link}>
              <button className="py-3 px-7 bg-blue-600 text-white rounded-md hover:bg-blue-800 hover:transition-all">
                Open
              </button>
            </Link>
          </div>
          <Image
            className="flex-1"
            src={card.image}
            alt="Google Photos Card"
            width={500}
            height={600}
          />
        </div>
      ))}
    </div>
  );
}

export default GooglePhotosCard;
