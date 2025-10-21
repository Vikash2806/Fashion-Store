import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import ContactModal from "./components/ContactModal"; // ✅ import

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const location = useLocation();

  const navLinkStyle = (path) =>
    `px-4 py-2 text-sm md:text-base font-medium rounded-md transition-all ${
      location.pathname === path
        ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      {/* Floating Rounded Navbar */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] md:w-[85%] rounded-3xl bg-white/90 dark:bg-gray-950/90 border border-gray-200 dark:border-gray-800 shadow-md backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* ✅ Logo + Name */}
          <Link
            to="/"
            className="flex items-center space-x-4 text-2xl font-semibold tracking-tight group"
          >
            <img
              src="/logo3.png" // ✅ your logo path (inside /public)
              alt="Vismita Logo"
              className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-md"
            />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold tracking-wide text-[1.6rem] md:text-[1.8rem] group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.5)] transition-all duration-300">
              Vismita <span className="text-indigo-500">Collections</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-2">
            <Link to="/" className={navLinkStyle("/")}>
              Home
            </Link>
            <Link to="/admin" className={navLinkStyle("/admin")}>
              Admin
            </Link>
            <button
              onClick={() => setContactOpen(true)}
              className="px-4 py-2 text-sm md:text-base font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 rounded-b-3xl text-center py-4 space-y-3">
            <Link
              to="/"
              className={navLinkStyle("/")}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/admin"
              className={navLinkStyle("/admin")}
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>
            <button
              onClick={() => setContactOpen(true)}
              className="px-4 py-2 text-sm md:text-base font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              Contact
            </button>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <div className="pt-28 md:pt-32 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md py-6 text-center text-sm md:text-base">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-gray-700 dark:text-gray-300">
          <p>
            Made with <span className="text-pink-500">🤍</span> by{" "}
            <span className="font-semibold text-indigo-500">Vikash</span>
          </p>
          <p>
            For web design or development inquiries —{" "}
            <span className="font-medium text-indigo-600 dark:text-indigo-400">
              +91 90803 73654
            </span>
          </p>
        </div>
      </footer>

      {/* Contact Modal */}
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </div>
  );
}
