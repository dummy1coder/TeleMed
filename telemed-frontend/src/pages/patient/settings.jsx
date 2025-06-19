import React, { useState } from "react";
import Sidebar from "../../components/Patient/Sidebar";
import { FaLock, FaBell, FaShieldAlt } from "react-icons/fa";

const AccountSettings = () => {
  const [section, setSection] = useState("password");
  const [sidebarWidth, setSidebarWidth] = useState(256);

  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [passwordError, setPasswordError] = useState("");
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });
  const [privacy, setPrivacy] = useState({
    showProfile: true,
    shareData: false,
  });

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    setPasswordError("");
  };

  const handlePasswordSubmit = () => {
    if (passwords.new !== passwords.confirm) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (!passwords.current || !passwords.new || !passwords.confirm) {
      setPasswordError("All fields are required.");
      return;
    }

    // API call to update password would go here

    setPasswords({ current: "", new: "", confirm: "" });
    setPasswordError("");
    alert("Password updated successfully.");
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({ ...notifications, [name]: checked });
  };

  const handlePrivacyChange = (e) => {
    const { name, checked } = e.target;
    setPrivacy({ ...privacy, [name]: checked });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar onToggle={setSidebarWidth} />
      <div
        className="flex-1 transition-all duration-300 px-6 py-8"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Account Settings</h1>

        {/* Tabs */}
        <div className="flex flex-wrap space-x-4 mb-6">
          {[
            { key: "password", label: "Change Password", icon: FaLock },
            { key: "notifications", label: "Notifications", icon: FaBell },
            { key: "privacy", label: "Privacy", icon: FaShieldAlt },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSection(key)}
              className={`px-4 py-2 rounded flex items-center gap-2 ${
                section === key
                  ? "bg-blue-600 text-white"
                  : "bg-white shadow hover:bg-gray-100"
              }`}
            >
              <Icon /> {label}
            </button>
          ))}
        </div>

        {/* Section Display */}
        <div className="bg-white p-6 rounded-2xl shadow max-w-xl">
          {section === "password" && (
            <>
              <h2 className="text-lg font-semibold mb-4">Update Your Password</h2>
              <input
                type="password"
                name="current"
                placeholder="Current Password"
                value={passwords.current}
                onChange={handlePasswordChange}
                className="w-full mb-3 px-4 py-2 border rounded"
              />
              <input
                type="password"
                name="new"
                placeholder="New Password"
                value={passwords.new}
                onChange={handlePasswordChange}
                className="w-full mb-3 px-4 py-2 border rounded"
              />
              <input
                type="password"
                name="confirm"
                placeholder="Confirm New Password"
                value={passwords.confirm}
                onChange={handlePasswordChange}
                className="w-full mb-4 px-4 py-2 border rounded"
              />
              {passwordError && (
                <p className="text-red-600 text-sm mb-4">{passwordError}</p>
              )}
              <button
                onClick={handlePasswordSubmit}
                disabled={
                  !passwords.current || !passwords.new || !passwords.confirm
                }
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Change Password
              </button>
            </>
          )}

          {section === "notifications" && (
            <>
              <h2 className="text-lg font-semibold mb-4">
                Manage Notification Preferences
              </h2>
              {[
                { name: "email", label: "Email Notifications" },
                { name: "sms", label: "SMS Notifications" },
                { name: "push", label: "Push Notifications" },
              ].map(({ name, label }) => (
                <label key={name} className="flex items-center space-x-3 mb-3">
                  <input
                    type="checkbox"
                    name={name}
                    checked={notifications[name]}
                    onChange={handleNotificationChange}
                    className="w-5 h-5"
                  />
                  <span>{label}</span>
                </label>
              ))}
              <button
                onClick={() => alert("Notification preferences saved.")}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save Preferences
              </button>
            </>
          )}

          {section === "privacy" && (
            <>
              <h2 className="text-lg font-semibold mb-4">
                Adjust Privacy Settings
              </h2>
              {[
                {
                  name: "showProfile",
                  label: "Allow others to view my profile",
                },
                {
                  name: "shareData",
                  label: "Share my health data with doctors",
                },
              ].map(({ name, label }) => (
                <label key={name} className="flex items-center space-x-3 mb-3">
                  <input
                    type="checkbox"
                    name={name}
                    checked={privacy[name]}
                    onChange={handlePrivacyChange}
                    className="w-5 h-5"
                  />
                  <span>{label}</span>
                </label>
              ))}
              <button
                onClick={() => alert("Privacy settings updated.")}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save Privacy Settings
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
