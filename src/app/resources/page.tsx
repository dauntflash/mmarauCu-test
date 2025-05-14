'use client'
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

const resources = [
  {
    id: 1,
    title: "Bible Study Guide",
    description: "Comprehensive guide for personal and group Bible study sessions.",
    image: "/bg/images/give.jpg",
    category: "Study Materials",
  },
  {
    id: 2,
    title: "Prayer Journal",
    description: "Structured journal to track your prayer life and spiritual growth.",
    image: "/bg/images/give.jpg",
    category: "Personal Growth",
  },
  {
    id: 3,
    title: "Worship Songs Collection",
    description: "Collection of contemporary and traditional worship songs.",
    image: "/bg/images/give.jpg",
    category: "Music",
  },
  {
    id: 4,
    title: "Sermon Notes Template",
    description: "Printable template for taking effective sermon notes.",
    image: "/bg/images/give.jpg",
    category: "Study Materials",
  },
  {
    id: 5,
    title: "Family Devotional Guide",
    description: "Daily devotional guide for families with children.",
    image: "/bg/images/give.jpg",
    category: "Family",
  },
  {
    id: 6,
    title: "Leadership Resources",
    description: "Materials for church leaders and ministry coordinators.",
    image: "/bg/images/give.jpg",
    category: "Leadership",
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

export default function Resources() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isLoading, setIsLoading] = useState(true);

  // Fix: Replace useState with useEffect for loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <Image
          src="/bg/images/library.jpg"
          alt="Library"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-[2px]"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight mb-6">
            Spiritual <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Resources</span>
          </h1>
          <p className="text-white text-lg md:text-2xl max-w-3xl">
            Our resources are here to help you grow in your faith and walk with God.
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="flex flex-col items-center"
          >
            <span className="text-white text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <motion.div
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-1 h-2 bg-white rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Content Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="px-4 md:px-8 lg:px-12 py-12"
      >
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Library Card Section */}
            <motion.section 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-6xl mx-auto mt-10"
            >
              <motion.div 
                variants={fadeInUp}
                className="border-l-4 border-blue-600 px-5 py-3 mb-12"
              >
                <h2 className="text-3xl md:text-5xl font-bold pb-3 text-blue-700">
                  Library <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Access</span>
                </h2>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="bg-white p-8 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex-1">
                  <h1 className="font-bold text-3xl text-blue-700 mb-4">Library Card</h1>
                  <p className="text-gray-700 text-lg">
                    Access a variety of resources to deepen your understanding and grow in faith.
                  </p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/resources/library"
                    className="bg-blue-600 text-white font-medium rounded-lg px-8 py-4 hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <i className="fas fa-book-open"></i>
                    Visit Library
                  </Link>
                </motion.div>
              </motion.div>
            </motion.section>

            {/* Resources Grid */}
            <motion.section 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-6xl mx-auto mt-20"
            >
              <motion.div 
                variants={fadeInUp}
                className="border-l-4 border-blue-600 px-5 py-3 mb-12"
              >
                <h2 className="text-3xl md:text-5xl font-bold pb-3 text-blue-700">
                  Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Resources</span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources.map((resource) => (
                  <motion.div
                    key={resource.id}
                    variants={fadeInUp}
                    whileHover={{ y: -10 }}
                    className="group"
                  >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={resource.image}
                          alt={resource.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 right-4">
                          <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                            {resource.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-xl text-blue-700 mb-2 group-hover:text-blue-600 transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{resource.description}</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full bg-blue-600 text-white font-medium rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <i className="fas fa-download"></i>
                          Download
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </>
        )}
      </motion.div>
    </div>
  );
}
