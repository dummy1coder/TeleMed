import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/Patient/Sidebar";
import { FaUser, FaEnvelope, FaPhone, FaEdit } from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext";
import axios from "../../api/axios";

const Profile = () => {
  const { darkMode } = useContext(ThemeContext);
  const [successMessage, setSuccessMessage] = useState("");
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({name: "", email: "", phone: "", dob: "", gender: "", address: ""})
  const [errors, setErrors] = useState({});
  const [sidebarWidth, setSidebarWidth] = useState(256);

 useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await axios.get("/patient/profile");
      setProfile(response.data);
      setForm(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  fetchProfile();
}, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errs.email = "Enter a valid email.";
    if (!form.phone.match(/^254\d{9}$/))
      errs.phone = "Phone must start with 254 and be 12 digits long.";
    return errs;
  };

  const handleSave = async () => {
  const validationErrors = validate();
  if (Object.keys(validationErrors).length) {
    setErrors(validationErrors);
    return;
  }

  try {
    const response = await axios.put("/patient/update-profile", form);
    setProfile(response.data);
    setForm(response.data);
    setEditMode(false);
    setSuccessMessage("✅ Profile updated successfully.");
    setTimeout(() => setSuccessMessage(""), 3000);
  } catch (error) {
    console.error("Error updating profile:", error);
    setErrors({ general: "Failed to update profile. Try again." });
    setSuccessMessage("");
  }
};


if (!profile || !form) {
  return <div className="flex justify-center items-center min-h-screen text-gray-500">Loading profile...</div>;
}

  return (
    <div className={`flex min-h-screen transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Sidebar onToggle={setSidebarWidth} />
      <div
        className="flex-1 transition-all duration-300 px-6 py-8"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <h1 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300">Profile</h1>

        <div className={`rounded-2xl shadow p-6 max-w-xl mx-auto ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
          {!editMode ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaUser className="text-blue-600" />
                <span className="font-medium">{profile.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-600" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-600" />
                <span>{profile.phone}</span>
              </div>
              <div>
                <p><strong>Date of Birth:</strong> {profile.dob}</p>
                <p><strong>Gender:</strong> {profile.gender}</p>
                <p><strong>Address:</strong> {profile.address}</p>
              </div>

              <button
                onClick={() => setEditMode(true)}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <FaEdit /> Edit Profile
              </button>
            </div>
          ) : (
            <form className="space-y-4">
              {[
                { label: "Full Name", name: "name", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Phone", name: "phone", type: "text" },
                { label: "Date of Birth", name: "dob", type: "date" },
                { label: "Address", name: "address", type: "text" },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium mb-1">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${
                      darkMode
                        ? "bg-gray-700 text-white border-gray-600"
                        : "bg-white text-gray-900 border-gray-300"
                    }`}
                  />
                  {errors[name] && (
                    <p className="text-red-500 text-sm">{errors[name]}</p>
                  )}
                </div>
              ))}

              {/* Gender Select */}
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-white text-gray-900 border-gray-300"
                  }`}
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setForm(profile);
                    setEditMode(false);
                  }}
                  className={`px-4 py-2 rounded ${
                    darkMode
                      ? "bg-gray-600 text-white hover:bg-gray-500"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
                {successMessage && (
                  <p className="text-green-500 text-sm mt-2 text-right">{successMessage}</p>
                  )}

                {errors.general && ( <p className="text-red-500 text-sm mt-2 text-right">{errors.general}</p>)}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
