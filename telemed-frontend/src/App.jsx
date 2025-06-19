import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import HeroSection from "./components/Shared/herosection";
import AboutUs from "./pages/aboutus";
import HowItWorks from "./pages/howitworks";
import Doctors from "./pages/doctors";
import FAQs from "./pages/faqs";
import Navbar from "./components/Shared/navbar";
import LoginPage from "./pages/login";
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
        <Route path="/" element={<HeroSection />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/patient/register" element={<RegisterPage />} />
        <Route path="/doctor/register" element={<DoctorRegisterPage />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/appointments" element={<DoctorAppointment />} />
        <Route path="/doctor/patients" element={<DoctorPatient />} />
        <Route path="/doctor/medicalrecords" element={<DoctorMedicalRecords />} />
        <Route path="/doctor/settings" element={<DoctorSettings />} />
        <Route path="/doctor/chat" element={<DoctorChat />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/appointments" element={<PatientAppointment />} />
        <Route path="/patient/doctor" element={<PatientDoctor />} />
        <Route path="/patient/chat" element={<PatientChat />} />
        <Route path="/patient/medicalrecords" element={<PatientMedicalRecords />} />
        <Route path="/patient/profile" element={<PatientProfile />} />
        <Route path="/patient/settings" element={<PatientSettings />} />
         <Route path="/patient/payment" element={<Payment />} />
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
