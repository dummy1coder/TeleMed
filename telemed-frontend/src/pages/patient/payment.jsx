import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Patient/Sidebar";
import axios from "../../api/axios";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const location = useLocation();
  const appointment = location.state;
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const amount = appointment?.extendedProps?.amount ?? appointment?.amount ?? 500;
  if (!amount) {
    return setStatus("❗ Payment amount not found. Please go back and reselect the appointment.");
  }

  const handlePayment = async () => {
    setStatus("");
    let formattedPhone = phone.trim();

// Handle formats like: 07XXXXXXXX
if (formattedPhone.startsWith("07") && formattedPhone.length === 10) {
  formattedPhone = "254" + formattedPhone.slice(1);
}

// Handle formats like: 7XXXXXXXX (no leading 0)
if (formattedPhone.length === 9 && formattedPhone.startsWith("7")) {
  formattedPhone = "254" + formattedPhone;
}

// Final validation
if (!formattedPhone.match(/^2547\d{8}$/)) {
  return setStatus("❗ Please enter a valid Safaricom number (e.g. 0712345678 or 712345678).");
}


    setLoading(true);
    try {
      const response = await axios.post("/mpesa/stkpush", {
        phone_number: formattedPhone,
        amount: amount,
        description: appointment?.title || "Appointment Payment",
      });

      if (response.data?.status === "success") {
        setStatus("Payment request sent.");
        setTimeout(() => {
          navigate("/appointments", {
            state: {
              bookedAppointment: appointment,
            },
          });
        }, 1500);
      } else {
        setStatus("Payment request failed.");
      }

    } catch (err) {
      setStatus("Error initiating payment. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full z-10">
        <Sidebar onToggle={setSidebarWidth} />
      </div>

      <div
        className="flex-1 transition-all duration-300 p-6"
        style={{ marginLeft: `${sidebarWidth}px` }}
      ></div>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl w-full max-w-4xl grid md:grid-cols-2 gap-8 p-8">
        
        {/* Appointment Summary */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-blue-600">Complete Your Payment</h2>
          <div className="text-sm">
            <p><strong>Appointment:</strong> {appointment?.title}</p>
            <p><strong>Amount:</strong> <span className="text-green-600 font-semibold">KES {amount}</span></p>
            <p><strong>Phone Number:</strong> <span className="text-gray-600">(2547XXXXXXXX)</span></p>
          </div>
        </div>

        {/* Payment Form */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold">Phone Number</label>
          <input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border dark:border-gray-600 rounded p-2 dark:bg-gray-700"
          />

          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full py-2 rounded text-white transition font-semibold ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Processing..." : "Pay with M-Pesa"}
          </button>

          {status && (
            <p
              className={`text-sm mt-2 ${
                status.includes("✅") ? "text-green-600" :
                status.includes("❌") ? "text-red-600" :
                "text-yellow-600"
              }`}
            >
              {status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
