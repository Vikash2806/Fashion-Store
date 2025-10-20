import React from "react";

export default function DressModal({ dress, showOrder, onClose, onOrder }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* background overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative z-10 max-w-lg w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-gray-900 dark:text-gray-100">
        {!showOrder ? (
          <>
            <img
              src={dress.images[0]}
              alt={dress.name}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{dress.name}</h2>
            <p className="text-xl mb-4">₹{dress.price}</p>
            <button
              onClick={onOrder}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
            >
              Order Now
            </button>
          </>
        ) : (
          <>
            <div className="text-center space-y-4">
              <img
                src="/qr-placeholder.png"
                alt="QR Code"
                className="w-40 h-40 mx-auto"
              />
              <p className="text-lg">Call/WhatsApp: <a href="tel:+911234567890" className="text-indigo-600">+91 1234567890</a></p>
              <p>
                WhatsApp:{" "}
                <a
                  href="https://wa.me/911234567890"
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-600"
                >
                  Chat Now
                </a>
              </p>
              <p>
                Instagram:{" "}
                <a
                  href="https://instagram.com/yourshop"
                  target="_blank"
                  rel="noreferrer"
                  className="text-pink-600"
                >
                  @yourshop
                </a>
              </p>
            </div>
          </>
        )}

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
