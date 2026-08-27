const express = require("express");

const router = express.Router();

const adminAuth =
    require("../middleware/adminAuth");

const {
    getAllBookings,
    getPendingPayments,
    getBookingById,
    verifyPayment,
    rejectPayment,
    getBookingStatistics
} = require("../controllers/bookingController");


// =====================================================
// DASHBOARD STATISTICS
// =====================================================

router.get(
    "/statistics",
    adminAuth,
    getBookingStatistics
);


// =====================================================
// PENDING PAYMENTS
// =====================================================

router.get(
    "/pending-payments",
    adminAuth,
    getPendingPayments
);


// =====================================================
// ALL BOOKINGS
// =====================================================

router.get(
    "/",
    adminAuth,
    getAllBookings
);


// =====================================================
// SINGLE BOOKING
// =====================================================

router.get(
    "/:id",
    adminAuth,
    getBookingById
);


// =====================================================
// VERIFY PAYMENT
// =====================================================

router.put(
    "/:id/verify",
    adminAuth,
    verifyPayment
);


// =====================================================
// REJECT PAYMENT
// =====================================================

router.put(
    "/:id/reject",
    adminAuth,
    rejectPayment
);


module.exports = router;