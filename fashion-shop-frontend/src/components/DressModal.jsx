import React, { useState } from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function DressModal({ dress, onClose, layoutId }) {
  const [showOrder, setShowOrder] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = dress.images || [];

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4 overflow-y-auto py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal box */}
      <motion.div
        layoutId={layoutId}
        className="relative z-10 bg-white/95 dark:bg-gray-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row border border-gray-200 dark:border-gray-700"
      >
        {/* Close button (fixed position on top right) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 text-gray-700 dark:text-gray-300 text-2xl bg-white/60 dark:bg-gray-800/60 rounded-full p-2 hover:text-red-500 shadow-md"
        >
          <FaTimes />
        </button>

        {/* Left: Image viewer */}
        <div className="md:w-1/2 w-full relative bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center p-2">
          {images.length > 0 ? (
            <>
              <img
                src={images[currentIndex]}
                alt={dress.name}
                className="w-full h-[280px] sm:h-[400px] md:h-[500px] object-contain rounded-xl transition-all duration-300"
              />

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}

              {/* Thumbnail preview (2 per row on mobile) */}
              {images.length > 1 && (
                <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 mt-3 mb-3 overflow-x-auto px-3">
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt=""
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-full sm:w-16 h-16 object-cover rounded-md cursor-pointer border-2 ${
                        idx === currentIndex
                          ? "border-indigo-500"
                          : "border-transparent opacity-60 hover:opacity-100"
                      } transition-all`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-gray-400 py-10">No image available</div>
          )}
        </div>

        {/* Right: Details / Order */}
        <div className="md:w-1/2 w-full flex flex-col justify-center p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
          {!showOrder ? (
            <>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center md:text-left">
                  {dress.name}
                </h2>
                <p className="text-xl sm:text-2xl font-semibold text-indigo-600 dark:text-indigo-400 text-center md:text-left">
                  ₹{dress.price}
                </p>
                <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-center md:text-left">
                  {dress.description ||
                    "A beautiful piece from our latest collection, crafted with elegance and comfort in mind."}
                </p>
              </div>

              <button
                onClick={() => setShowOrder(true)}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white py-3 rounded-xl text-lg font-semibold hover:scale-[1.02] shadow-lg transition-transform duration-300"
              >
                Order Now
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center text-center space-y-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                Contact us to order this dress:
              </h3>
              <img
                src="/qr-placeholder.png"
                alt="QR code"
                className="w-32 sm:w-40 h-32 sm:h-40 rounded-xl shadow-md"
              />
              <div className="flex gap-6 text-2xl sm:text-3xl">
                <a
                  href="https://wa.me/9640311790"
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-500 hover:scale-110 transition-transform"
                >
                  <FaWhatsapp />
                </a>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-pink-500 hover:scale-110 transition-transform"
                >
                  <FaInstagram />
                </a>
              </div>
              <button
                onClick={() => setShowOrder(false)}
                className="text-indigo-600 dark:text-indigo-400 hover:underline mt-4"
              >
                ← Back
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
