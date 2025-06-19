import React from "react";

const appointments = [
  { type: "Medical Checkup", date: "March 14 - 10:30 am" },
  { type: "Screening", date: "April 10 - 9:30 am" },
  { type: "Chat Consultation", date: "May 22 - 11:30 am" },
  { type: "Video call Consultation", date: "June 14 - 10:30 am" },
];

const AppointmentHistory = () => (
  <div className="bg-white p-6 rounded-2xl shadow-md">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold">Appointment History</h2>
      <button className="text-sm text-blue-500">View all</button>
    </div>
    <ul>
      {appointments.map((app, idx) => (
        <li key={idx} className="mb-4">
          <p className="font-medium text-gray-700">{app.type}</p>
          <p className="text-sm text-gray-500">{app.date}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default AppointmentHistory;
