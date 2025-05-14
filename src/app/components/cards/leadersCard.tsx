"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const details = [
  {
    id: 1,
    image: "/leaders/Kanini.jpg",
    name: "Kanini Faith Ndunge",
    role: "Chairperson",
    course: "BA Community Development",
  },
  {
    id: 2,
    image: "/leaders/Mike.jpg",
    name: "Otieno Michael",
    role: "Vice Chairperson",
    course: "BED Education Science",
  },
  {
    id: 3,
    image: "/leaders/Jerry.jpg",
    name: "Jeremy Korir",
    role: "Secretary",
    course: "BSC Computer Science",
  },
  {
    id: 4,
    image: "/leaders/Abigael.jpg",
    name: "Abigael Pendo Katsango",
    role: "Vice Secretary",
    course: "BA Communication and Public Relations",
  },
  {
    id: 5,
    image: "/leaders/Mateche.jpg",
    name: "Mateche Fentinant",
    role: "Treasurer",
    course: "BED Education Science",
  },
  {
    id: 6,
    image: "/leaders/David.jpg",
    name: "David Mburu",
    role: "Technical Chairperson",
    course: "BED Education Science with G&C",
  },
  {
    id: 7,
    image: "/leaders/Moses.jpg",
    name: "Moses Onyango",
    role: "Intercessorry Chairperson",
    course: "BED Education Science with SNE",
  },
  {
    id: 8,
    image: "/leaders/Wandia.jpg",
    name: "Joy Wandia Mwangi",
    role: "Music Ministry",
    course: "BB in economics and statistics",
  },
  {
    id: 9,
    image: "/leaders/Lucy.jpg",
    name: "Lucy Gichugu",
    role: "Ushering Ministry",
    course: "BED Education",
  },
  {
    id: 10,
    image: "/leaders/Shikanda.jpg",
    name: "Immanuel Shikanda",
    role: "Media Ministry",
    course: "BSC computer Science",
  },
  {
    id: 11,
    image: "/leaders/Kanana.jpg",
    name: "Kanana Murungi",
    role: "Children Ministry",
    course: "BED Education Science",
  },
  {
    id: 12,
    image: "/leaders/Eliud.jpg",
    name: "Eliud Wangila",
    role: "Evangelism Ministry",
    course: "BSC",
  },
  {
    id: 13,
    image: "/leaders/Joseph.jpg",
    name: "Joseph Michael",
    role: "Discipleship Ministry",
    course: "BED Education",
  },
];

const LeadersCard = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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

  return (
    <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div 
            variants={fadeInUp}
            className="border-l-4 border-blue-600 pl-6 py-3 mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-blue-700 mb-2">Meet Our Leaders</h2>
            <p className="text-xl text-gray-600">Dedicated individuals serving our community</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {details.map((detail) => (
              <motion.div
                key={detail.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setHoveredId(detail.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={detail.image}
                    alt={detail.name}
                    fill
                    className={`object-cover transition-transform duration-500 ${
                      hoveredId === detail.id ? "scale-110" : "scale-100"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {detail.name}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold text-blue-600">Role:</span> {detail.role}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold text-blue-600">Course:</span> {detail.course}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LeadersCard;
