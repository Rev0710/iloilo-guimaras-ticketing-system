import {
    Routes,
    Route,
} from "react-router-dom";

import LandingPage from "../pages/passenger/LandingPage";
import Login from "../pages/passenger/Login";
import Register from "../pages/passenger/Register";

const Dashboard = () => {
    return (
        <div className="temporary-dashboard">
            <h1>Passenger Dashboard</h1>

            <p>
                Dashboard will be developed next.
            </p>
        </div>
    );
};

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

        </Routes>
    );
};

export default AppRoutes;