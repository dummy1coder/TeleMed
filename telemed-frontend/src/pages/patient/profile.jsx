import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Patient/Sidebar";
import { FaUser, FaEnvelope, FaPhone, FaEdit } from "react-icons/fa";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "254712345678",
    dob: "1995-05-15",
    gender: "Female",
    address: "123 Health St, Nairobi",
  });

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(profile);
  const [errors, setErrors] = useState({});
  const [sidebarWidth, setSidebarWidth] = useState(256);

  useEffect(() => {
    setForm(profile);
    setErrors({});
  }, [editMode, profile]);

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

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setProfile(form);
    setEditMode(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar onToggle={setSidebarWidth} />
      <div
        className="flex-1 transition-all duration-300 px-6 py-8"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Profile</h1>

        <div className="bg-white rounded-2xl shadow p-6 max-w-xl mx-auto">
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
                <p>
                  <strong>Date of Birth:</strong> {profile.dob}
                </p>
                <p>
                  <strong>Gender:</strong> {profile.gender}
                </p>
                <p>
                  <strong>Address:</strong> {profile.address}
                </p>
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
                  <label className="block text-sm font-medium text-gray-600">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
                  />
                  {errors[name] && (
                    <p className="text-red-500 text-sm">{errors[name]}</p>
                  )}
                </div>
              ))}

              {/* Gender Select */}
              <div>
                <label className="block text-sm font-medium text-gray-600">Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
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
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
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
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
