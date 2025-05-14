'use client'
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const AddPrayer = () => {
  const [title, setTitle] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [requestType, setRequestType] = useState("personal");
  const [prayerRequest, setPrayerRequest] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user && user.emailVerified);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      toast.error("You must be logged in to submit a prayer request.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Submitting prayer request...");

    try {
      await addDoc(collection(db, "prayers"), {
        title,
        description: prayerRequest,
        createdBy: auth.currentUser.displayName || "Anonymous",
        createdAt: new Date(),
        userId: auth.currentUser.uid,
        requestType,
        phoneNumber: phoneNumber || null,
        isUrgent
      });

      if (isUrgent) {
        const message = encodeURIComponent(prayerRequest);
        const whatsappUrl = `https://wa.me/+254105349291?text=${message}`;
        window.location.href = whatsappUrl;
      } else {
        router.push("/prayer");
      }

      toast.dismiss(toastId);
      toast.success("Prayer request submitted successfully!", { autoClose: 1500 });
    } catch (err) {
      console.error("Error submitting prayer:", err);
      toast.dismiss(toastId);
      toast.error("Failed to submit prayer request. Please try again.", { autoClose: 3000 });
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="relative w-full h-[40vh] overflow-hidden">
          <Image
            src="/bg/images/prayer.jpg"
            alt="Prayer"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-[2px]"></div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <h1 className="text-white text-4xl md:text-6xl font-bold">
              Submit a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Prayer Request</span>
            </h1>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg mt-8 mb-8 text-center"
        >
          <p className="text-lg text-gray-700 mb-6">
            You must be logged in to submit a prayer request.
          </p>
          <Link href="/signIn">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign In
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="relative w-full h-[40vh] overflow-hidden">
        <Image
          src="/bg/images/prayer.jpg"
          alt="Prayer"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-[2px]"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <h1 className="text-white text-4xl md:text-6xl font-bold">
            Submit a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Prayer Request</span>
          </h1>
        </motion.div>
      </div>

      <motion.div 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-8 mb-8"
      >
        <motion.h2 
          variants={fadeInUp}
          className="text-3xl font-bold text-center mb-8 text-blue-700"
        >
          Prayer Request Form
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={fadeInUp}>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-colors"
              required
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number (optional)
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-colors"
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <label htmlFor="requestType" className="block text-sm font-medium text-gray-700 mb-2">
              Request Type
            </label>
            <select
              id="requestType"
              name="requestType"
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-colors"
            >
              <option value="personal">Personal</option>
              <option value="family">Family</option>
              <option value="health">Health & Healing</option>
              <option value="financial">Financial</option>
              <option value="spiritual">Spiritual Growth</option>
              <option value="other">Other</option>
            </select>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <label htmlFor="prayerRequest" className="block text-sm font-medium text-gray-700 mb-2">
              Prayer Request
            </label>
            <textarea
              id="prayerRequest"
              name="prayerRequest"
              rows={5}
              value={prayerRequest}
              onChange={(e) => setPrayerRequest(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-colors resize-none"
              placeholder="Please share your prayer request here..."
              required
            ></textarea>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex items-center space-x-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isUrgent"
                name="isUrgent"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
              />
              <label htmlFor="isUrgent" className="ml-2 block text-sm text-gray-700">
                Urgent Request
              </label>
            </div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="flex justify-center pt-6"
          >
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit Prayer Request"
              )}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddPrayer;