import React, { useState } from "react";

export default function Faqs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is Telemed?",
      answer:
        "Telemed is a digital platform that connects patients with licensed doctors for remote consultations via chat.",
    },
    {
      question: "How do I book an appointment?",
      answer:
        "After logging in, navigate to the 'Doctors' page, select a doctor, and click 'Book Appointment' to choose your time slot.",
    },
    {
      question: "Are my consultations private?",
      answer:
        "Yes. All consultations are confidential and compliant with healthcare privacy regulations such as HIPAA.",
    },
    {
      question: "Can I use Telemed on my phone?",
      answer:
        "Absolutely! Telemed works seamlessly on mobile browsers and does not require app installation.",
    },
  ];

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-sm"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full text-left px-6 py-4 font-medium text-gray-800 bg-gray-50 hover:bg-gray-100"
            >
              {faq.question}
            </button>
            {activeIndex === index && (
              <div className="px-6 py-4 text-gray-700 bg-white border-t">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
