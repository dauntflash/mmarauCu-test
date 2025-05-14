"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const Evangelism = () => {
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
      title: "Door-to-Door Evangelism",
      description: "Reaching out to communities through personal visits and sharing the gospel.",
      icon: "🚪"
    },
    {
      title: "Street Evangelism",
      description: "Taking the message of Christ to the streets and public spaces.",
      icon: "🌆"
    },
    {
      title: "Campus Ministry",
      description: "Engaging with students and academic communities to spread God's word.",
      icon: "🎓"
    },
    {
      title: "Online Evangelism",
      description: "Utilizing digital platforms to reach a wider audience with the gospel.",
      icon: "💻"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <Image
          src="/bg/images/ministries/evangelism.jpg"
          alt="Evangelism Ministry"
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
            Evangelism <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Ministry</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl w-full md:w-[70%] max-w-4xl">
            Spreading the Good News to All Nations
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
              The Evangelism Ministry is dedicated to spreading the gospel of Jesus Christ through various
              outreach programs and initiatives. We believe in reaching out to people where they are,
              sharing the love of Christ, and making disciples of all nations.
            </p>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-xl text-white shadow-xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg md:text-xl">
              To fulfill the Great Commission by sharing the gospel and making disciples of all nations.
            </p>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-xl text-white shadow-xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-lg md:text-xl">
              To see lives transformed through the power of the gospel and communities impacted by God's love.
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

export default Evangelism;
