"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const Music = () => {
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

  const activities = [
    {
      title: "Worship Services",
      description: "Leading worship during church services and special events.",
      icon: "🎵"
    },
    {
      title: "Choir Practice",
      description: "Regular rehearsals to perfect musical performances and harmonies.",
      icon: "🎼"
    },
    {
      title: "Music Training",
      description: "Training sessions for vocal and instrumental development.",
      icon: "🎹"
    },
    {
      title: "Special Performances",
      description: "Organizing and performing in special musical events and concerts.",
      icon: "🎤"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <Image
          src="/bg/images/ministries/music.jpg"
          alt="Music Ministry"
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
            Music <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Ministry</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl w-full md:w-[70%] max-w-4xl">
            Worshiping God Through Music
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center space-x-4 mt-4"
          >
            <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
            <span className="text-blue-200">Scroll to learn more</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto space-y-12"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
              The Music Ministry is dedicated to leading the congregation in worship through music.
              We believe that music is a powerful tool for expressing our love and devotion to God,
              and we strive to create an atmosphere of worship that draws people closer to Him.
            </p>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-xl text-white shadow-xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg md:text-xl">
              To lead the congregation in worship through music that glorifies God.
            </p>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-xl text-white shadow-xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-lg md:text-xl">
              To create an atmosphere of worship that draws people closer to God through music.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-8 text-center">
              Ministry Activities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-4xl">{activity.icon}</span>
                    <h3 className="text-xl font-bold text-blue-700 group-hover:text-blue-600 transition-colors">
                      {activity.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {activity.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="text-center"
          >
            <Link href="/aboutUs/ministries">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Back to Ministries</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Music;
