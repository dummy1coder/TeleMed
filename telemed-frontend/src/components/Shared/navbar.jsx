import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center space-x-3">
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z" />
          </svg>
          <Link to="/" className="text-xl font-bold">
            TeleMed
          </Link>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/about-us" className="hover:underline">
            About Us
          </Link>
          <Link to="/how-it-works" className="hover:underline">
            How Telemed Works
          </Link>
          <Link to="/doctors" className="hover:underline">
            Doctors
          </Link>
          <Link to="/faqs" className="hover:underline">
            FAQs
          </Link>
          <Link
            to="/login"
            className="bg-white text-blue-700 px-4 py-2 rounded shadow hover:bg-gray-100"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}