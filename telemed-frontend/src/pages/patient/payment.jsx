import React, {useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";

const Payment = () => {
  const location = useLocation();
  const appointment = location.state;
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const amount = appointment?.extendedProps?.amount || 500;

  const handlePayment = async () => {
    setStatus("");
    if (!phone.match(/^254\d{9}$/)) {
      return setStatus("Please enter a valid Safaricom number (2547XXXXXXXX).");
    }

    setLoading(true);
    try {
      const response = await axios.post("/mpesa/stkpush", {
        phone_number: phone,
        amount: amount,
        description: appointment?.title || "Appointment Payment",
      });

      if (response.data && response.data.status === "success") {
        setStatus("✅ Payment request sent. Check your phone.");
      } else {
        setStatus("⚠️ Payment request failed.");
      }
    } catch (err) {
      setStatus("❌ Error initiating payment. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 shadow rounded text-gray-900 dark:text-white">
      <h2 className="text-xl font-bold mb-4 text-blue-600">Complete Your Payment</h2>
      <p className="mb-2"><strong>Appointment:</strong> {appointment?.title}</p>
      <p className="mb-4"><strong>Amount:</strong> KES {amount}</p>

      <label className="block mb-1 font-semibold">Phone Number (2547XXXXXXXX):</label>
      <input
        type="tel"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border rounded p-2 mb-4 dark:bg-gray-700"
      />

      <button
        onClick={handlePayment}
        disabled={loading}
        className={`w-full py-2 rounded text-white ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Processing..." : "Pay with M-Pesa"}
      </button>

      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
};

export default Payment;
