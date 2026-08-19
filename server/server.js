const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Iloilo-Guimaras Ferry Ticketing API is running!",
        database: "MongoDB"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});