import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/public/LandingPage";
import Login from "../pages/passenger/Login";
import Register from "../pages/passenger/Register";
import Dashboard from "../pages/passenger/Dashboard";
import BookTrip from "../pages/passenger/BookTrip";
import Payment from "../pages/passenger/Payment";

const AppRoutes = () => {
    return (
        <Routes>

            <Route
                path="/"
                element={<LandingPage />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

            <Route
                path="/book-trip"
                element={<BookTrip />}
            />

            <Route
                path="/payment"
                element={<Payment />}
            />

        </Routes>
    );
};

export default AppRoutes;