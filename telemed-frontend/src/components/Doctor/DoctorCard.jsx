import React from "react";

const DoctorCard = ({ doctor }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md">
    <div className="flex flex-col items-center">
      <img src="https://via.placeholder.com/150" alt="doctor" className="rounded-full w-24 h-24 mb-4" />
      <h3 className="text-xl font-semibold">Dr. {doctor.name}</h3>
      <p className="text-gray-500">{doctor.specialization || "General Practitioner"}</p>
      <div className="mt-4 w-full bg-gray-100 rounded-xl p-4 text-sm text-gray-600">
        <p><strong>Email:</strong> {doctor.email}</p>
        <p><strong>Role:</strong> {doctor.role}</p>
        {doctor.medical_license_number && <p><strong>License #:</strong> {doctor.medical_license_number}</p>}
      </div>
    </div>
  </div>
);

export default DoctorCard;