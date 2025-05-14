"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ministries = [
  {
    title: "Music Ministry",
    description: "Leading worship and creating an atmosphere of praise through music and song.",
    icon: "🎵",
    link: "/aboutUs/ministries/music",
    image: "/bg/images/music.jpg"
  },
  {
    title: "Children Ministry",
    description: "Nurturing young hearts and minds in the ways of faith and love.",
    icon: "👶",
    link: "/aboutUs/ministries/children",
    image: "/bg/images/children.jpg"
  },
  {
    title: "Ushering Ministry",
    description: "Creating a welcoming environment and ensuring smooth service operations.",
    icon: "🤝",
    link: "/aboutUs/ministries/ushering",
    image: "/bg/images/ushering.jpg"
  },
  {
    title: "Media Ministry",
    description: "Spreading the message through digital platforms and visual communication.",
    icon: "📱",
    link: "/aboutUs/ministries/editorial",
    image: "/bg/images/media.jpg"
  },
  {
    title: "Technical Ministry",
    description: "Supporting services with technical expertise and equipment management.",
    icon: "🔧",
    link: "/aboutUs/ministries/technical",
    image: "/bg/images/technical.jpg"
  },
  {
    title: "Evangelism Ministry",
    description: "Sharing the gospel and reaching out to the community with God's love.",
    icon: "📖",
    link: "/aboutUs/ministries/evangelism",
    image: "/bg/images/evangelism.jpg"
  },
  {
    title: "Discipleship Ministry",
    description: "Growing in faith and helping others develop their relationship with Christ.",
    icon: "✝️",
    link: "/aboutUs/ministries/discipleship",
    image: "/bg/images/discipleship.jpg"
  },
  {
    title: "Intercessory Ministry",
    description: "Dedicated to prayer and spiritual warfare for the church and community.",
    icon: "🙏",
    link: "/aboutUs/ministries/intercessory",
    image: "/bg/images/intercessory.jpg"
  }
];

const MinistriesPage = () => {
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
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <Image
          src="/bg/images/ministries.jpg"
          alt="Ministries Background"
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
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Ministries</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl w-full md:w-[70%] max-w-4xl">
            Each ministry serves a unique purpose in our church, working together to fulfill God's mission
            and serve our community with love and dedication.
          </p>
        </motion.div>
      </div>

      {/* Ministries Grid */}
      <div className="container mx-auto px-4 py-16">
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
            <h2 className="text-3xl md:text-5xl font-bold text-blue-700 mb-2">Explore Our Ministries</h2>
            <p className="text-xl text-gray-600">Discover how you can serve and grow</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministries.map((ministry, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={ministry.image}
                    alt={ministry.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-3xl">{ministry.icon}</span>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {ministry.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6">{ministry.description}</p>
                  <Link href={ministry.link}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <span>Learn More</span>
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
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MinistriesPage; 