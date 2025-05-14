"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const AboutUsPage = () => {
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
    <section className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <Image
          src="/bg/images/church.jpg"
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
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Us</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-2xl max-w-3xl">
            Vision | Mission | Core Values | Doctrinal Basis | Leaders | Ministries
          </p>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Who We Are Section */}
        <motion.section 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div 
            variants={fadeInUp}
            className="border-l-4 border-blue-600 pl-6 py-3 mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-blue-700 mb-2">Who We Are</h2>
            <p className="text-xl text-gray-600">Vision | Mission | Core Values</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Vision",
                content: "To be a Christ model of transformation in church and society.",
                icon: "👁️"
              },
              {
                title: "Mission",
                content: "To enhance the art and practice of discipleship, evangelism, leadership development, and social transformation to every member of the campus community and society for effective Christian living.",
                icon: "🎯"
              },
              {
                title: "Core Values",
                content: (
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <span className="text-blue-600">•</span>
                      <span>Teamwork</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-blue-600">•</span>
                      <span>Stewardship</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-blue-600">•</span>
                      <span>Integrity</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-blue-600">•</span>
                      <span>Righteousness</span>
                    </li>
                  </ul>
                ),
                icon: "💎"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="group p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-blue-700 mb-4 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <div className="text-gray-600 leading-relaxed">
                  {item.content}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Doctrinal Basis Section */}
        <motion.section 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div 
            variants={fadeInUp}
            className="border-l-4 border-blue-600 pl-6 py-3 mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-blue-700 mb-2">Doctrinal Basis</h2>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-xl text-white shadow-xl"
          >
            <div className="space-y-4">
              {[
                "The Unity of the Father, the Son, and the Holy Spirit in God the Head.",
                "The Sovereignty of God in creation, revelation, redemption, and final judgment.",
                "The divine inspiration and entire truthfulness of the Holy Scriptures originally given and its supreme authority in all matters of faith and conduct.",
                "The universal sinfulness and guilt of all men since the FALL, rendering them subject to God's wrath and condemnation.",
                "Redemption from guilt, penalty, dominion, and pollution solely through the sacrificial death of the Lord Jesus Christ, the Incarnate Son of God as our representative.",
                "The bodily resurrection of Jesus Christ from the dead and His ascension to the Right Hand of God the Father.",
                "The presence and power of the Holy Spirit in the work of regeneration.",
                "The justification of the sinner by the Grace of God through Faith.",
                "The indwelling and work of the Holy Spirit in every believer.",
                "The only holy Universal church which is the body of Christ and to which all believers in unity belong.",
                "The expectation of the personal return of the Lord Jesus Christ and the subsequent eternal life of the holy Universal church in heaven."
              ].map((doctrine, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <span className="text-blue-200 font-bold mt-1">{String.fromCharCode(97 + index)})</span>
                  <span>{doctrine}</span>
                </motion.p>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Leaders and Ministries Section */}
        <motion.section 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {[
            {
              title: "Leaders",
              description: "Church leadership guides, nurtures, and oversees a faith community, providing spiritual direction, administration, discipleship, and pastoral care with integrity and wisdom.",
              link: "/aboutUs/leadership",
              icon: "👥"
            },
            {
              title: "Ministries",
              description: "Church ministries serve, disciple, and support the community through worship, outreach, teaching, fellowship, and care, fostering spiritual growth and mission work.",
              link: "/aboutUs/ministries",
              icon: "⛪"
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-2xl font-bold text-blue-700 mb-4">{card.title}</h3>
              <p className="text-gray-600 mb-6">{card.description}</p>
              <Link href={card.link}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span>Read more</span>
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
            </motion.div>
          ))}
        </motion.section>
      </div>
    </section>
  );
};

export default AboutUsPage;
