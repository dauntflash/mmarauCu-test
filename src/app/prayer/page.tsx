"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { collection, getDocs, orderBy, query, deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Image from "next/image";

interface Prayer {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: { seconds: number; nanoseconds: number };
  userId: string;
}

const PrayerPage = () => {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

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
    // Check the current user's authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId(null);
      }
    });

    const toastId = toast.loading("Loading prayers...");
    const fetchPrayers = async () => {
      try {
        const q = query(collection(db, "prayers"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const prayerData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Prayer[];
        setPrayers(prayerData);
        toast.dismiss(toastId);
        if (prayerData.length === 0) {
          toast.info("No prayers available.", { autoClose: 3000 });
        } else {
          toast.success("Prayers loaded successfully!", { autoClose: 1500 });
        }
      } catch (err: unknown) {
        console.error("Error fetching prayers:", err);
        if (err instanceof Error) {
          setError(err.message || "Failed to load prayers.");
        } else {
          setError("An unknown error occurred.");
        }
        toast.dismiss(toastId);
        if (
          typeof err === "object" &&
          err !== null &&
          "code" in err &&
          err.code === "permission-denied"
        ) {
          toast.error("You do not have permission to view prayers. Please sign in.", {
            autoClose: 3000,
          });
        } else {
          toast.error("Failed to load prayers. Please try again later.", { autoClose: 3000 });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrayers();

    return () => unsubscribe();
  }, []);

  const handleDeletePrayer = (prayerId: string) => {
    const toastId = toast(
      <div>
        <p className="mb-4">Are you sure you want to delete this prayer?</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={async () => {
              try {
                await deleteDoc(doc(db, "prayers", prayerId));
                setPrayers(prayers.filter((prayer) => prayer.id !== prayerId));
                toast.dismiss(toastId);
                toast.success("Prayer deleted successfully!", { autoClose: 1500 });
              } catch (err) {
                console.error("Error deleting prayer:", err);
                toast.dismiss(toastId);
                toast.error("Failed to delete prayer. Please try again.", { autoClose: 3000 });
              }
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(toastId)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors">
            No
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false, draggable: false }
    );
  };

  const formatDateTime = (timestamp: { seconds: number; nanoseconds: number }) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] overflow-hidden">
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
          className="absolute inset-0 flex flex-col items-center justify-center text-center gap-6 px-8 md:px-16"
        >
          <h1 className="text-white text-4xl md:text-6xl font-bold">
            Let Us <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Pray Together</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl w-full md:w-[70%] max-w-4xl">
            "Do not be anxious about anything, but in every situation, by prayer and petition, with
            thanksgiving, present your requests to God." - Philippians 4:6
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center space-x-4 mt-4"
          >
            <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
            <span className="text-blue-200">Scroll to view prayer requests</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Prayer Requests Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto space-y-12"
        >
          <motion.div variants={fadeInUp} className="flex justify-between items-center">
            <div className="border-l-4 border-blue-600 px-5 py-3">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-700">Prayer Requests</h2>
            </div>
            <Link href="/prayer/addPrayer">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Add Prayer</span>
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </motion.div>
            </Link>
          </motion.div>

          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center py-12"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-red-600 bg-red-50 p-4 rounded-lg"
            >
              {error}
            </motion.div>
          ) : prayers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-700 bg-gray-50 p-8 rounded-lg"
            >
              No prayers available.
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {prayers.map((prayer) => (
                <motion.div
                  key={prayer.id}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <h4 className="font-bold text-blue-700 text-lg uppercase group-hover:text-blue-600 transition-colors">
                    {prayer.title}
                  </h4>
                  <p className="text-gray-500 text-sm italic mt-1">
                    By {prayer.createdBy} on {formatDateTime(prayer.createdAt)}
                  </p>
                  <p className="text-gray-700 mt-4 leading-relaxed">{prayer.description}</p>
                  {currentUserId && prayer.userId === currentUserId && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeletePrayer(prayer.id)}
                      className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PrayerPage;
