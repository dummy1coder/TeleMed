import React from "react";
import doctorImage from "../../assets/images/call2.png";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <>
      <section className="bg-[#cfd1d2] py-10 px-6 lg:px-24 flex flex-col-reverse lg:flex-row items-center justify-between min-h-[calc(80vh-4rem)]">
        <div className="text-center lg:text-left max-w-xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-9">
            Where Tech Meets Compassion
          </h1>
          <p className="text-lg text-gray-600 mb-9">
            Because Health Shouldn't Wait, <br /> Book Appointments and Consult Doctors Without Stepping Outside.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-9">
         <Link to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                Book Appointment
            </Link>
          </div>

          <div className="flex items-center border rounded-lg overflow-hidden shadow-sm max-w-md mx-auto lg:mx-0">
            <input
              type="text"
              placeholder="Search doctors, specialties..."
              className="w-full px-4 py-2 focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">
              Search
            </button>
          </div><br />
          <div className="mt-4 text-sm text-gray-600 text-center lg:text-left">
            <b>Are you a qualified doctor?{" "}</b>
            <Link to="/doctor/register" className="text-blue-600 hover:underline">
            <u>Then start now</u>
            </Link>
            </div>
            </div>
        <div className="w-full lg:w-1/2 flex justify-center lg:ml-12">
  <img
  src={doctorImage}
  alt="Doctor illustration"
  className="max-w-[500px] max-h-[550px] w-full h-auto rounded-2xl shadow-lg object-contain"
/>
</div>

      </section>
    </>
  );
}
