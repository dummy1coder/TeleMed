import React from "react";
import telemedImg from "../assets/images/about-us.png";

export default function AboutUs() {
  return (
    <div className="bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About Telemed</h2>
          <p className="text-gray-600 mb-4">
            Telemed is a digital healthcare platform founded in <strong>2022</strong> and based in <strong>Nakuru, Kenya</strong>. 
            Our goal is to make healthcare more accessible and efficient through secure online consultations.
          </p>
          <p className="text-gray-600 mb-4">
            We connect patients and licensed doctors through a seamless, real-time interface, helping users receive quality 
            care from the comfort of their homes.
          </p>
          <p className="text-gray-600">
            Whether it’s a quick check-up, prescription refill, or a follow-up consultation — Telemed is here to make healthcare simple.
          </p>
        </div>

        <div className="w-full h-full">
          <img
            src={telemedImg}
            alt="Telemedicine consultation"
            className="rounded-xl shadow-md w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
