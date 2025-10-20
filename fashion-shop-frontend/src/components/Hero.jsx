import React from "react";

export default function Hero() {
  return (
    <header className="relative px-6 py-20 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Text section */}
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Redefine Your Style
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Step into the latest trends — explore our curated collection made for every vibe.
          </p>
          <a
            href="#collection"
            className="inline-block mt-4 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300"
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

      {/* Scroll down hint */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <span className="text-white text-lg">⌄ Scroll Down ⌄</span>
      </div>
    </header>
  );
}
