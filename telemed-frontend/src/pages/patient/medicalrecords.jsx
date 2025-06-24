import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Patient/Sidebar";
import { FaFileMedical, FaPrescriptionBottleAlt, FaDownload } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const MedicalRecords = () => {
  const { darkMode } = useContext(ThemeContext);
  const [records, setRecords] = useState([]);
  const [activeTab, setActiveTab] = useState("reports");
  const [sidebarWidth, setSidebarWidth] = useState(256);

  useEffect(() => {
    setRecords([
      {
        id: 1,
        type: "report",
        title: "Blood Test Results",
        date: "2025-05-10",
        description: "Complete blood count results including WBC and RBC levels.",
        fileUrl: "/files/blood-test.pdf",
      },
      {
        id: 2,
        type: "report",
        title: "MRI Scan",
        date: "2025-04-22",
        description: "Brain MRI scan results with neurologist's interpretation.",
        fileUrl: "/files/mri-scan.pdf",
      },
      {
        id: 3,
        type: "prescription",
        title: "Hypertension Medication",
        date: "2025-05-12",
        description: "Prescription for Amlodipine 5mg once daily.",
        fileUrl: "/files/prescription-hypertension.pdf",
      },
      {
        id: 4,
        type: "prescription",
        title: "Antibiotic Course",
        date: "2025-04-15",
        description: "Prescription for Amoxicillin 500mg 3 times a day for 7 days.",
        fileUrl: "/files/prescription-antibiotics.pdf",
      },
    ]);
  }, []);

  const filteredRecords = records.filter((record) => record.type === activeTab);

  return (
    <div className={`flex min-h-screen transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full z-10">
        <Sidebar onToggle={setSidebarWidth} />
      </div>

      {/* Main Content */}
      <div
        className="flex-1 transition-all duration-300 p-6"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Medical Records</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("reports")}
            className={`px-4 py-2 rounded ${
              activeTab === "reports"
              ? darkMode
              ? "bg-blue-600 text-white"
              : "bg-blue-600 text-white"
              : darkMode
              ? "bg-gray-700 text-blue-400 border border-blue-400"
              : "bg-white text-blue-600 border border-blue-600"
            }`}

          >
            Reports
          </button>
          <button
            onClick={() => setActiveTab("prescription")}
            className={`px-4 py-2 rounded ${
              activeTab === "prescription"
              ? darkMode
              ? "bg-blue-600 text-white"
              : "bg-blue-600 text-white"
              : darkMode
              ? "bg-gray-700 text-blue-400 border border-blue-400"
              : "bg-white text-blue-600 border border-blue-600"
            }`}
          >
            Prescriptions
          </button>
        </div>

        {/* Record List */}
        {filteredRecords.length === 0 ? (
          <p className="text-gray-500">No {activeTab} records found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                className={`rounded-xl shadow p-5 space-y-3 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
              >
                <div className="flex items-center gap-3 text-blue-600">
                  {record.type === "prescription" ? (
                    <FaPrescriptionBottleAlt className="text-2xl text-green-600" />
                  ) : (
                    <FaFileMedical className="text-2xl" />
                  )}
                  <h2 className="text-lg font-semibold">{record.title}</h2>
                </div>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{record.date}</p>
                <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>{record.description}</p>
                <a href={record.fileUrl} download
                className={`inline-flex items-center gap-2 text-sm hover:underline ${
                  darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                  }`}
                  >
                    <FaDownload /> Download
                    </a>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
