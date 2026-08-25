const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB =
    require("./config/database");

dotenv.config();

const app = express();


// ===============================
// MIDDLEWARE
// ===============================

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
// UPLOADS
// ===============================

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);


// ===============================
// MONGODB
// ===============================

connectDB();


// ===============================
// TEST
// ===============================

app.get("/", (req, res) => {

    res.json({
        message:
            "Iloilo-Guimaras Ferry Ticketing API is running!",

        database:
            "MongoDB"
    });

});


// ===============================
// AUTH
// ===============================

const authRoutes =
    require("./routes/authRoutes");

app.use(
    "/api/auth",
    authRoutes
);


// ===============================
// ADMIN
// ===============================

const adminRoutes =
    require("./routes/adminRoutes");

app.use(
    "/api/admin",
    adminRoutes
);

const paymentRoutes =
    require("./routes/paymentRoutes");

app.use(
    "/api/payment",
    paymentRoutes
);

// ===============================
// SERVER
// ===============================

const PORT =
    process.env.PORT || 5000;

app.listen(
    PORT,
    () => {

        console.log(
            `Server running on http://localhost:${PORT}`
        );

    }
);