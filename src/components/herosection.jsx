import React from "react";
import doctorImage from "../assets/images/call1.jpg";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <>
      

      <section className="bg-[#f0f4f8] py-16 px-6 lg:px-24 flex flex-col-reverse lg:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="text-center lg:text-left max-w-xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-9">
            Your Health, Anywhere
          </h1>
          <p className="text-lg text-gray-600 mb-9">
            Book appointments and consult doctors without stepping outside.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-9">
         <Link to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                Book Appointment
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex items-center border rounded-lg overflow-hidden shadow-sm max-w-md mx-auto lg:mx-0">
            <input
              type="text"
              placeholder="Search doctors, specialties..."
              className="w-full px-4 py-2 focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">
              Search
            </button>
          </div>
          <div className="mt-4 text-sm text-gray-600 text-center lg:text-left">
            <b>Are you a qualified doctor?{" "}</b>
            <a href="/doctor-register" className="text-blue-600 hover:underline">
            <u>Then start now</u>
            </a>
            </div>
            </div>

        

        {/* Image */}
        <div className="w-full max-w-lg mb-8 lg:mb-0">
          <img
            src={doctorImage}
            alt="Doctor illustration"
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </div>
      </section>
    </>
  );
}
