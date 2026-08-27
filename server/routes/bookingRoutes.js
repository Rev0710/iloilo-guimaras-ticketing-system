const express = require("express");

const router = express.Router();

const adminAuth =
    require("../middleware/adminAuth");

const {

    getAllBookings,

    getPendingPayments,

    getVerifiedPayments,

    getBookingById,

    getBookingByReference,

    verifyPayment,

    rejectPayment,

    getBookingStatistics

} = require("../controllers/bookingController");


// =====================================================
// PUBLIC TOURIST BOOKING LOOKUP
// =====================================================
//
// Used by the tourist My Bookings page to retrieve
// the latest booking status from MongoDB.
//

router.get(
    "/reference/:bookingReference",
    getBookingByReference
);


// =====================================================
// ADMIN DASHBOARD STATISTICS
// =====================================================

router.get(
    "/statistics",
    adminAuth,
    getBookingStatistics
);


// =====================================================
// ADMIN PENDING PAYMENTS
// =====================================================

router.get(
    "/pending-payments",
    adminAuth,
    getPendingPayments
);


// =====================================================
// ADMIN VERIFIED PAYMENTS
// =====================================================

router.get(
    "/verified-payments",
    adminAuth,
    getVerifiedPayments
);


// =====================================================
// ADMIN ALL BOOKINGS
// =====================================================

router.get(
    "/",
    adminAuth,
    getAllBookings
);


// =====================================================
// ADMIN SINGLE BOOKING
// =====================================================

router.get(
    "/:id",
    adminAuth,
    getBookingById
);


// =====================================================
// ADMIN VERIFY PAYMENT
// =====================================================

router.put(
    "/:id/verify",
    adminAuth,
    verifyPayment
);


// =====================================================
// ADMIN REJECT PAYMENT
// =====================================================

router.put(
    "/:id/reject",
    adminAuth,
    rejectPayment
);


module.exports = router;