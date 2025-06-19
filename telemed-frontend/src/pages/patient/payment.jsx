import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Patient/Sidebar";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const [appointment, setAppointment] = useState(null);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
  if (location.state) {
    setAppointment(location.state);
  }
}, [location.state]);

  useEffect(() => {
    const stored = localStorage.getItem("pendingAppointment");
    if (stored) setAppointment(JSON.parse(stored));
  }, []);

  const handlePay = async () => {
    setError("");

    if (!phone.match(/^254\d{9}$/)) {
      return setError("Enter a valid Safaricom number starting with 254...");
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/mpesa/stk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          amount: 500,
          description: appointment.title,
        }),
      });

      const result = await res.json();

      alert(result.message || "Payment request sent to your phone.");
    } catch (err) {
      setError("Error initiating payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  

  if (!appointment) {
    return (
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Sidebar onToggle={setSidebarWidth} />
        <div className="ml-64 p-6">Loading appointment...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Sidebar onToggle={setSidebarWidth} />

      <div className="flex-1 transition-all duration-300" style={{ marginLeft: `${sidebarWidth}px` }}>
        <div className="p-6 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
            Pay for Appointment
          </h2>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <p className="mb-4">
              <strong>Appointment:</strong> {appointment.title}
            </p>
            <p className="mb-4">
              <strong>Date & Time:</strong>{" "}
              {new Date(appointment.date).toLocaleString()}
            </p>
            <p className="mb-4">
              <strong>Amount:</strong> KES 500
            </p>

            <label htmlFor="phone" className="block mb-1 font-medium">
              Phone Number (Safaricom):
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="e.g. 254712345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 mb-2 rounded border dark:bg-gray-700 dark:border-gray-600"
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <button
              onClick={handlePay}
              disabled={loading}
              className={`w-full py-2 rounded text-white ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Processing..." : "Pay with Mpesa"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
