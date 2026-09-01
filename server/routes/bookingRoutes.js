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

    setFerryBookingStatus,

    verifyPayment,

    rejectPayment,

    getBookingStatistics,

    getBookingCapacity

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
// PUBLIC FERRY CAPACITY
// =====================================================
//
// Used by Trips.jsx to retrieve the latest passenger
// and motorcycle capacity for each ferry.
//
// IMPORTANT:
// This route is intentionally PUBLIC because tourists
// need to see available capacity before booking.
//
// DO NOT add adminAuth here.
//

router.get(
    "/capacity",
    getBookingCapacity
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
// ADMIN SEARCH BOOKING BY REFERENCE
// =====================================================
//
// Example:
//
// GET
// /api/bookings/search/reference/GG-123456
//
// IMPORTANT:
//
// We use the existing getBookingByReference controller
// instead of creating a duplicate controller function.
//
// adminAuth is still applied, so only administrators
// can use this search endpoint.
//

router.get(
    "/search/reference/:bookingReference",
    adminAuth,
    getBookingByReference
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
// ADMIN FERRY ONLINE BOOKING CONTROL
// =====================================================

router.put(
    "/ferry-closure",
    adminAuth,
    setFerryBookingStatus
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


// =====================================================
// EXPORT
// =====================================================

module.exports = router;