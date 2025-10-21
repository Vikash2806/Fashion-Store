import React from "react";

export default function Hero() {
  const handleScroll = (e) => {
    e.preventDefault();
    const section = document.querySelector("#collection");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="px-6 py-20 md:py-28 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Text Section */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Redefine Your Style with <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Vismita Collections</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-md mx-auto md:mx-0">
            Step into the latest trends  explore our curated collection of elegant dresses crafted for every vibe. From chic casuals to glamorous evenings, find the perfect style that expresses your personality. <br />
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">Your fashion journey starts here.</span>
          </p>
          <a
            href="#collection"
            onClick={handleScroll}
            className="inline-block mt-6 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-white font-semibold rounded-xl hover:scale-105 transform transition-all duration-300"
          >
            Explore Our Collection
          </a>
        </div>

        {/* Hero Image */}
        <div className="flex-1 relative">
          <img
            src="/your-illustration4.png"
            alt="Fashion Illustration"
            className="w-full h-auto max-h-[700px] md:max-h-[800px] object-contain transform transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </header>
  );
}
