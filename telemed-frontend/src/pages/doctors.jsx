import React from "react";
import doc1 from "../assets/images/doc1.jpg";
import doc2 from "../assets/images/doc2.jpg";
import doc3 from "../assets/images/doc3.jpg";
import { Link } from "react-router-dom";

export default function Doctors() {
  const doctors = [
    {
      name: "Dr. Fallon Lyka",
      specialty: "Cardiologist",
      photo: doc1,
      bio:
        "Dr. Fallon Lyka is an experienced cardiologist dedicated to providing comprehensive cardiovascular care.",
      experience: 12,
      contact: {
        phone: "+254 723 123 456",
        email: "fallon.lyka@telemed.com",
        location: "Kisumu, Kenya",
      },
      availability: "Mon - Fri, 9am - 5pm",
    },
    {
      name: "Dr. Liam Doe",
      specialty: "Dermatologist",
      photo: doc2,
      bio:
        "Dr. Liam Doe has been treating skin conditions with care and precision for over a decade.",
      experience: 10,
      contact: {
        phone: "+243 789 678 345",
        email: "liam.doe@telemed.com",
        location: "Mombasa, Kenya",
      },
      availability: "Tue - Sat, 10am - 6pm",
    },
    {
      name: "Dr. Luna Love",
      specialty: "Pediatrician",
      photo: doc3,
      bio:
        "Dr. Luna Love is a compassionate pediatrician focused on children's health and well-being.",
      experience: 8,
      contact: {
        phone: "+254 734 890 673",
        email: "luna.love@telemed.com",
        location: "Nairobi, Kenya",
      },
      availability: "Mon - Fri, 8am - 4pm",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {doctors.map((doctor, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden p-6"
        >
          <img
            src={doctor.photo}
            alt={doctor.name}
            className="w-32 h-32 rounded-full object-cover mx-auto mb-4 shadow-lg"
          />
          <h2 className="text-xl font-bold text-center">{doctor.name}</h2>
          <p className="text-center text-blue-600">{doctor.specialty}</p>
          <p className="text-gray-700 mt-2 text-sm">{doctor.bio}</p>

          <div className="text-sm text-gray-600 mt-4 space-y-1">
            <p>
              <strong>Experience:</strong> {doctor.experience} years
            </p>
            <p>
              <strong>Availability:</strong> {doctor.availability}
            </p>
            <p>
              <strong>Phone:</strong> {doctor.contact.phone}
            </p>
            <p>
              <strong>Email:</strong> {doctor.contact.email}
            </p>
            <p>
              <strong>Location:</strong> {doctor.contact.location}
            </p>
          </div>

          <Link
            to="/login"
            className="block mt-4 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition"
          >
            Book Appointment
          </Link>
        </div>
      ))}
    </div>
  );
}
