import React from "react";
import { FaTimes, FaWhatsapp, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactModal({ onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Background overlay (no heavy blur) */}
        <motion.div
          className="absolute inset-0 bg-black/50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        />

        {/* Modal Card */}
        <motion.div
          className="relative z-10 bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-md w-full p-6 sm:p-8 flex flex-col gap-5"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-700 dark:text-gray-300 text-2xl bg-white/60 dark:bg-gray-800/60 rounded-full p-2 hover:text-red-500 shadow-md"
          >
            <FaTimes />
          </button>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
            Contact Us
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
            We'd love to hear from you! Reach out for any inquiries.
          </p>

          {/* Contact Info */}
          <div className="flex flex-col gap-4 text-gray-800 dark:text-gray-200">
            <div className="flex items-center gap-3">
              <FaWhatsapp className="text-green-500 text-xl" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <a
                  href="https://wa.me/919640311790"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                >
                  +91 96403 11790
                </a>
                <span className="hidden sm:inline text-gray-400">/</span>
                <a
                  href="https://wa.me/919092043554"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                >
                  +91 90920 43554
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-red-500 text-xl mt-1" />
              <span>
                Perumal Kovil Street, Kovaipudur - 641008, Coimbatore, Tamil Nadu
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
              <FaPhone className="text-gray-400 dark:text-gray-500 text-base" />
              <span>Web design & development inquiries: +91 90803 73654</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
