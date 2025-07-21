import React from "react";
import doctorImage from "../../assets/images/call.png";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-[#e6f0fb]">
      <div className="w-full lg:w-1/2 h-64 lg:h-full">
        <img src={doctorImage} alt="Doctor" className="w-full h-full object-cover lg:object-right" />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-9">
        <div className="max-w-md text-center lg:text-left space-y-5">
          <h1 className="text-3xl lg:text-4xl font-bold text-blue-800">
            Where Tech Meets Compassion
          </h1>

          <p className="text-base text-gray-700 leading-relaxed">
            Because Health Shouldn't Wait,
            <br /> Book Appointments and Consult Doctors Without Stepping Outside.
          </p>

          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Book Appointment
          </Link>

          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <input
              type="text"
              placeholder="Search doctors, specialties..."
              className="w-full px-4 py-2 text-sm focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700">
              Search
            </button>
          </div>

          <p className="text-sm text-gray-600">
            <b>Are you a qualified doctor?</b>{" "}
            <Link to="/doctor/register" className="text-blue-600 hover:underline">
              Then start now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
