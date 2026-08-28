const express = require("express");

const router = express.Router();

const adminAuth =
    require("../middleware/adminAuth");

const {
    createStaff,
    getAllStaff,
    getStaffById,
    activateStaff,
    deactivateStaff,
    deleteStaff
} = require("../controllers/adminStaffController");


// =========================================================
// CREATE STAFF
// =========================================================

router.post(
    "/",
    adminAuth,
    createStaff
);


// =========================================================
// GET ALL STAFF
// =========================================================

router.get(
    "/",
    adminAuth,
    getAllStaff
);


// =========================================================
// GET STAFF BY ID
// =========================================================

router.get(
    "/:id",
    adminAuth,
    getStaffById
);


// =========================================================
// ACTIVATE STAFF
// =========================================================

router.put(
    "/:id/activate",
    adminAuth,
    activateStaff
);


// =========================================================
// DEACTIVATE STAFF
// =========================================================

router.put(
    "/:id/deactivate",
    adminAuth,
    deactivateStaff
);


// =========================================================
// DELETE STAFF
// =========================================================

router.delete(
    "/:id",
    adminAuth,
    deleteStaff
);


module.exports = router;