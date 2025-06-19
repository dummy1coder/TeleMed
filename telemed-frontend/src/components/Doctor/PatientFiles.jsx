import React from "react";

const files = [
  { name: "Prescription.pdf" },
  { name: "X-ray report.pdf" },
  { name: "Checkup.pdf" },
];

const PatientFiles = () => (
  <div className="bg-white p-6 rounded-2xl shadow-md">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold">Patient File</h2>
      <button className="text-sm text-blue-500">View all</button>
    </div>
    <ul className="space-y-2">
      {files.map((file, idx) => (
        <li key={idx} className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-red-500">📄</span>
            <p className="text-gray-700">{file.name}</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">⋮</button>
        </li>
      ))}
    </ul>
  </div>
);

export default PatientFiles;
