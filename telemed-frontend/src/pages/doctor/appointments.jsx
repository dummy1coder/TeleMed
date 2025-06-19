import React from "react";
import Sidebar from "../../components/Doctor/Sidebar";

const appointments = [
  {
    id: 1,
    patient: "John Doe",
    date: "2025-06-10",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    patient: "Jane Smith",
    date: "2025-06-11",
    time: "2:30 PM",
    status: "Pending",
  },
  {
    id: 3,
    patient: "Michael Johnson",
    date: "2025-06-12",
    time: "4:00 PM",
    status: "Cancelled",
  },
];

const DoctorAppointment = () => {
  return (
    <div className="min-h-screen bg-gray-100" >
        <Sidebar />
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Appointments</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm text-gray-700">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="p-3">Patient</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{appt.patient}</td>
                  <td className="p-3">{appt.date}</td>
                  <td className="p-3">{appt.time}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        appt.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : appt.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;
