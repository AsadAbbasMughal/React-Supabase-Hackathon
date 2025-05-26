import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import AdminDashboard from "./pages/AdminPannel/AdminDashboard";
import Rejected from "./pages/AdminPannel/Rejected.jsx";
import Approved from "./pages/AdminPannel/Approved.jsx";
import PendingRequests from "./pages/AdminPannel/PendingRequests.jsx";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import UserDashboard from "./pages/UserDashboard.jsx";
import Hero from "./components/Hero.jsx";
import EventView from "./pages/EventView.jsx";
import NotFound from "./pages/NotFound.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<App />} />

        
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/event/:id" element={<EventView />} />



        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/rejected-loan" element={<Rejected />} />
        <Route path="/approved-loan" element={<Approved />} />
        <Route path="/pending" element={<PendingRequests />} />
       
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    
);

