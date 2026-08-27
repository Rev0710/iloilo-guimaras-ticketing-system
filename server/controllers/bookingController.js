const Booking = require("../models/Booking");

// =========================================================
// GET ALL BOOKINGS FOR ADMIN
// =========================================================

const getAllBookings = async (req, res) => {
    try {

        const bookings = await Booking.find()
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            bookings
        });

    } catch (error) {

        console.error(
            "Get all bookings error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to retrieve bookings."
        });
    }
};


// =========================================================
// GET PENDING PAYMENT VERIFICATIONS
// =========================================================

const getPendingPayments = async (req, res) => {
    try {

        const bookings = await Booking.find({
            paymentStatus:
                "PENDING VERIFICATION"
        }).sort({
            createdAt: -1
        });

        return res.status(200).json({
            success: true,
            bookings
        });

    } catch (error) {

        console.error(
            "Get pending payments error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to retrieve pending payments."
        });
    }
};


// =========================================================
// GET BOOKING BY ID
// =========================================================

const getBookingById = async (req, res) => {
    try {

        const booking =
            await Booking.findById(
                req.params.id
            );

        if (!booking) {

            return res.status(404).json({
                success: false,
                message:
                    "Booking not found."
            });
        }

        return res.status(200).json({
            success: true,
            booking
        });

    } catch (error) {

        console.error(
            "Get booking error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to retrieve booking."
        });
    }
};


// =========================================================
// VERIFY PAYMENT
// =========================================================

const verifyPayment = async (req, res) => {
    try {

        const booking =
            await Booking.findById(
                req.params.id
            );

        if (!booking) {

            return res.status(404).json({
                success: false,
                message:
                    "Booking not found."
            });
        }


        // -----------------------------------------
        // Prevent verifying an already processed
        // payment
        // -----------------------------------------

        if (
            booking.paymentStatus !==
            "PENDING VERIFICATION"
        ) {

            return res.status(400).json({
                success: false,
                message:
                    `This payment has already been ${booking.paymentStatus.toLowerCase()}.`
            });
        }


        // -----------------------------------------
        // VERIFY PAYMENT
        // -----------------------------------------

        booking.paymentStatus =
            "VERIFIED";

        booking.status =
            "CONFIRMED";

        booking.totalPaid =
            booking.requiredAmount;


        await booking.save();


        return res.status(200).json({

            success: true,

            message:
                "Payment verified successfully.",

            booking

        });

    } catch (error) {

        console.error(
            "Verify payment error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to verify payment."
        });
    }
};


// =========================================================
// REJECT PAYMENT
// =========================================================

const rejectPayment = async (req, res) => {
    try {

        const booking =
            await Booking.findById(
                req.params.id
            );

        if (!booking) {

            return res.status(404).json({
                success: false,
                message:
                    "Booking not found."
            });
        }


        // -----------------------------------------
        // Prevent processing an already processed
        // payment
        // -----------------------------------------

        if (
            booking.paymentStatus !==
            "PENDING VERIFICATION"
        ) {

            return res.status(400).json({
                success: false,
                message:
                    `This payment has already been ${booking.paymentStatus.toLowerCase()}.`
            });
        }


        // -----------------------------------------
        // REJECT PAYMENT
        // -----------------------------------------

        booking.paymentStatus =
            "REJECTED";

        booking.status =
            "CANCELLED";

        booking.totalPaid =
            null;


        await booking.save();


        return res.status(200).json({

            success: true,

            message:
                "Payment rejected successfully.",

            booking

        });

    } catch (error) {

        console.error(
            "Reject payment error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to reject payment."
        });
    }
};


// =========================================================
// DASHBOARD STATISTICS
// =========================================================

const getBookingStatistics = async (req, res) => {
    try {

        const totalBookings =
            await Booking.countDocuments();


        const pendingPayments =
            await Booking.countDocuments({
                paymentStatus:
                    "PENDING VERIFICATION"
            });


        const verifiedPayments =
            await Booking.countDocuments({
                paymentStatus:
                    "VERIFIED"
            });


        const rejectedPayments =
            await Booking.countDocuments({
                paymentStatus:
                    "REJECTED"
            });


        return res.status(200).json({

            success: true,

            statistics: {

                totalBookings,

                pendingPayments,

                verifiedPayments,

                rejectedPayments

            }

        });

    } catch (error) {

        console.error(
            "Booking statistics error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to retrieve booking statistics."
        });
    }
};


// =========================================================
// EXPORT
// =========================================================

module.exports = {

    getAllBookings,

    getPendingPayments,

    getBookingById,

    verifyPayment,

    rejectPayment,

    getBookingStatistics

};