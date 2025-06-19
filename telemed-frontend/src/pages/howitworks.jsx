import React from "react";
import { FaUserMd, FaRegCalendarCheck, FaComments, FaFileMedical } from "react-icons/fa";

const steps = [
  {
    icon: <FaRegCalendarCheck className="text-blue-600 text-3xl" />,
    title: "1. Book Appointment",
    description: "Select your doctor and choose a convenient time to book your online appointment.",
  },
  {
    icon: <FaComments className="text-green-600 text-3xl" />,
    title: "2. Chat with Doctor",
    description: "Start a secure chat with your doctor for quick consultations and medical advice.",
  },
  {
    icon: <FaFileMedical className="text-purple-600 text-3xl" />,
    title: "3. Get e-Prescription",
    description: "Receive digital prescriptions and medical advice right after your chat.",
  },
  {
    icon: <FaUserMd className="text-red-600 text-3xl" />,
    title: "4. Follow Up & Access Records",
    description: "Continue care with follow-ups, chat again, or view your medical records anytime.",
  },
];

export default function HowItWorks() {
  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">How Telemed Works</h2>
        <p className="text-gray-600 mb-10">
          Get expert healthcare in 4 easy steps — from the comfort of your home.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
