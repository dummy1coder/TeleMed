import React, { useState, useEffect } from "react";
import {
  FaChartPie,
  FaCalendarAlt,
  FaComments,
  FaFileMedical,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Logout from "../../pages/logout";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ onToggle }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (onToggle) {
      onToggle(collapsed ? 64 : 256);
    }
  }, [collapsed, onToggle]);

  const toggleSidebar = () => {
    setCollapsed((prev) => {
      const newState = !prev;
      if (onToggle) {
        onToggle(newState ? 64 : 256);
      }
      return newState;
    });
  };

  const links = [
    { to: "/patient/dashboard", icon: <FaChartPie />, label: "Dashboard" },
    { to: "/patient/appointments", icon: <FaCalendarAlt />, label: "Appointments" },
    { to: "/patient/chat", icon: <FaComments />, label: "Chat" },
    { to: "/patient/medicalrecords", icon: <FaFileMedical />, label: "Medical Records" },
    { to: "/patient/profile", icon: <FaFileMedical />, label: "Profile" },
    { to: "/patient/settings", icon: <FaCog />, label: "Settings" },
  ];

  return (
    <div
      className={`h-screen bg-white shadow-lg fixed top-0 left-0 flex flex-col transition-all duration-300 z-50`}
      style={{ width: collapsed ? "64px" : "256px" }}
    >
      {/* Top Header */}
      <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && <span className="text-xl font-bold text-blue-600">TeleMed</span>}
        <button onClick={toggleSidebar} className="text-gray-600 hover:text-blue-600 text-lg">
          {collapsed ? <FaBars /> : <FaTimes />}
        </button>
      </div>

      {/* Navigation */}
      <div className="p-4 flex flex-col gap-2 text-gray-700">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 p-3 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-700 border-l-4 border-blue-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="text-lg">{link.icon}</div>
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}

        {/* Logout */}
        <Logout>
          <div
            className={`flex items-center gap-3 p-3 rounded-md transition-all duration-200 cursor-pointer hover:bg-gray-100 ${
              location.pathname === "/logout"
                ? "bg-blue-100 text-blue-700 border-l-4 border-blue-600 font-semibold"
                : ""
            }`}
          >
            <div className="text-lg">
              <FaSignOutAlt />
            </div>
            {!collapsed && <span>Logout</span>}
          </div>
        </Logout>
      </div>
    </div>
  );
};

export default Sidebar;
