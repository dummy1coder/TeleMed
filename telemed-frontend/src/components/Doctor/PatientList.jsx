import React from "react";

const patients = [
  { name: "John Smith", gender: "Male, 45" },
  { name: "Hilda Hunter", gender: "Female, 35" },
  { name: "Michel Bomb", gender: "Male, 25" },
  { name: "Ellen Barton", gender: "Female, 39" },
  { name: "Thad Ennigs", gender: "Male, 55" },
];

const PatientList = () => (
  <div className="bg-white p-6 rounded-2xl shadow-md">
    <h2 className="text-lg font-bold mb-4">Patient List</h2>
    <ul className="space-y-3">
      {patients.map((p, idx) => (
        <li key={idx} className="flex justify-between items-center">
          <div>
            <p className="font-semibold">{p.name}</p>
            <p className="text-sm text-gray-500">{p.gender}</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">⋮</button>
        </li>
      ))}
    </ul>
  </div>
);

export default PatientList;
