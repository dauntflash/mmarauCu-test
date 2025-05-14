"use client";

import LeadersCard from "@/app/components/cards/leadersCard";
import { motion } from "framer-motion";
import Image from "next/image";

const Leaders = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <Image
          src="/bg/images/church2.jpg"
          alt="Church Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-[2px]"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center gap-6 px-8 md:px-16"
        >
          <h1 className="text-white text-4xl md:text-6xl font-bold">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Leadership</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl w-full md:w-[70%] max-w-4xl">
            Church leadership guides, nurtures, and oversees a faith community, providing spiritual
            direction, administration, discipleship, and pastoral care with integrity and wisdom.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center space-x-4 mt-4"
          >
            <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
            <span className="text-blue-200">Scroll to meet our leaders</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Leadership Section */}
      <LeadersCard />
    </div>
  );
};

export default Leaders;
