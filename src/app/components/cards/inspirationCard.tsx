"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 6;

const inspiration = [
  {
    id: 1,
    date: "Feb 11 2025",
    time: "3",
    title: "The lovely Son",
    desc: "Lorem ipsum dolor sit amet...",
    views: "30",
    url: "/bg/images/bg.jpg",
  },
  {
    id: 2,
    date: "Feb 11 2025",
    time: "3",
    title: "The lovely Son",
    desc: "Lorem ipsum dolor sit amet...",
    views: "30",
    url: "/bg/images/bg.jpg",
  },
  {
    id: 3,
    date: "Feb 11 2025",
    time: "3",
    title: "The lovely Son",
    desc: "Lorem ipsum dolor sit amet...",
    views: "30",
    url: "/bg/images/bg.jpg",
  },
  {
    id: 4,
    date: "Feb 11 2025",
    time: "3",
    title: "The lovely Son",
    desc: "Lorem ipsum dolor sit amet...",
    views: "30",
    url: "/bg/images/bg.jpg",
  },
  {
    id: 5,
    date: "Feb 11 2025",
    time: "3",
    title: "The lovely Son",
    desc: "Lorem ipsum dolor sit amet...",
    views: "30",
    url: "/bg/images/bg.jpg",
  },
  {
    id: 6,
    date: "Feb 11 2025",
    time: "3",
    title: "The lovely Son",
    desc: "Lorem ipsum dolor sit amet...",
    views: "30",
    url: "/bg/images/bg.jpg",
  },
  {
    id: 7,
    date: "Feb 11 2025",
    time: "3",
    title: "The lovely Son",
    desc: "Lorem ipsum dolor sit amet...",
    views: "30",
    url: "/bg/images/bg.jpg",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Inspirations = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(inspiration.length / ITEMS_PER_PAGE);

  const paginatedItems = inspiration.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <motion.section 
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="mt-[10rem] w-full"
    >
      <motion.div 
        variants={fadeInUp}
        className="border-l-4 border-blue-600 px-5 py-3 mb-[5rem]"
      >
        <h1 className="text-3xl md:text-5xl font-bold pb-3 text-blue-700">
          Inspirations <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Collection</span>
        </h1>
        <p className="font-light text-xl text-gray-700">
          Get Inspired by our collection of inspiring messages
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {paginatedItems.map((card) => (
          <motion.div
            key={card.id}
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Link href="/" className="block">
              <div className="h-auto w-full flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden bg-white hover:shadow-xl transition-all duration-300">
                <div className="relative h-[250px] md:h-auto md:w-[40%] overflow-hidden">
                  <Image
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    src={card.url}
                    height={400}
                    width={400}
                    alt="Inspirational"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 md:w-[60%] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-blue-600 mb-3">
                      <i className="far fa-calendar-alt"></i>
                      <span className="font-medium">{card.date}</span>
                    </div>
                    <h2 className="text-sm font-medium text-gray-600 mb-2">
                      <i className="far fa-clock mr-2"></i>
                      {card.time} min read
                    </h2>
                    <h3 className="font-bold text-2xl text-blue-700 mb-3 group-hover:text-blue-600 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2 mb-4">{card.desc}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500">
                      <i className="far fa-eye mr-2"></i>
                      <span>{card.views} views</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Read More
                    </motion.button>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div 
        variants={fadeInUp}
        className="w-full flex justify-center mt-12"
      >
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <motion.button
              key={index + 1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                index + 1 === currentPage
                  ? "bg-blue-600 text-white font-bold shadow-lg"
                  : "bg-white text-gray-800 hover:bg-blue-100"
              }`}
            >
              {index + 1}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Inspirations;
