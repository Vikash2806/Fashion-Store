import React from "react";

export default function Hero() {
  return (
    <header className="px-6 py-16 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Text section */}
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Redefine Your Style
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
            Step into the latest trends — explore our curated collection made
            for every vibe.
          </p>
          <a
            href="#collection"
            className="inline-block mt-4 px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-all"
          >
            Explore Dresses
          </a>
        </div>

        {/* SVG illustration section */}
        <div className="flex-1">
          <img
            src="/your-illustration.svg"
            alt="Fashion Illustration"
            className="w-full h-auto max-h-96 object-contain"
          />
        </div>
      </div>
    </header>
  );
}
