const express = require("express");

const router = express.Router();

const {
    loginStaff,
    getCurrentStaff
} = require("../controllers/staffAuthController");

const staffAuth =
    require("../middleware/staffAuth");


// =========================================================
// STAFF LOGIN
// =========================================================

router.post(
    "/login",
    loginStaff
);


// =========================================================
// CURRENT STAFF
// =========================================================

router.get(
    "/me",
    staffAuth,
    getCurrentStaff
);


module.exports = router;