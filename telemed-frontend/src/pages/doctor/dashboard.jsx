import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Doctor/Sidebar";
import DoctorCard from "../../components/Doctor/DoctorCard";
import AppointmentHistory from "../../components/Doctor/AppointmentHistory";
import PatientList from "../../components/Doctor/PatientList";
import PatientFiles from "../../components/Doctor/PatientFiles";

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [activePatients, setActivePatients] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user?.role === "doctor") {
      setDoctor(user);
      setTodaysAppointments([
        { id: 1, patient: "Jane Doe", time: "10:00 AM" },
        { id: 2, patient: "John Smith", time: "2:00 PM" },
      ]);
      setPendingAppointments([
        { id: 3, patient: "Mark Lee", date: "Tomorrow at 9:00 AM" },
      ]);
      setActivePatients(24);
      setNotifications([
        "Patient Jane uploaded a lab report.",
        "New message from John Smith.",
      ]);
    }
  }, []);

  if (!doctor) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f4f6fa]">
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Dashboard content */}
      <div className="flex-1 p-8 space-y-6 overflow-y-auto">
        <h1 className="text-3xl font-semibold text-gray-800">Welcome, Dr. {doctor.name}</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  <div className="bg-blue-500 text-white p-5 rounded-xl shadow hover:bg-blue-800 transition">
    <h2 className="text-sm">Today's Appointments</h2>
    <p className="text-2xl font-bold">{todaysAppointments.length}</p>
  </div>
  <div className="bg-yellow-500 text-white p-5 rounded-xl shadow hover:bg-yellow-800 transition">
    <h2 className="text-sm">Pending Appointments</h2>
    <p className="text-2xl font-bold">{pendingAppointments.length}</p>
  </div>
  <div className="bg-green-500 text-white p-5 rounded-xl shadow hover:bg-green-800 transition">
    <h2 className="text-sm">Active Patients</h2>
    <p className="text-2xl font-bold">{activePatients}</p>
  </div>
  <div className="bg-purple-500 text-white p-5 rounded-xl shadow hover:bg-purple-800 transition">
    <h2 className="text-sm">Notifications</h2>
    <p className="text-2xl font-bold">{notifications.length}</p>
  </div>
</div>


        {/* Appointments Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Today's Appointments</h2>
            <ul className="space-y-2 text-gray-600">
              {todaysAppointments.length ? (
                todaysAppointments.map((appt) => (
                  <li key={appt.id} className="flex justify-between">
                    <span>{appt.patient}</span>
                    <span>{appt.time}</span>
                  </li>
                ))
              ) : (
                <li>No appointments today.</li>
              )}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Pending Appointments</h2>
            <ul className="space-y-2 text-gray-600">
              {pendingAppointments.length ? (
                pendingAppointments.map((appt) => (
                  <li key={appt.id} className="flex justify-between">
                    <span>{appt.patient}</span>
                    <span>{appt.date}</span>
                  </li>
                ))
              ) : (
                <li>No pending appointments.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Patient and History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AppointmentHistory />
          </div>
          <div>
            <PatientList />
          </div>
        </div>

        {/* Doctor Info and Patient Files */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DoctorCard doctor={doctor} />
          </div>
          <div>
            <PatientFiles />
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Notifications</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {notifications.length ? (
              notifications.map((note, idx) => <li key={idx}>{note}</li>)
            ) : (
              <li>No new notifications.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
