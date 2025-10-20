import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinkStyle = (path) =>
    `text-sm md:text-base font-medium px-4 py-2 rounded-full transition-all duration-300 ${
      location.pathname === path
        ? "bg-white/20 text-white backdrop-blur-sm shadow-md"
        : "text-white/80 hover:text-white hover:bg-white/10"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      {/* Navbar */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] md:w-[85%] rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 shadow-xl backdrop-blur-lg bg-opacity-90 border border-white/20">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl md:text-3xl font-extrabold tracking-tight text-white drop-shadow-md"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-pink-100 to-white">
              Vismita
            </span>
            <span className="text-white"> Collections</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className={navLinkStyle("/")}>
              Home
            </Link>
            <Link to="/admin" className={navLinkStyle("/admin")}>
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-md text-center py-4 space-y-3 rounded-b-3xl">
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
          </div>
        )}
      </nav>

      {/* Page Content */}
      <div className="pt-28 md:pt-32">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}
