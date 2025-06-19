import React, { useState } from "react";

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex">
        {/* Left Side */}
        <div className={`w-1/2 p-8 transition-all duration-500 ${isRegistering ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}>
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">Welcome Back!</h2>
          <p className="mb-6 text-gray-600">Login to your account</p>
          <form className="space-y-4">
            <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded" />
            <input type="password" placeholder="Password" className="w-full p-3 border border-gray-300 rounded" />
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">Login</button>
          </form>
        </div>

        {/* Right Side - Register */}
        <div className={`w-1/2 p-8 transition-all duration-500 ${isRegistering ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 absolute"}`}>
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">Create Account</h2>
          <p className="mb-6 text-gray-600">Join us today!</p>
          <form className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full p-3 border border-gray-300 rounded" />
            <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded" />
            <input type="password" placeholder="Password" className="w-full p-3 border border-gray-300 rounded" />
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Register</button>
          </form>
        </div>

        {/* Toggle Panel */}
        <div className="absolute top-0 right-0 h-full w-1/2 flex flex-col items-center justify-center bg-indigo-600 text-white transition-all duration-500">
          <div className="text-center px-6">
            <h2 className="text-2xl font-bold">{isRegistering ? "Already have an account?" : "New here?"}</h2>
            <p className="mt-2 mb-6">{isRegistering ? "Login to access your account" : "Sign up and get started"}</p>
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="bg-white text-indigo-600 font-semibold px-6 py-2 rounded hover:bg-gray-100 transition"
            >
              {isRegistering ? "Login" : "Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
