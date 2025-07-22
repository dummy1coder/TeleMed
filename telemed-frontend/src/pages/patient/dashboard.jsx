import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/Patient/Sidebar";
import {FaCalendarAlt,FaHeartbeat,FaLightbulb,FaMoon,FaSun,} from "react-icons/fa";
import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,} from "recharts";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "react-calendar/dist/Calendar.css";
import { ThemeContext } from "../../context/ThemeContext";

const PatientDashboard = () => {
  const [patient, setPatient] = useState(null);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [appointments, setAppointments] = useState([]);
  const [sidebarWidth, setSidebarWidth] = useState(256);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user?.role === "patient") {
      setPatient(user);
    }

    setAppointments([
      {
        id: 1,
        title: "Appointment with Dr. Smith",
        date: "2025-06-15",
        extendedProps: { time: "10:00 AM", doctor: "Dr. Smith" },
      },
      {
        id: 2,
        title: "Appointment with Dr. Adams",
        date: "2025-06-20",
        extendedProps: { time: "2:30 PM", doctor: "Dr. Adams" },
      },
    ]);
  }, []);

  const tips = [
    "Drink 8 glasses of water a day",
    "Walk 30 minutes daily",
    "Get 7–8 hours of sleep",
  ];

  const healthData = [
    { date: "Jun 1", value: 78 },
    { date: "Jun 3", value: 82 },
    { date: "Jun 5", value: 76 },
    { date: "Jun 7", value: 85 },
    { date: "Jun 9", value: 80 },
  ];

  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;
    const dayAppointments = appointments.filter((a) => a.date === clickedDate);
    if (dayAppointments.length) {
      alert(
        dayAppointments
          .map((a) => `${a.extendedProps.doctor} at ${a.extendedProps.time}`)
          .join("\n")
      );
    } else {
      alert("No appointments on this date.");
    }
  };

  if (!patient) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Sidebar onToggle={setSidebarWidth} />

      <div
        className="flex-1 p-6 transition-all duration-300"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleDarkMode}
            className="flex items-center px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? (
              <>
                <FaSun className="mr-2" /> Light Mode
              </>
            ) : (
              <>
                <FaMoon className="mr-2" /> Dark Mode
              </>
            )}
          </button>
        </div>

        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-6">
          Welcome, {patient.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5">
            <div className="flex items-center gap-3 mb-4 text-blue-600 dark:text-blue-400">
              <FaCalendarAlt className="text-2xl" />
              <h2 className="text-lg font-semibold">Appointment Calendar</h2>
            </div>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={appointments}
              dateClick={handleDateClick}
              height="auto"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5">
            <div className="flex items-center gap-3 mb-4 text-green-600 dark:text-green-400">
              <FaHeartbeat className="text-2xl" />
              <h2 className="text-lg font-semibold">Recent Health Chart</h2>
            </div>
            <div className="h-40 flex items-center justify-center text-gray-400">
              <ResponsiveContainer width="100%" height={160}>
                <LineChart
                  data={healthData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="date" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#16a34a"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5">
            <div className="flex items-center gap-3 mb-4 text-yellow-600 dark:text-yellow-400">
              <FaLightbulb className="text-2xl" />
              <h2 className="text-lg font-semibold">Health Tips</h2>
            </div>
            <ul className="list-disc ml-5 space-y-2">
              {tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;