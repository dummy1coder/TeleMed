import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios"; 

export default function DoctorRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    specialization: "",
    medical_license_number: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await api.post("/doctor/register", form);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setMessage("Doctor registered and logged in successfully!");

      navigate("/doctor/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response?.data?.errors) {
        const firstError = Object.values(error.response.data.errors)[0][0];
        setMessage(firstError);
      } else if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          Register as a Doctor
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={handleChange}
            className="input w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={handleChange}
            className="input w-full"
          />
          <input
            type="text"
            name="specialization"
            placeholder="Speciality"
            required
            value={form.specialization}
            onChange={handleChange}
            className="input w-full"
          />
          <input
            type="text"
            name="medical_license_number"
            placeholder="Medical License Number"
            required
            value={form.medical_license_number}
            onChange={handleChange}
            className="input w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            className="input w-full"
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            required
            value={form.password_confirmation}
            onChange={handleChange}
            className="input w-full"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
