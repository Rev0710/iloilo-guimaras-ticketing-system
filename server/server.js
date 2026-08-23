const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/database");

// Load environment variables
dotenv.config();

const app = express();

// ===============================
// MIDDLEWARE
// ===============================

// Allow requests from your React/Vite frontend
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:5174"
        ],
        credentials: true
    })
);

app.use(express.json());

// ===============================
// MONGODB CONNECTION
// ===============================

connectDB();

// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
    res.json({
        message: "Iloilo-Guimaras Ferry Ticketing API is running!",
        database: "MongoDB"
    });
});

// ===============================
// AUTH ROUTES
// ===============================

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

// ===============================
// SERVER
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server running on http://localhost:${PORT}`
    );
});