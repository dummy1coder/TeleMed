import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/herosection";
import Login from "./pages/login";
import AboutUs from "./pages/aboutus";
import Doctors from "./pages/doctors";
import FAQs from "./pages/faqs";
import Appointment from "./pages/appointments";
import Navbar from "./components/navbar";
import LoginPage from "./pages/login"; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
