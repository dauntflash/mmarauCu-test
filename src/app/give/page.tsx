"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const Give = () => {
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

  const paymentMethods = [
    {
      title: "M-Pesa Paybill",
      image: "/bg/images/mpesaPaybill.jpg",
      steps: [
        "Go to Paybill",
        "Paybill Number: 4100261",
        "Account Number: (tithes, offerings, missions)"
      ],
      icon: "📱"
    },
    {
      title: "Bank Account",
      image: "/bg/images/kcb.jpg",
      steps: [
        "Bank: KCB Bank",
        "Account Number: 200461"
      ],
      icon: "🏦"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <Image
          src="/bg/images/give.jpg"
          alt="Give"
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
            Give <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Generously</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl w-full md:w-[70%] max-w-4xl">
            Your generosity helps fund fellowships, missions, and outreach programs—partner with us today!
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
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
              Support Our Mission
            </h2>
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
              Your contributions enable us to spread the Gospel and serve our community effectively.
              Choose your preferred payment method below.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                    <Image
                      src={method.image}
                      alt={method.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-4xl">{method.icon}</span>
                    <h3 className="text-xl font-bold text-blue-700 group-hover:text-blue-600 transition-colors">
                      {method.title}
                    </h3>
                  </div>
                  <ol className="list-decimal space-y-2 pl-5 text-gray-600">
                    {method.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="text-center"
          >
            <Link href="/give/online">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                <span>Give Online</span>
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
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

export default Give;
