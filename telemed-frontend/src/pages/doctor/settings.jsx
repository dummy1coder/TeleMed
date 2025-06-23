import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Doctor/Sidebar";

const DoctorSettings = () => {
  const [doctorInfo, setDoctorInfo] = useState({
    name: "",
    email: "",
    specialization: "",
    phone: "",
    appointmentTime: "",
    services: "",
    profile: "",
    licenseNumber: "",
    profileImage: null,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    axios
      .get("/api/doctor/profile", { withCredentials: true })
      .then((res) => {
        setDoctorInfo({
          ...res.data,
          profileImage: null, 
        });
      })
      .catch((err) => console.error("Failed to fetch doctor profile", err));
  }, []);

  const handleInfoChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setDoctorInfo({ ...doctorInfo, profileImage: files[0] });
    } else {
      setDoctorInfo({ ...doctorInfo, [name]: value });
    }
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
  const formData = new FormData();
  Object.entries(doctorInfo).forEach(([key, value]) => {
    if (value !== null) formData.append(key, value);
  });

  try {
    const res = await axios.post('/api/doctor/profile/update', formData, {
  withCredentials: true,
  headers: { 'Content-Type': 'multipart/form-data' },
});

    alert(res.data.message);
  } catch (err) {
    console.error(err);
    alert("Failed to update profile");
  }
};

const handleChangePassword = async () => {
  try {
    const res = await axios.post('/api/doctor/change-password', {
  current: passwords.current,
  new: passwords.new,
  new_confirmation: passwords.confirm,
}, { withCredentials: true });


    alert(res.data.message);
  } catch (err) {
    console.error(err);
    alert("Failed to change password");
  }
};



  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 ml-5 md:ml-64 transition-all duration-300">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

        {/* Profile Information */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={doctorInfo.name}
              onChange={handleInfoChange}
              placeholder="Full Name"
              className="border px-4 py-2 rounded w-full"
            />
            <input
              type="email"
              name="email"
              value={doctorInfo.email}
              onChange={handleInfoChange}
              placeholder="Email"
              className="border px-4 py-2 rounded w-full"
            />
            <input
              type="text"
              name="specialization"
              value={doctorInfo.specialization}
              onChange={handleInfoChange}
              placeholder="Specialization"
              className="border px-4 py-2 rounded w-full"
            />
            <input
              type="text"
              name="phone"
              value={doctorInfo.phone}
              onChange={handleInfoChange}
              placeholder="Phone Number"
              className="border px-4 py-2 rounded w-full"
            />
            <input
              type="time"
              name="appointmentTime"
              value={doctorInfo.appointmentTime}
              onChange={handleInfoChange}
              className="border px-4 py-2 rounded w-full"
            />
            <input
              type="text"
              name="licenseNumber"
              value={doctorInfo.licenseNumber}
              onChange={handleInfoChange}
              placeholder="Medical License Number"
              className="border px-4 py-2 rounded w-full"
            />
            <input
              type="text"
              name="services"
              value={doctorInfo.services}
              onChange={handleInfoChange}
              placeholder="Services Offered"
              className="border px-4 py-2 rounded w-full"
            />
            <textarea
              name="profile"
              value={doctorInfo.profile}
              onChange={handleInfoChange}
              placeholder="Doctor Bio / Profile"
              rows="4"
              className="border px-4 py-2 rounded w-full md:col-span-2"
            />
            <input
              type="file"
              name="profileImage"
              onChange={handleInfoChange}
              accept="image/*"
              className="border px-4 py-2 rounded w-full"
            />
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Change Password</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="password"
              name="current"
              value={passwords.current}
              onChange={handlePasswordChange}
              placeholder="Current Password"
              className="border px-4 py-2 rounded w-full"
            />
            <input
              type="password"
              name="new"
              value={passwords.new}
              onChange={handlePasswordChange}
              placeholder="New Password"
              className="border px-4 py-2 rounded w-full"
            />
            <input
              type="password"
              name="confirm"
              value={passwords.confirm}
              onChange={handlePasswordChange}
              placeholder="Confirm Password"
              className="border px-4 py-2 rounded w-full"
            />
          </div>
          <button
            onClick={handleChangePassword}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Change Password
          </button>
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default DoctorSettings;
