'use client';

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const event = [
  {
    eventTitle: "Sunday Service",
    eventDate: "Every Sunday, 9:30 AM",
    eventDescription: "Join us for our weekly Sunday service featuring worship, prayer, and an inspiring message from our pastor. All are welcome to attend and experience the love of Christ.",
    eventVenue: "Main Chapel, Maasai Mara University",
    eventImage: "/bg/images/event.jpg",
  },
  {
    eventTitle: "Bible Study",
    eventDate: "Every Wednesday, 5:00 PM",
    eventDescription: "Deep dive into God's Word with our weekly Bible study sessions. Learn, discuss, and grow in your faith with fellow believers.",
    eventVenue: "Room 101, Academic Block",
    eventImage: "/bg/images/event.jpg",
  },
  {
    eventTitle: "Youth Fellowship",
    eventDate: "Every Friday, 4:00 PM",
    eventDescription: "A vibrant gathering for young people to connect, worship, and grow together in Christ. Activities include games, worship, and meaningful discussions.",
    eventVenue: "Youth Center, Campus Grounds",
    eventImage: "/bg/images/event.jpg",
  },
  {
    eventTitle: "Prayer Meeting",
    eventDate: "Every Tuesday, 6:00 PM",
    eventDescription: "Join our prayer warriors in lifting up the needs of our community, nation, and world. Experience the power of corporate prayer.",
    eventVenue: "Prayer Room, Main Chapel",
    eventImage: "/bg/images/event.jpg",
  },
];

const EventCard = ({ event, index }: { event: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="md:flex overflow-hidden mt-8 rounded-xl mx-auto bg-white shadow-lg hover:shadow-2xl transition-all duration-300 w-[90%] md:w-[70%] lg:w-[60%] transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full md:w-[40%] h-[200px] md:h-auto overflow-hidden">
        <Image
          src={event.eventImage}
          alt={event.eventTitle}
          width={400}
          height={300}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white p-8 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">{event.eventTitle}</h1>
            <span className="text-blue-200 text-sm font-medium px-3 py-1 rounded-full bg-blue-800/50">
              {event.eventDate}
            </span>
          </div>
          <p className="font-light text-blue-100 leading-relaxed mb-6">
            {event.eventDescription}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-blue-200">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h2 className="font-semibold text-lg">{event.eventVenue}</h2>
        </div>
      </div>
    </motion.div>
  );
};

export default function EventsCard() {
  return (
    <section className="py-8 px-4">
      <div className="grid gap-8">
        {event.slice(0, 3).map((event, index) => (
          <EventCard key={index} event={event} index={index} />
        ))}
      </div>
      <div className="text-center mt-12">
        <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          View All Events
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
