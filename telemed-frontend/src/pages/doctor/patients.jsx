import React, { useState, useEffect } from "react";
import { FaSearch, FaUser, FaEnvelope } from "react-icons/fa";
import Sidebar from "../../components/Doctor/Sidebar";

const DoctorPatient = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setPatients([
      { id: 1, name: "John Doe", age: 45, gender: "Male", condition: "Diabetes" },
      { id: 2, name: "Jane Smith", age: 37, gender: "Female", condition: "Hypertension" },
      { id: 3, name: "Mark Johnson", age: 29, gender: "Male", condition: "Asthma" },
    ]);
  }, []);

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 ml-5 md:ml-64 transition-all duration-300">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Patients</h1>

        <div className="flex items-center mb-6">
          <div className="relative w-full max-w-md">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all"
            >
              <h2 className="text-lg font-semibold text-blue-700">{patient.name}</h2>
              <p className="text-sm text-gray-600">Age: {patient.age}</p>
              <p className="text-sm text-gray-600">Gender: {patient.gender}</p>
              <p className="text-sm text-gray-600">Condition: {patient.condition}</p>

              <div className="mt-4 flex gap-3">
                <button className="flex items-center px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
                  <FaUser className="mr-1" /> View Profile
                </button>
                <button className="flex items-center px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600">
                  <FaEnvelope className="mr-1" /> Message
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <p className="text-gray-500 mt-4">No patients found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorPatient;
