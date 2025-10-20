import React, { useEffect, useState } from "react";
import { getDresses } from "../api";
import DressCard from "./DressCard";
import DressModal from "./DressModal";
import { AnimatePresence, motion } from "framer-motion";

export default function DressGrid() {
  const [dresses, setDresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDress, setSelectedDress] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getDresses();
      setDresses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section id="collection" className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
          Our Collection
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-3 md:mt-0 text-lg">
          Discover handpicked styles curated just for you.
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-10 h-10 border-4 border-gray-400 dark:border-gray-600 border-t-transparent rounded-full"
          />
        </div>
      ) : dresses.length === 0 ? (
        <div className="text-center py-20 text-lg text-gray-500 dark:text-gray-400">
          No dresses found 😢
        </div>
      ) : (
        /* Dress Grid */
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {dresses.map((d) => (
            <motion.div
              key={d._id}
              layoutId={`card-${d._id}`}
              onClick={() => setSelectedDress(d)}
              whileHover={{ scale: 1.03, y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="cursor-pointer rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <DressCard dress={d} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedDress && (
          <DressModal
            dress={selectedDress}
            onClose={() => setSelectedDress(null)}
            layoutId={`card-${selectedDress._id}`}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
