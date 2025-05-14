"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { motion } from "framer-motion";
import "react-multi-carousel/lib/styles.css";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

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

export default function Youtube() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&channelId=UCihBYX0YFieaYFkHC8MZjLw&part=snippet,id&order=date&maxResults=7`
      );
      if (!response.ok) throw new Error("Failed to fetch videos");
      const data = await response.json();
      const videos = data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
        publishedAt: item.snippet.publishedAt,
      }));
      setVideos(videos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("Failed to load videos. Please try again later.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-red-500 text-center p-8 bg-red-50 rounded-lg"
      >
        <i className="fas fa-exclamation-circle text-2xl mb-2"></i>
        <p>{error}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchVideos}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Try Again
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.section 
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="py-8"
    >
      <motion.div 
        variants={fadeInUp}
        className="border-l-4 border-blue-600 px-3 py-3 mb-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold pb-3 text-blue-700">
          YouTube <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Channel</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          View all sermons on our YouTube channel. Like, share, and subscribe!
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <Carousel 
          responsive={responsive} 
          infinite 
          itemClass="px-4" 
          className="custom-carousel"
          customTransition="transform 300ms ease-in-out"
          containerClass="py-4"
          sliderClass="gap-4"
          arrows={true}
          renderButtonGroupOutside={true}
          customButtonGroup={
            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-chevron-left"></i>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-chevron-right"></i>
              </motion.button>
            </div>
          }
        >
          {videos.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ y: -10 }}
              className="my-3 w-full shadow-xl h-[400px] flex flex-col rounded-lg overflow-hidden bg-white"
            >
              <div className="h-[60%] relative group">
                <Link 
                  href={`https://www.youtube.com/watch?v=${video.id}`} 
                  target="_blank" 
                  aria-label={`Watch ${video.title} on YouTube`}
                  className="block relative h-full"
                >
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    quality={100}
                    placeholder="blur"
                    blurDataURL="/placeholder.jpg"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center"
                    >
                      <i className="fas fa-play text-white text-2xl"></i>
                    </motion.div>
                  </div>
                </Link>
              </div>
              <div className="h-[40%] p-4 flex flex-col text-center relative bg-white">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-800">{video.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(video.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <Link
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white w-[90%] p-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  aria-label={`Watch ${video.title} on YouTube`}
                >
                  <i className="fab fa-youtube"></i>
                  Watch Now
                </Link>
              </div>
            </motion.div>
          ))}
        </Carousel>
      )}
    </motion.section>
  );
}
