const mongoose = require("mongoose");

const paymentProofSchema = new mongoose.Schema(
    {
        fileName: {
            type: String,
            required: true
        },

        originalName: {
            type: String,
            required: true
        },

        fileType: {
            type: String,
            required: true
        },

        fileSize: {
            type: Number,
            required: true
        },

        url: {
            type: String,
            required: true
        },

        uploadedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        _id: false
    }
);

const bookingSchema = new mongoose.Schema(
    {
        bookingReference: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        // =========================
        // ROUTE
        // =========================

        origin: {
            type: String,
            required: true,
            trim: true
        },

        destination: {
            type: String,
            required: true,
            trim: true
        },

        // =========================
        // SCHEDULE
        // =========================

        date: {
            type: String,
            required: true
        },

        time: {
            type: String,
            required: true
        },

        // =========================
        // PASSENGER
        // =========================

        passengerName: {
            type: String,
            required: true,
            trim: true
        },

        passengerAge: {
            type: Number,
            required: true
        },

        passengerGender: {
            type: String,
            required: true
        },

        passengers: {
            type: Number,
            required: true,
            min: 1
        },

        // =========================
        // VEHICLE
        // =========================

        vehicleType: {
            type: String,
            required: true
        },

        plateNumber: {
            type: String,
            default: ""
        },

        // =========================
        // FARE
        // =========================

        passengerFare: {
            type: Number,
            required: true
        },

        motorcycleFare: {
            type: Number,
            required: true
        },

        ppaFee: {
            type: Number,
            required: true
        },

        requiredAmount: {
            type: Number,
            required: true
        },

        totalPaid: {
            type: Number,
            default: null
        },

       // =========================
// PAYMENT
// =========================

paymentMethod: {
    type: String,
    required: true,
    default: "Maya / QRPh"
},

paymentStatus: {
    type: String,
    enum: [
        "PENDING VERIFICATION",
        "VERIFIED",
        "REJECTED"
    ],
    default: "PENDING VERIFICATION"
},

// =========================
// BOARDING
// =========================

boardingStatus: {
    type: String,
    enum: [
        "NOT BOARDED",
        "ON BOARD",
        "REJECTED"
    ],
    default: "NOT BOARDED"
},

boardedAt: {
    type: Date,
    default: null
},

// =========================
// BOOKING STATUS
// =========================

status: {
    type: String,
    enum: [
        "PENDING PAYMENT VERIFICATION",
        "CONFIRMED",
        "CANCELLED"
    ],
    default: "PENDING PAYMENT VERIFICATION"
},

        // =========================
        // PAYMENT PROOF
        // =========================

        paymentProof: {
            type: paymentProofSchema,
            required: true
        }
    },
    

    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Booking",
    bookingSchema
);