import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../../components/Patient/Sidebar";
import { FaLock, FaUser } from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";
import axios from "../../api/axios";

const AccountSettings = () => {
  const { darkMode } = useContext(ThemeContext);
  const [section, setSection] = useState("password");
  const [sidebarWidth, setSidebarWidth] = useState(256);

  // Password Section State
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [passwordError, setPasswordError] = useState("");

  // Notification State
  const [setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  // Profile Section State
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
  });

  useEffect(() => {
    axios.get("/notification-settings")
      .then((res) => setNotifications(res.data))
      .catch((err) => console.error("Failed to load notification settings:", err));

    axios.get("/patient/profile")
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Failed to load profile:", err));
  }, []);

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    setPasswordError("");
  };

  const handlePasswordSubmit = async () => {
    if (passwords.new !== passwords.confirm) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (!passwords.current || !passwords.new || !passwords.confirm) {
      setPasswordError("All fields are required.");
      return;
    }

    try {
      const response = await axios.put("/patient/change-password", passwords);
      alert(response.data.message);
      setPasswords({ current: "", new: "", confirm: "" });
      setPasswordError("");
    } catch (error) {
      if (error.response?.status === 422) {
        setPasswordError(error.response.data.message || "Validation failed.");
      } else {
        setPasswordError("An error occurred. Try again.");
      }
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async () => {
    try {
      await axios.put("/patient/profile", profile);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className={`flex min-h-screen transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Sidebar onToggle={setSidebarWidth} />

      <div className="flex-1 transition-all duration-300 px-6 py-8" style={{ marginLeft: `${sidebarWidth}px` }}>
        <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">Account Settings</h1>

        {/* Tabs */}
        <div className="flex flex-wrap space-x-4 mb-6">
          {[
            { key: "profile", label: "Update Profile", icon: FaUser },
            { key: "password", label: "Change Password", icon: FaLock },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSection(key)}
              className={`px-4 py-2 rounded flex items-center gap-2 ${
                section === key
                  ? "bg-blue-600 text-white"
                  : darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-white text-gray-800 shadow hover:bg-gray-100"
              }`}
            >
              <Icon /> {label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className={`p-6 rounded-2xl shadow max-w-xl ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
          {section === "profile" && (
            <>
              <h2 className="text-lg font-semibold mb-4">Update Your Profile</h2>
              {["name", "email", "phone", "dob", "gender", "address"].map((field) => (
                <input
                  key={field}
                  type={field === "dob" ? "date" : "text"}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={profile[field] || ""}
                  onChange={handleProfileChange}
                  className={`w-full mb-3 px-4 py-2 border rounded ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              ))}
              <button
                onClick={handleProfileSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save Profile
              </button>
            </>
          )}

          {section === "password" && (
            <>
              <h2 className="text-lg font-semibold mb-4">Update Your Password</h2>
              {["current", "new", "confirm"].map((field, index) => (
                <input
                  key={index}
                  type="password"
                  name={field}
                  placeholder={
                    field === "current"
                      ? "Current Password"
                      : field === "new"
                      ? "New Password"
                      : "Confirm New Password"
                  }
                  value={passwords[field]}
                  onChange={handlePasswordChange}
                  className={`w-full mb-3 px-4 py-2 border rounded ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              ))}
              {passwordError && (
                <p className="text-red-500 text-sm mb-4">{passwordError}</p>
              )}
              <button
                onClick={handlePasswordSubmit}
                disabled={!passwords.current || !passwords.new || !passwords.confirm}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Change Password
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
