import React, { useState } from "react";
import Sidebar from "../../components/Patient/Sidebar";
import { FaPlus, FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    type: "Consultation",
  });
  const [editId, setEditId] = useState(null);
  

  const appointmentTypes = ["New Patient", "Follow-up", "Consultation"];

  const handleDateClick = (info) => {
    setFormData({ ...formData, date: info.dateStr });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const typeToAmount = {
  "New Patient": 1,
  "Follow-up": 500,
  "Consultation": 700,
};

const handleBook = () => {
  const { date, time, type } = formData;
  if (!date || !time) {
    alert("Please fill in both date and time.");
    return;
  }

  const amount = typeToAmount[type] || 500;

  const newAppointment = {
    id: editId || Date.now(),
    title: `${type} - ${time}`,
    date: `${date}T${time}`,
    extendedProps: { type, amount },
  };

  if (editId) {
    setAppointments((prev) =>
      prev.map((a) => (a.id === editId ? newAppointment : a))
    );
  } else {
    setAppointments((prev) => [...prev, newAppointment]);
  }

  setFormData({ date: "", time: "", type: "Consultation" });
  setEditId(null);

  navigate("/patient/payment", { state: newAppointment });
};


  const handleEventClick = (info) => {
    const id = parseInt(info.event.id);
    if (window.confirm("Do you want to cancel this appointment?")) {
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleEdit = (id) => {
    const appointment = appointments.find((a) => a.id === id);
    if (appointment) {
      const [date, time] = appointment.date.split("T");
      setFormData({ date, time, type: appointment.extendedProps.type });
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      if (editId === id) {
        setFormData({ date: "", time: "", type: "Consultation" });
        setEditId(null);
      }
    }
  };

  const navigate = useNavigate();


  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Sidebar onToggle={setSidebarWidth}/>
      <div className="flex-1 p-6 transition-all duration-300" style={{ marginLeft: `${sidebarWidth}px` }}>
        <div className="flex items-center gap-3 mb-6 text-blue-600 dark:text-blue-400">
          <FaCalendarAlt className="text-2xl" />
          <h2 className="text-2xl font-bold">Manage Appointments</h2>
        </div>

        {/* Form & Table side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Booking Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-bold mb-4">{editId ? "Edit" : "Book"} Appointment</h3>

            <div className="grid gap-4">
              <div>
                <label className="block text-sm mb-1 font-semibold">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded border dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-semibold">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded border dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-semibold">Appointment Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded border dark:bg-gray-700"
                >
                  {appointmentTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleBook}
                className={`${
                  editId ? "bg-yellow-600 hover:bg-yellow-700" : "bg-blue-600 hover:bg-blue-700"
                } text-white px-4 py-2 rounded transition`}
              >
                <FaPlus className="inline mr-2" />
                {editId ? "Update Appointment" : "Book Appointment"}
              </button>
            </div>
          </div>

          {/* Appointment Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Your Appointments</h3>
            {appointments.length === 0 ? (
              <p>No appointments yet.</p>
            ) : (
              <table className="w-full text-left text-sm">
                <thead>
                  <tr>
                    <th className="p-2 border-b">Date</th>
                    <th className="p-2 border-b">Time</th>
                    <th className="p-2 border-b">Type</th>
                    <th className="p-2 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((a) => {
                    const dateTime = new Date(a.date);
                    return (
                      <tr key={a.id} className="border-b">
                        <td className="p-2">{dateTime.toLocaleDateString()}</td>
                        <td className="p-2">
                          {dateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </td>
                        <td className="p-2">{a.extendedProps.type}</td>
                        <td className="p-2 flex gap-2">
                          <button
                            onClick={() => handleEdit(a.id)}
                            className="px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(a.id)}
                            className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Calendar View */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Your Appointment Calendar</h3>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            events={appointments}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            height="auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Appointment;
