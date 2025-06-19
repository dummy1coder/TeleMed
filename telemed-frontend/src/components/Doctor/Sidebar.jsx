import React, { useState } from "react";
import {FaChartPie,FaCalendarAlt,FaUserInjured,FaComments,FaFileMedical,FaCog,FaSignOutAlt,FaBars,FaTimes,} from "react-icons/fa";
import Logout from "../../pages/logout";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(prev => !prev);

  return (
    <div className={`h-screen ${collapsed ? "w-5" : "w-64"} bg-white shadow-lg fixed top-0 left-0 flex flex-col justify-start transition-all duration-300`}>
      {/* Toggle Button */}
      <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && <span className="text-xl font-bold text-blue-600">TeleMed</span>}
        <button onClick={toggleSidebar} className="text-gray-600 hover:text-blue-600">
          {collapsed ? <FaBars /> : <FaTimes />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-4 text-gray-700">
        <Link to="/doctor/dashboard" className="flex items-center gap-3 p-2 rounded hover:bg-blue-100">
          <FaChartPie /> {!collapsed && "Dashboard"}
        </Link>
        <Link to="/doctor/appointments" className="flex items-center gap-3 p-2 rounded hover:bg-blue-100">
          <FaCalendarAlt /> {!collapsed && "Appointments"}
        </Link>
        <Link to="/doctor/patients" className="flex items-center gap-3 p-2 rounded hover:bg-blue-100">
          <FaUserInjured /> {!collapsed && "Patients"}
        </Link>
        <Link to="/doctor/chat" className="flex items-center gap-3 p-2 rounded hover:bg-blue-100">
          <FaComments /> {!collapsed && "Chat"}
        </Link>
        <Link to="/doctor/medicalrecords" className="flex items-center gap-3 p-2 rounded hover:bg-blue-100">
          <FaFileMedical /> {!collapsed && "Medical Records"}
        </Link>
        <Link to="/doctor/settings" className="flex items-center gap-3 p-2 rounded hover:bg-blue-100">
          <FaCog /> {!collapsed && "Settings"}
        </Link>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <Logout>
          <div className="flex items-center gap-2 text-red-500 cursor-pointer hover:text-red-700">
            <FaSignOutAlt /> {!collapsed && "Logout"}
          </div>
        </Logout>
      </div>
    </div>
  );
};

export default Sidebar;
