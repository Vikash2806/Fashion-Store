import React, { useEffect, useState } from "react";
import { getDresses } from "../api";
import DressCard from "./DressCard";

export default function DressGrid() {
  const [dresses, setDresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDress, setSelectedDress] = useState(null);
  const [showOrderInfo, setShowOrderInfo] = useState(false);

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

  const closeModal = () => {
    setSelectedDress(null);
    setShowOrderInfo(false);
  };

  return (
    <section id="collection" className="max-w-6xl mx-auto px-6 py-12 relative">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Our Collection
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Click on any dress to see details & order
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-lg text-gray-500 dark:text-gray-400">
          Loading dresses…
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {dresses.map((d) => (
            <div
              key={d._id}
              onClick={() => setSelectedDress(d)}
              className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
            >
              <DressCard dress={d} />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedDress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred background */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md transition-opacity"
            onClick={closeModal}
          ></div>

          {/* Modal container */}
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-sm w-full z-10 overflow-hidden transform transition-transform duration-300 scale-100">
            {!showOrderInfo ? (
              <>
                <img
                  src={selectedDress.images[0]}
                  alt={selectedDress.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center space-y-3">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedDress.name}
                  </h3>
                  <p className="text-xl text-indigo-600 font-semibold">
                    ₹{selectedDress.price}
                  </p>
                  <button
                    onClick={() => setShowOrderInfo(true)}
                    className="mt-4 w-full bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-white py-2 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 font-semibold"
                  >
                    Order Now
                  </button>
                </div>
              </>
            ) : (
              <div className="p-6 text-center space-y-4">
                <img
                  src="/qr-placeholder.png"
                  alt="QR Code"
                  className="mx-auto w-40 h-40"
                />
                <div className="space-y-1 text-gray-800 dark:text-gray-200">
                  <p>📞 +91-9876543210</p>
                  <p>
                    <a
                      href="https://wa.me/9876543210"
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-500 underline"
                    >
                      WhatsApp
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://instagram.com/yourshop"
                      target="_blank"
                      rel="noreferrer"
                      className="text-pink-500 underline"
                    >
                      Instagram
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 text-2xl font-bold hover:text-red-500 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
