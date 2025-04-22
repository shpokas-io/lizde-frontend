"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaLock } from "react-icons/fa";

interface LockedContentProps {
  title: string;
  description?: string;
}

export default function LockedContent({ title, description }: LockedContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800 overflow-hidden min-h-[400px] flex items-center justify-center"
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10" />
      
      {/* Content container */}
      <div className="relative z-30 text-center max-w-md mx-auto">
        {/* Lock icon animation */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="mb-8"
        >
          <FaLock className="w-16 h-16 text-orange-500 mx-auto" />
        </motion.div>

        {/* Text content */}
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {description && (
          <p className="text-gray-400 mb-8">{description}</p>
        )}
        
        {/* Button */}
        <Link
          href="/cart"
          className="inline-block py-3 px-6 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold
          transition-all duration-200 transform hover:scale-105 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
        >
          Unlock Course
        </Link>
      </div>
    </motion.div>
  );
} 