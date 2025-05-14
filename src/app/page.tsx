"use client";
import EventsCard from "./components/cards/eventsCard";
import Link from "next/link";
import { Suspense, useState, useEffect } from "react";

const HeroVideo = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full h-screen">
      {/* Video Background */}
      <div className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src="/bg/videos/homeHero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Loading Placeholder */}
      {!isVideoLoaded && (
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 to-blue-700 animate-pulse" />
      )}

      {/* Content Overlay */}
      <div className="relative flex flex-col items-center justify-center w-full h-full text-white bg-black bg-opacity-40 backdrop-blur-[2px] px-8">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="font-black text-3xl sm:text-4xl md:text-7xl py-7 animate-fade-in leading-tight">
            Maasai Mara University <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
              Christian Union
            </span>
          </h1>
          <p className="font-medium text-lg sm:text-2xl md:text-3xl animate-fade-in-delay text-blue-100">
            A Christ model of transformation in church and society
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-12 animate-fade-in-delay-2">
          <Link href="/aboutUs">
            <button 
              className="group relative font-bold bg-blue-700 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="relative z-10">About Us</span>
              <div className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 transform transition-transform duration-300 ${isHovered ? 'scale-100' : 'scale-0'}`} />
            </button>
          </Link>
          <Link href="/signIn">
            <button className="group relative font-bold bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 transform transition-transform duration-300 scale-0 group-hover:scale-100" />
            </button>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center text-blue-200">
            <span className="text-sm mb-2">Scroll Down</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceProgram = ({ title, schedule, bgColor }: { title: string; schedule: string[]; bgColor: string }) => (
  <div 
    className={`${bgColor} p-6 rounded-lg shadow-md md:flex-1 md:max-w-[45%] lg:max-w-[40%] lg:p-8 lg:shadow-lg transform transition-all duration-300 hover:scale-105 group`}
  >
    <h1 className="font-bold text-3xl lg:text-4xl text-[#393ee3] mb-6 group-hover:text-blue-700 transition-colors duration-300">
      {title}
    </h1>
    <div className="font-semibold text-lg lg:text-xl space-y-3">
      {schedule.map((item, index) => (
        <p key={index} className="flex items-center group/item">
          <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 group-hover/item:scale-150 transition-transform duration-300"></span>
          <span className="group-hover/item:text-blue-700 transition-colors duration-300">{item}</span>
        </p>
      ))}
    </div>
  </div>
);

export default function Home() {
  const sundaySchedule = [
    "9:30 AM - 10:30 AM - Praise & Worship",
    "10:30 AM - 10:50 PM - Choir Songs & Presentations",
    "10:50 AM - 11:00 AM - Offering & Announcements",
    "11:00 AM - 12:00 PM - Word",
    "12:00 PM - 12:30 PM - Remarks & Closure"
  ];

  const saturdaySchedule = [
    "7:00 PM - 7:50 PM - Praise and worship",
    "7:50 PM - 8:00 PM - Presentations",
    "8.00 PM - 8:50 PM - Word",
    "8:50 PM - 9:00 PM - Remarks & Closure"
  ];

  return (
    <>
      <section className="w-full bg-gradient-to-b from-blue-50 to-white">
        <Suspense fallback={
          <div className="w-full h-screen bg-gradient-to-br from-blue-900 to-blue-700 animate-pulse">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          </div>
        }>
          <HeroVideo />
        </Suspense>

        {/* Events Section */}
        <div className="py-20 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <EventsCard />
        </div>

        {/* Service Programs Section */}
        <div className="py-20 px-4 max-w-7xl mx-auto bg-gradient-to-b from-white to-blue-50">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Service Programs</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 justify-evenly">
            <ServiceProgram
              title="Sunday Service Program"
              schedule={sundaySchedule}
              bgColor="bg-gray-50 bg-opacity-70"
            />
            <ServiceProgram
              title="Saturday Service Program"
              schedule={saturdaySchedule}
              bgColor="bg-blue-50"
            />
          </div>
        </div>
      </section>
    </>
  );
}
