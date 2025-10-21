import React, { useState } from "react";
import { motion } from "framer-motion";

export default function DressCard({ dress }) {
  const [idx, setIdx] = useState(0);
  const images = dress.images || [];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative rounded-3xl bg-white/70 dark:bg-gray-800/40 shadow-lg backdrop-blur-md border border-gray-200 dark:border-gray-700 p-4 overflow-hidden group"
    >
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>

      {/* Image Section */}
      <div className="relative h-56 rounded-2xl overflow-hidden mb-4">
        {images.length ? (
          <motion.img
            key={idx}
            src={images[idx]}
            alt={dress.name}
            className="w-full h-full object-cover rounded-2xl"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}

        {/* Dots for navigation */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === idx ? "bg-indigo-500 scale-110" : "bg-gray-400/60 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Text Details */}
      <div className="flex flex-col space-y-1 text-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">
          {dress.name}
        </h3>
        <p className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
          ₹{dress.price}
        </p>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Code: #{dress.number}
        </span>
      </div>
    </motion.div>
  );
}
