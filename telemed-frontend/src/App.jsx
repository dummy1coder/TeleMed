import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import HeroSection from "./components/Shared/herosection";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import AboutUs from "./pages/aboutus";
import HowItWorks from "./pages/howitworks";
import Doctors from "./pages/doctors";
import FAQs from "./pages/faqs";
import Navbar from "./components/Shared/navbar";
import AuthPage from "./components/Shared/AuthPage";
import RegisterPage from "./pages/patient/register";
import DoctorRegisterPage from "./pages/doctor/register"; 
import DoctorDashboard from "./pages/doctor/dashboard";
import DoctorAppointment from "./pages/doctor/appointments";
import DoctorPatient from "./pages/doctor/patients";
import DoctorMedicalRecords from "./pages/doctor/medicalrecords";
import DoctorSettings from "./pages/doctor/settings";
import DoctorChat from "./pages/doctor/chat";
import PatientDashboard from "./pages/patient/dashboard";
import PatientAppointment from "./pages/patient/appointments";
import PatientDoctor from "./pages/patient/doctor";
import PatientChat from "./pages/patient/chat";
import PatientMedicalRecords from "./pages/patient/medicalrecords";
import PatientProfile from "./pages/patient/profile";
import PatientSettings from "./pages/patient/settings";
import { ThemeProvider } from "./context/ThemeContext"; 
import Payment from "./pages/patient/payment";

function AppContent() {
  const location = useLocation();
  const navbarPaths = [
    "/", "/login", "/patient/register", "/doctor/register", "/about-us",
    "/doctors", "/faqs", "/how-it-works"
  ];
  const showNavbar = navbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/patient/register" element={<RegisterPage />} />
        <Route path="/doctor/register" element={<DoctorRegisterPage />} />

        {/* Doctor Protected Routes */}
        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/patients"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorPatient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/medicalrecords"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorMedicalRecords />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/settings"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/chat"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorChat />
            </ProtectedRoute>
          }
        />

        {/* Patient Protected Routes */}
        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/appointments"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/doctor"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientDoctor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/chat"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientChat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/medicalrecords"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientMedicalRecords />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/profile"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/settings"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/payment"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <Payment />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}


function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
