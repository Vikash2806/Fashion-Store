import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinkStyle = (path) =>
    `px-4 py-2 text-sm md:text-base font-medium rounded-md transition-all ${
      location.pathname === path
        ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      {/* Floating Rounded Navbar */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] md:w-[85%] rounded-3xl bg-white/90 dark:bg-gray-950/90 border border-gray-200 dark:border-gray-800 shadow-md backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-semibold tracking-tight">
            Vismita<span className="text-indigo-500"> Collections</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-2">
            <Link to="/" className={navLinkStyle("/")}>
              Home
            </Link>
            <Link to="/admin" className={navLinkStyle("/admin")}>
              Admin
            </Link>
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
