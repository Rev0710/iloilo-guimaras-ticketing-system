import React from "react";
import { Routes, Route } from "react-router-dom";
import Trips from "./pages/Trips";
import Dashboard from "./pages/passenger/Dashboard";
import BookTrip from "./pages/passenger/BookTrip";
import Payment from "./pages/passenger/Payment";
import MayaPayment from "./pages/passenger/MayaPayment";
import Confirmation from "./pages/passenger/confirmation";
import Bookings from "./pages/Bookings";
import LandingPage from "./pages/public/LandingPage";
import Login from "./pages/passenger/Login";
import Register from "./pages/passenger/Register";
import AdminRegister from "./pages/Admin/AdminRegister";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Profile from "./pages/passenger/Profile";

function App() {
    return (
        <Routes>

            {/* STUDENT LOGIN */}
            <Route
                path="/login"
                element={<Login />}
            />

            <Route
            path="/"
            element={<LandingPage />}
            />

            {/* STUDENT REGISTRATION */}
            <Route
                path="/register"
                element={<Register />}
            />

            {/* DASHBOARD */}
            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

            {/* BOOKINGS */}
            <Route
                path="/bookings"
                element={<Bookings />}
            />

            {/* BOOK TRIP */}
            <Route
                path="/book-trip"
                element={<BookTrip />}
            />

            {/* PAYMENT */}
            <Route
                path="/payment"
                element={<Payment />}
            />

            {/* Maya PAYMENT */}
            <Route
                path="/maya-payment"
                element={<MayaPayment />}
            />

            {/* CONFIRMATION */}
            <Route
                path="/confirmation"
                element={<Confirmation />}
            />
<Route
    path="/admin-register"
    element={<AdminRegister />}
/>

<Route
    path="/admin-login"
    element={<AdminLogin />}
/>

<Route
    path="/admin-dashboard"
    element={<AdminDashboard />}
/>
 <Route
        path="/trips"
        element={<Trips />}
    />

    <Route
    path="/profile"
    element={<Profile />}
/>

        </Routes>
        
    );
}

export default App;