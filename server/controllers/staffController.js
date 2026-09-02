const mongoose = require("mongoose");
const Booking = require("../models/Booking");


// =========================================================
// GET BOOKING BY REFERENCE
// =========================================================
//
// Used when staff scans a passenger QR code.
//
// Route:
// GET /api/staff/booking/:bookingReference
//
// =========================================================

const getBookingByReferenceForStaff = async (req, res) => {

    try {

        const { bookingReference } = req.params;


        if (!bookingReference) {

            return res.status(400).json({
                success: false,
                message: "Booking reference is required."
            });
        }


        const booking = await Booking.findOne({
            bookingReference: bookingReference.trim()
        });


        if (!booking) {

            return res.status(404).json({
                success: false,
                message: "Booking not found."
            });
        }


        return res.status(200).json({

            success: true,

            booking

        });

    } catch (error) {

        console.error(
            "Get booking by reference error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to retrieve booking information."
        });
    }
};


// =========================================================
// VERIFY BOARDING
// =========================================================
//
// Staff confirms that the passenger is allowed to board.
//
// Route:
// PUT /api/staff/booking/:id/board
//
// =========================================================

const verifyBoarding = async (req, res) => {

    try {

        const { id } = req.params;


        // -----------------------------------------------------
        // Validate MongoDB ID
        // -----------------------------------------------------

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid booking ID."
            });
        }


        // -----------------------------------------------------
        // Find booking
        // -----------------------------------------------------

        const booking =
            await Booking.findById(id);


        if (!booking) {

            return res.status(404).json({
                success: false,
                message: "Booking not found."
            });
        }


        // -----------------------------------------------------
        // Payment verification
        // -----------------------------------------------------

        if (
            booking.paymentStatus !==
            "VERIFIED"
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Payment has not been verified. Passenger cannot board."
            });
        }


        // -----------------------------------------------------
        // Booking confirmation
        // -----------------------------------------------------

        if (
            booking.status !==
            "CONFIRMED"
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "This booking is not confirmed."
            });
        }


        // -----------------------------------------------------
        // Already boarded
        // -----------------------------------------------------

        if (
            booking.boardingStatus ===
            "ON BOARD"
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Passenger is already marked as boarded.",
                booking
            });
        }


        // -----------------------------------------------------
        // Previously rejected
        // -----------------------------------------------------

        if (
            booking.boardingStatus ===
            "REJECTED"
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "This passenger has been rejected for boarding."
            });
        }


        // -----------------------------------------------------
        // Mark as boarded
        // -----------------------------------------------------

        booking.boardingStatus =
            "ON BOARD";

        booking.boardedAt =
            new Date();


        await booking.save();


        return res.status(200).json({

            success: true,

            message:
                "Passenger marked as boarded successfully.",

            booking

        });

    } catch (error) {

        console.error(
            "Verify boarding error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to verify passenger boarding."
        });
    }
};


// =========================================================
// TIME OUT / CONFIRM ARRIVAL
// =========================================================
//
// Staff scans the same ticket again after the passenger
// arrives at the destination, then confirms the arrival time.
// Route:
// PUT /api/staff/bookings/:id/timeout
//
// =========================================================

const timeOutBooking = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid booking ID."
            });
        }

        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found."
            });
        }

        if (booking.paymentStatus !== "VERIFIED") {
            return res.status(400).json({
                success: false,
                message: "Payment has not been verified. Arrival cannot be confirmed."
            });
        }

        if (booking.status !== "CONFIRMED") {
            return res.status(400).json({
                success: false,
                message: "This booking is not confirmed."
            });
        }

        if (booking.boardingStatus === "REJECTED") {
            return res.status(400).json({
                success: false,
                message: "This passenger was rejected for boarding."
            });
        }

        if (booking.boardingStatus !== "ON BOARD") {
            return res.status(400).json({
                success: false,
                message: "Passenger must be marked as onboard before confirming arrival."
            });
        }

        if (booking.timedOutAt) {
            return res.status(400).json({
                success: false,
                message: "Passenger arrival has already been confirmed.",
                booking
            });
        }

        booking.timedOutAt = new Date();
        await booking.save();

        return res.status(200).json({
            success: true,
            message: "Passenger arrival and time out confirmed successfully.",
            booking
        });
    } catch (error) {
        console.error("Time out booking error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to confirm passenger arrival."
        });
    }
};


// =========================================================
// REJECT BOARDING
// =========================================================
//
// Route:
// PUT /api/staff/booking/:id/reject
//
// =========================================================

const rejectBoarding = async (req, res) => {

    try {

        const { id } = req.params;
        const { reason } = req.body || {};


        // -----------------------------------------------------
        // Validate rejection reason
        // -----------------------------------------------------

        if (typeof reason !== "string" || !reason.trim()) {
            return res.status(400).json({
                success: false,
                message: "A rejection reason is required."
            });
        }

        const trimmedReason = reason.trim();

        if (trimmedReason.length > 500) {
            return res.status(400).json({
                success: false,
                message: "Rejection reason must not exceed 500 characters."
            });
        }


        // -----------------------------------------------------
        // Validate MongoDB ID
        // -----------------------------------------------------

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                success: false,
                message: "Invalid booking ID."
            });
        }


        // -----------------------------------------------------
        // Find booking
        // -----------------------------------------------------

        const booking =
            await Booking.findById(id);


        if (!booking) {

            return res.status(404).json({
                success: false,
                message: "Booking not found."
            });
        }


        // -----------------------------------------------------
        // Already boarded
        // -----------------------------------------------------

        if (
            booking.boardingStatus ===
            "ON BOARD"
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "This passenger has already boarded and cannot be rejected."
            });
        }


        // -----------------------------------------------------
        // Reject boarding
        // -----------------------------------------------------

        booking.boardingStatus =
            "REJECTED";

        // Keep the administrator's payment status unchanged.
        // Staff rejection is a separate boarding decision.
        booking.status =
            "CANCELLED";

        booking.rejectionReason =
            trimmedReason;

        booking.rejectedAt =
            new Date();


        await booking.save();


        return res.status(200).json({

            success: true,

            message:
                "Passenger boarding has been rejected.",

            booking

        });

    } catch (error) {

        console.error(
            "Reject boarding error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to reject passenger boarding."
        });
    }
};


// =========================================================
// GET TODAY'S BOARDING BOOKINGS
// =========================================================
//
// Route:
// GET /api/staff/boarding
//
// =========================================================

const getTodayBoardingBookings = async (req, res) => {

    try {

        // -----------------------------------------------------
        // Get today's date as YYYY-MM-DD
        // -----------------------------------------------------

        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        // -----------------------------------------------------
        // Find today's confirmed bookings
        // that are ready for boarding
        // -----------------------------------------------------

        const bookings =
            await Booking.find({

                date: today,

                paymentStatus:
                    "VERIFIED",

                status:
                    "CONFIRMED",

                boardingStatus:
                    "NOT BOARDED"

            })
            .sort({
                time: 1
            });


        return res.status(200).json({

            success: true,

            count:
                bookings.length,

            bookings

        });

    } catch (error) {

        console.error(
            "Get today's boarding bookings error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to retrieve today's boarding bookings."
        });
    }
};


// =========================================================
// GET BOARDING STATISTICS
// =========================================================
//
// Route:
// GET /api/staff/statistics
//
// =========================================================

const getBoardingStatistics = async (req, res) => {

    try {

        // -----------------------------------------------------
        // Today's date
        // -----------------------------------------------------

        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        // -----------------------------------------------------
        // Count today's bookings
        // -----------------------------------------------------

        const totalBookings =
            await Booking.countDocuments({
                date: today
            });


        // -----------------------------------------------------
        // Confirmed bookings
        // -----------------------------------------------------

        const confirmedBookings =
            await Booking.countDocuments({

                date: today,

                status:
                    "CONFIRMED"

            });


        // -----------------------------------------------------
        // Verified payments
        // -----------------------------------------------------

        const verifiedPayments =
            await Booking.countDocuments({

                date: today,

                paymentStatus:
                    "VERIFIED"

            });


        // -----------------------------------------------------
        // Not boarded
        // -----------------------------------------------------

        const notBoarded =
            await Booking.countDocuments({

                date: today,

                boardingStatus:
                    "NOT BOARDED"

            });


        // -----------------------------------------------------
        // On board
        // -----------------------------------------------------

        const boarded =
            await Booking.countDocuments({

                date: today,

                boardingStatus:
                    "ON BOARD"

            });


        // -----------------------------------------------------
        // Rejected
        // -----------------------------------------------------

        const rejected =
            await Booking.countDocuments({

                date: today,

                boardingStatus:
                    "REJECTED"

            });


        return res.status(200).json({

            success: true,

            statistics: {

                date: today,

                totalBookings,

                confirmedBookings,

                verifiedPayments,

                notBoarded,

                boarded,

                rejected

            }

        });

    } catch (error) {

        console.error(
            "Get boarding statistics error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to retrieve boarding statistics."
        });
    }
};


// =========================================================
// EXPORT
// =========================================================

module.exports = {

    getBookingByReferenceForStaff,

    verifyBoarding,

    timeOutBooking,

    rejectBoarding,

    getTodayBoardingBookings,

    getBoardingStatistics

};