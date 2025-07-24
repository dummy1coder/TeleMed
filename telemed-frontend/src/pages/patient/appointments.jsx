import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Patient/Sidebar";
import { FaPlus, FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";

const Appointment = () => {
  const [popupMessage, setPopupMessage] = useState(null);
  const navigate = useNavigate();
  const [isBooking, setIsBooking] = useState(false);
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/doctors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Fetched doctors:", response.data);
        setDoctors(response.data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };

    fetchDoctors();
  }, []);
  const [appointments, setAppointments] = useState([]);
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    type: "Consultation",
    doctor_id: "",
  });
  const [editId, setEditId] = useState(null);

  const location = useLocation();

  const appointmentTypes = ["New Patient", "Follow-up", "Consultation"];
  const typeToAmount = {
    "New Patient": 1,
    "Follow-up": 1,
    "Consultation": 1,
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get("/patient/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const events = response.data.map((appt) => ({
          id: appt.id,
          title: appt.title || appt.type || "Appointment",
          date: `${appt.date}T${appt.time}`,
          extendedProps: appt,
        }));

        setAppointments(events);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    if (location.state?.bookedAppointment) {
      const appt = location.state.bookedAppointment;
      const calendarEvent = {
        id: appt.id || new Date().getTime(),
        title: appt.title || appt.type || "Appointment",
        date: appt.date || appt.start || "",
        extendedProps: {
          ...appt,
          type: appt.type || "Consultation",
        },
      };
      setAppointments((prev) => [...prev, calendarEvent]);
    }
  }, [location.state]);

  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(null), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateClick = (info) => {
    setFormData({ ...formData, date: info.dateStr });
  };

  const handleBook = async () => {
    const { date, time, type, doctor_id } = formData;

    if (!doctor_id || !date || !time || !type) {
      showPopup("Please fill in all required fields: doctor, date, time, and type.");
      return;
    }

    const doctorId = parseInt(doctor_id);
    if (!doctorId) {
      showPopup("Please select a valid doctor.");
      return;
    }

    const selectedDateTime = new Date(`${date}T${time}`);
    if (selectedDateTime < new Date()) {
      showPopup("You cannot book a past date or time.");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      showPopup("You are not logged in. Please log in first.");
      return;
    }

    const amount = typeToAmount[type] || 500;

    setIsBooking(true);
    try {
      const response = await axios.post(
        "/appointments",
        { type, date, time, amount, doctor_id: doctorId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const appointment = response.data;

      navigate("/patient/payment", { state: {appointment: response.data}});

    } catch (error) {
      console.error("Booking error:", error);
      const errorData = error.response?.data;
      const firstError =
        errorData?.errors && typeof errorData.errors === "object"
          ? Object.values(errorData.errors)[0][0]
          : errorData?.message || "Failed to book appointment. Please try again.";
      showPopup(firstError);
    } finally {
      setIsBooking(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this appointment?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Failed to delete appointment:", error);
      showPopup("Failed to delete appointment. Please try again.");
    }
  };

  const handleEventClick = (info) => {
    const id = parseInt(info.event.id);
    handleDelete(id);
  };

  const handleEdit = (id) => {
    const appointment = appointments.find((a) => a.id === id);
    if (appointment) {
      const [date, time] = appointment.date.split("T");
      setFormData({ date, time, type: appointment.extendedProps.type });
      setEditId(id);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {popupMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-red-500 text-white text-lg px-6 py-4 rounded shadow-lg">
            {popupMessage}
          </div>
        </div>
      )}

      <Sidebar onToggle={setSidebarWidth} />
      <div
        className="flex-1 p-6 transition-all duration-300"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <div className="flex items-center gap-3 mb-6 text-blue-600 dark:text-blue-400">
          <FaCalendarAlt className="text-2xl" />
          <h2 className="text-2xl font-bold">Manage Appointments</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-bold mb-4">
              {editId ? "Edit" : "Book"} Appointment
            </h3>

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
              <div>
                <label className="block text-sm mb-1 font-semibold">Select Doctor</label>
                <select
                  name="doctor_id"
                  value={formData.doctor_id || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded border dark:bg-gray-700"
                >
                  <option value="">-- Select a Doctor --</option>
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      Dr. {doc.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleBook}
                disabled={isBooking}
                className={`${isBooking
                  ? "bg-gray-400 cursor-not-allowed"
                  : editId
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "bg-blue-600 hover:bg-blue-700"
                  } text-white px-4 py-2 rounded transition`}
              >
                <FaPlus className="inline mr-2" />
                {isBooking ? "Booking..." : editId ? "Update Appointment" : "Book Appointment"}
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
                          {dateTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="p-2">{a.extendedProps?.type || "Consultation"}</td>
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
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
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
