import React, { useState } from "react";

export default function DressCard({ dress }) {
  const [idx, setIdx] = useState(0);
  const images = dress.images || [];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 transform hover:scale-105 transition-transform duration-300 cursor-pointer border-t-4 border-gradient-to-r from-pink-400 via-purple-500 to-indigo-600">
      {/* Main Image */}
      <div className="h-52 mb-3 overflow-hidden rounded-xl relative group">
        {images.length ? (
          <img
            src={images[idx]}
            alt={dress.name}
            className="w-full h-full object-cover rounded-xl transform group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-2 mb-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                i === idx ? "border-indigo-500" : "border-transparent"
              } transition-all duration-200`}
              onClick={() => setIdx(i)}
            />
          ))}
        </div>
      )}

      {/* Details */}
      <h3 className="font-semibold text-gray-900 dark:text-white text-lg truncate">{dress.name}</h3>
      <p className="text-indigo-600 font-bold text-md">₹{dress.price}</p>
      <p className="text-xs text-gray-500 mt-1">#{dress.number}</p>
    </div>
  );
}
