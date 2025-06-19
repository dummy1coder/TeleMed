import React, { useState, useEffect } from "react";
import { FaSearch, FaFileDownload, FaEye } from "react-icons/fa";
import Sidebar from "../../components/Doctor/Sidebar";

const DoctorMedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setRecords([
      { id: 1, patient: "John Doe", date: "2025-06-01", summary: "Routine Checkup", file: "record1.pdf" },
      { id: 2, patient: "Jane Smith", date: "2025-05-27", summary: "Follow-up on hypertension", file: "record2.pdf" },
      { id: 3, patient: "Mark Johnson", date: "2025-05-15", summary: "Asthma treatment update", file: "record3.pdf" },
    ]);
  }, []);

  const filteredRecords = records.filter((r) =>
    r.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 ml-5 md:ml-64 transition-all duration-300">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Medical Records</h1>

        <div className="mb-6 max-w-md relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by patient name..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-50 text-left">
              <tr>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Summary</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} className="border-t">
                  <td className="px-4 py-2">{record.patient}</td>
                  <td className="px-4 py-2">{record.date}</td>
                  <td className="px-4 py-2">{record.summary}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm">
                      <FaEye /> View
                    </button>
                    <button className="flex items-center gap-1 text-green-600 hover:text-green-800 text-sm">
                      <FaFileDownload /> Download
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-4 py-6 text-gray-500 text-center">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorMedicalRecords;
