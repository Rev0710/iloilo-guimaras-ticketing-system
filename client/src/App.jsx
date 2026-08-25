import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/passenger/Dashboard";
import BookTrip from "./pages/passenger/BookTrip";
import Payment from "./pages/passenger/Payment";
import GCashPayment from "./pages/passenger/GCashPayment";
import Confirmation from "./pages/passenger/confirmation";
import Bookings from "./pages/Bookings";
import LandingPage from "./pages/public/LandingPage";
import Login from "./pages/passenger/Login";
import Register from "./pages/passenger/Register";

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

            {/* GCASH PAYMENT */}
            <Route
                path="/gcash-payment"
                element={<GCashPayment />}
            />

            {/* CONFIRMATION */}
            <Route
                path="/confirmation"
                element={<Confirmation />}
            />

        </Routes>
    );
}

export default App;