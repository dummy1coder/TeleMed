import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api/axios";

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isRegistering = location.pathname === "/patient/register";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (isRegistering) {
        await api.post("/patient/register", {
          name: form.name,
          email: form.email,
          password: form.password,
          password_confirmation: form.password_confirmation,
        });
        setMessage("Registered successfully! You can now log in.");
      } else {
        console.log("Sending:", {
          email: form.email,
          password: form.password,
          role: form.role,});

        const response = await api.post("/login", {
          email: form.email,
          password: form.password,
          role: form.role,
        });

        console.log("Login API response:", response.data);

        const { token, user } = response.data;

        if (token && user?.id && user?.role) {
          localStorage.setItem("token", token);
          localStorage.setItem("authToken", token);
          localStorage.setItem("role", user.role);
          localStorage.setItem("currentUser", JSON.stringify(user));
          setMessage("Logged in successfully!");

          if (user.role === "admin") {
            navigate("/admin/dashboard");
          } else if (user.role === "doctor") {
            navigate("/doctor/dashboard");
          } else {
            navigate("/patient/dashboard");
          }
        } else {
          setMessage("Login failed: No token or user details returned");
        }
      }
    } catch (error) {
      console.error("FULL ERROR:", error);
      console.error("RESPONSE:", error?.response);

      if (error?.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        const firstError = Object.values(validationErrors)[0][0];
        setMessage(firstError);
      } else if (error?.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Unknown error: " + error.message);
      }
    }
  };

  const switchRoute = () => {
    navigate(isRegistering ? "/login" : "/patient/register");
    setForm({ name: "", email: "", password: "", password_confirmation: "", role: "",});
    setMessage("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500">
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <div className="flex flex-col items-center space-y-6">
            <img src="/logo192.png" alt="Logo" className="w-20 h-20" />

            <p className="text-sm font-bold text-gray-600">
              {isRegistering
                ? "Create your Telemed Account"
                : "WELCOME BACK TO TELEMED"}
            </p>

            <form className="w-full flex flex-col space-y-4" onSubmit={handleSubmit}>
              {isRegistering && (
                <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="input p-2 border"
                required
                />
                )}
                <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="input p-2 border"
                required
                />
                <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="input p-2 border"
                required
                />
                {isRegistering && (
                  <input
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirm Password"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  className="input p-2 border"
                  required
                  />
                  )}
                  
  {!isRegistering && (
    <select
  name="role"
  value={form.role}
  onChange={handleChange}
  className="p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
  required
>
  <option value="" disabled>Select Role</option>
  <option value="patient">Patient</option>
  <option value="doctor">Doctor</option>
</select>

  )}

  <button
    type="submit"
    className="btn bg-blue-600 text-white py-2 rounded"
  >
    {isRegistering ? "REGISTER" : "LOG IN"}
  </button>
</form>


            {message && (
              <div className="text-sm text-center text-red-500">{message}</div>
            )}

            {!isRegistering && (
              <a href="/" className="text-sm text-black-500 hover:underline">
                Forgot password?
              </a>
            )}

            <div className="flex items-center justify-between w-full pt-4 ">
              <span className="text-sm">
                {isRegistering
                ? "Already have an account?"
                : "Don't have an account?"}
                </span>
                <button className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={switchRoute}
                >
                  {isRegistering ? "LOGIN" : "REGISTER"}
                  </button>
                  </div>
                  </div>
                  </div>

        <div className="w-1/2 p-10 text-white bg-gradient-to-br from-blue-400 to-teal-300 flex flex-col justify-center rounded-tr-lg rounded-br-lg transition-all duration-500">
          <h2 className="text-2xl font-bold mb-4">
            {isRegistering
              ? "Telemed: Healthcare from Home"
              : "We care about your Health"}
          </h2>
          <p className="text-sm leading-relaxed">
            {isRegistering
              ? "Our platform allows doctors and patients to connect virtually. Book appointments, manage health records, and get expert care."
              : "Log in to access your dashboard, upcoming consultations, prescriptions, and more — all in one place."}
          </p>
        </div>
      </div>
    </div>
  );
}
