const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Booking = require("../models/Booking");

const router = express.Router();

// =========================================================
// UPLOAD DIRECTORY
// =========================================================

const uploadDirectory = path.join(
    __dirname,
    "../uploads/payment-proofs"
);

// Create directory automatically
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, {
        recursive: true
    });
}

// =========================================================
// MULTER STORAGE
// =========================================================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(
            null,
            uploadDirectory
        );
    },

    filename: (req, file, cb) => {

        const extension =
            path.extname(
                file.originalname
            );

        const uniqueName =
            `payment-proof-${Date.now()}-${Math.round(
                Math.random() * 100000
            )}${extension}`;

        cb(
            null,
            uniqueName
        );
    }
});

// =========================================================
// FILE FILTER
// =========================================================

const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png"
    ];

    if (
        allowedTypes.includes(
            file.mimetype
        )
    ) {

        cb(null, true);

    } else {

        cb(
            new Error(
                "Only JPG, JPEG, and PNG files are allowed."
            ),
            false
        );
    }
};

// =========================================================
// MULTER
// =========================================================

const upload = multer({

    storage,

    limits: {
        fileSize:
            5 * 1024 * 1024
    },

    fileFilter
});

// =========================================================
// UPLOAD PAYMENT PROOF
// =========================================================

router.post(
    "/upload-proof",
    upload.single("paymentProof"),
    async (req, res) => {

        try {

            if (!req.file) {

                return res.status(400).json({

                    success: false,

                    message:
                        "No payment proof was uploaded."
                });
            }

            const fileUrl =
                `/uploads/payment-proofs/${req.file.filename}`;

            console.log(
                "Payment proof uploaded:",
                req.file.filename
            );

            return res.status(200).json({

                success: true,

                message:
                    "Payment proof uploaded successfully.",

                file: {

                    originalName:
                        req.file.originalname,

                    filename:
                        req.file.filename,

                    mimetype:
                        req.file.mimetype,

                    size:
                        req.file.size,

                    url:
                        fileUrl
                }
            });

        } catch (error) {

            console.error(
                "Payment proof upload error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Unable to upload payment proof."
            });
        }
    }
);

// =========================================================
// CREATE BOOKING
// =========================================================

router.post(
    "/create-booking",
    async (req, res) => {

        try {

            console.log(
                "Creating booking..."
            );

            console.log(
                "Booking data:",
                req.body
            );

            const {

                bookingReference,

                origin,

                destination,

                date,

                time,

                // Selected ferry identity
                ferryId,

                ferryName,

                vesselName,

                departureTime,

                passengerName,

                passengerAge,

                passengerGender,

                passengers,

                vehicleType,

                plateNumber,

                passengerFare,

                motorcycleFare,

                ppaFee,

                requiredAmount,

                paymentMethod,

                paymentProof

            } = req.body;

            // =================================================
            // REQUIRED FIELD CHECK
            // =================================================

            if (
                !bookingReference ||
                !origin ||
                !destination ||
                !date ||
                !time ||
                !passengerName ||
                passengerAge === undefined ||
                !passengerGender ||
                !passengers ||
                !vehicleType ||
                passengerFare === undefined ||
                motorcycleFare === undefined ||
                ppaFee === undefined ||
                requiredAmount === undefined ||
                !paymentMethod ||
                !paymentProof
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Some required booking information is missing."
                });
            }

            // =================================================
            // CHECK DUPLICATE BOOKING REFERENCE
            // =================================================

            const existingBooking =
                await Booking.findOne({
                    bookingReference
                });

            if (existingBooking) {

                return res.status(409).json({

                    success: false,

                    message:
                        "This booking reference already exists."
                });
            }

            // =================================================
            // CREATE BOOKING
            // =================================================

            const booking =
                new Booking({

                    bookingReference,

                    origin,

                    destination,

                    date,

                    time,

                    // Preserve the exact ferry selected by the tourist.
                    ferryId:
                        ferryId || "",

                    ferryName:
                        ferryName ||
                        vesselName ||
                        "",

                    vesselName:
                        vesselName ||
                        ferryName ||
                        "",

                    departureTime:
                        departureTime ||
                        "",

                    passengerName,

                    passengerAge,

                    passengerGender,

                    passengers,

                    vehicleType,

                    plateNumber:
                        plateNumber || "",

                    passengerFare,

                    motorcycleFare,

                    ppaFee,

                    requiredAmount,

                    totalPaid:
                        null,

                    paymentMethod,

                    paymentStatus:
                        "PENDING VERIFICATION",

                    status:
                        "PENDING PAYMENT VERIFICATION",

                    paymentProof: {

                        fileName:
                            paymentProof.fileName,

                        originalName:
                            paymentProof.originalName,

                        fileType:
                            paymentProof.fileType,

                        fileSize:
                            paymentProof.fileSize,

                        url:
                            paymentProof.url,

                        uploadedAt:
                            new Date()
                    }
                });

            // =================================================
            // SAVE TO MONGODB
            // =================================================

            const savedBooking =
                await booking.save();

            console.log(
                "Booking successfully saved:",
                savedBooking.bookingReference
            );

            console.log(
                "Selected ferry:",
                savedBooking.ferryName ||
                savedBooking.vesselName
            );

            console.log(
                "Selected ferry ID:",
                savedBooking.ferryId
            );

            console.log(
                "Selected departure time:",
                savedBooking.departureTime ||
                savedBooking.time
            );

            // =================================================
            // RESPONSE
            // =================================================

            return res.status(201).json({

                success: true,

                message:
                    "Booking created successfully.",

                booking:
                    savedBooking
            });

        } catch (error) {

            console.error(
                "Create booking error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Unable to save booking to MongoDB.",

                error:
                    error.message
            });
        }
    }
);

// =========================================================
// GET BOOKING BY BOOKING REFERENCE
// Used by the Tourist Bookings page to get the
// latest booking/payment status from MongoDB.
// =========================================================

router.get(
    "/booking/:bookingReference",
    async (req, res) => {

        try {

            const booking =
                await Booking.findOne({
                    bookingReference:
                        req.params.bookingReference
                });

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
                "Get booking by reference error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Unable to retrieve booking."
            });
        }
    }
);

// =========================================================
// GET REAL-TIME FERRY CAPACITY
// =========================================================
//
// PUBLIC ROUTE
//
// Used by Trips.jsx to retrieve the latest passenger
// and motorcycle capacity for each ferry.
//
// GET /api/bookings/capacity?date=YYYY-MM-DD
//
// =========================================================

router.get(
    "/capacity",
    async (req, res) => {

        try {

            const requestedDate =
                req.query.date ||
                new Date()
                    .toISOString()
                    .split("T")[0];

            // =================================================
            // CAPACITY
            // =================================================

            const PASSENGER_CAPACITY = 100;

            const MOTORCYCLE_CAPACITY = 10;

            // =================================================
            // GET BOOKINGS FOR DATE
            // =================================================

            const bookings =
                await Booking.find({
                    date: requestedDate,

                    $and: [
                        {
                            status: {
                                $ne: "CANCELLED"
                            }
                        },
                        {
                            paymentStatus: {
                                $ne: "REJECTED"
                            }
                        }
                    ]
                });

            // =================================================
            // FERRY DEFINITIONS
            // =================================================

           const ferries = [
                    {
                        id: "MV Felipe III",
                        vesselName: "MV Felipe III",
                        departureTime: "3:30 AM",
                        time: "03:30"
                    },
                    {
                        id: "MV FastCraft",
                        vesselName: "MV FastCraft",
                        departureTime: "8:00 AM",
                        time: "08:00"
                    },
                    {
                        id: "MV Halili",
                        vesselName: "MV Halili",
                        departureTime: "9:00 AM",
                        time: "09:00"
                    }
                ];

            // =================================================
            // CALCULATE CAPACITY
            // =================================================

            const capacities =
                ferries.map((ferry) => {

                    // =========================================
                    // FIND BOOKINGS FOR THIS EXACT FERRY
                    // =========================================

                    const ferryBookings =
                        bookings.filter(
                            (booking) => {

                                // ---------------------------------
                                // FERRY ID
                                // ---------------------------------

                                const bookingFerryId =
                                    String(
                                        booking.ferryId ||
                                        booking.selectedFerry?.id ||
                                        booking.selectedTrip?.id ||
                                        ""
                                    )
                                        .trim()
                                        .toLowerCase();

                                const normalizedFerryId =
                                    String(
                                        ferry.id
                                    )
                                        .trim()
                                        .toLowerCase();

                                const ferryIdMatches =
                                    bookingFerryId !== "" &&
                                    bookingFerryId ===
                                    normalizedFerryId;

                                // ---------------------------------
                                // VESSEL NAME
                                // ---------------------------------

                                const bookingVessel =
                                    booking.vesselName ||
                                    booking.ferryName ||
                                    booking.vessel ||
                                    booking.ferry ||
                                    booking.selectedFerry?.vesselName ||
                                    booking.selectedFerry?.ferryName ||
                                    "";

                                // ---------------------------------
                                // DEPARTURE TIME
                                // ---------------------------------

                                const bookingTime =
                                    booking.time ||
                                    booking.departureTime ||
                                    booking.tripTime ||
                                    booking.selectedFerry?.time ||
                                    booking.selectedFerry?.departureTime ||
                                    "";

                                const normalizedBookingVessel =
                                    String(
                                        bookingVessel
                                    )
                                        .trim()
                                        .toLowerCase();

                                const normalizedBookingTime =
                                    String(
                                        bookingTime
                                    )
                                        .trim()
                                        .toLowerCase();

                                const normalizedFerryVessel =
                                    String(
                                        ferry.vesselName
                                    )
                                        .trim()
                                        .toLowerCase();

                                const normalizedFerryTime =
                                    String(
                                        ferry.time
                                    )
                                        .trim()
                                        .toLowerCase();

                                const normalizedDepartureTime =
                                    String(
                                        ferry.departureTime
                                    )
                                        .trim()
                                        .toLowerCase();

                                // ---------------------------------
                                // FERRY ID HAS PRIORITY
                                // ---------------------------------

                                if (
                                    bookingFerryId !== ""
                                ) {

                                    return ferryIdMatches;
                                }

                                // ---------------------------------
                                // VESSEL MATCH
                                // ---------------------------------

                                const vesselMatches =
                                    normalizedBookingVessel !== "" &&
                                    normalizedBookingVessel ===
                                    normalizedFerryVessel;

                                // ---------------------------------
                                // TIME MATCH
                                // ---------------------------------

                                const timeMatches =
                                    normalizedBookingTime ===
                                    normalizedFerryTime ||

                                    normalizedBookingTime ===
                                    normalizedDepartureTime;

                                // ---------------------------------
                                // IF VESSEL EXISTS
                                // USE VESSEL
                                // ---------------------------------

                                if (
                                    normalizedBookingVessel !== ""
                                ) {

                                    return vesselMatches;
                                }

                                // ---------------------------------
                                // OTHERWISE USE TIME
                                // ---------------------------------

                                return timeMatches;
                            }
                        );

                    // =================================================
                    // PASSENGER COUNT
                    // =================================================

                    const passengers =
                        ferryBookings.reduce(
                            (
                                total,
                                booking
                            ) => {

                                const passengerCount =
                                    Number(
                                        booking.passengers ||
                                        booking.numberOfPassengers ||
                                        booking.passengerCount ||
                                        1
                                    );

                                if (
                                    !Number.isFinite(
                                        passengerCount
                                    )
                                ) {

                                    return total + 1;
                                }

                                return (
                                    total +
                                    Math.max(
                                        1,
                                        passengerCount
                                    )
                                );
                            },
                            0
                        );

                    // =================================================
                    // MOTORCYCLE COUNT
                    // =================================================

                    const vehicles =
                        ferryBookings.reduce(
                            (
                                total,
                                booking
                            ) => {

                                const vehicleType =
                                    booking.vehicleType ||
                                    booking.vehicle ||
                                    booking.vehicleDetails?.type ||
                                    "";

                                const normalizedVehicle =
                                    String(
                                        vehicleType
                                    )
                                        .trim()
                                        .toLowerCase();

                                const isNoMotorcycle =
                                    normalizedVehicle ===
                                        "no motorcycle" ||
                                    normalizedVehicle ===
                                        "nomotorcycle" ||
                                    normalizedVehicle ===
                                        "no vehicle" ||
                                    normalizedVehicle ===
                                        "none" ||
                                    normalizedVehicle ===
                                        "passenger only" ||
                                    normalizedVehicle ===
                                        "passenger-only" ||
                                    normalizedVehicle ===
                                        "passenger" ||
                                    normalizedVehicle ===
                                        "";

                                const hasMotorcycle =
                                    !isNoMotorcycle &&
                                    (
                                        normalizedVehicle ===
                                            "motorcycle" ||
                                        normalizedVehicle.includes(
                                            "motorcycle"
                                        )
                                    );

                                if (
                                    hasMotorcycle
                                ) {

                                    return (
                                        total + 1
                                    );
                                }

                                return total;
                            },
                            0
                        );

                    // =================================================
                    // REMAINING PASSENGER CAPACITY
                    // =================================================

                    const passengerRemaining =
                        Math.max(
                            0,
                            PASSENGER_CAPACITY -
                            passengers
                        );

                    // =================================================
                    // REMAINING MOTORCYCLE CAPACITY
                    // =================================================

                    const vehicleRemaining =
                        Math.max(
                            0,
                            MOTORCYCLE_CAPACITY -
                            vehicles
                        );

                    // =================================================
                    // RETURN FERRY CAPACITY
                    // =================================================

                    return {

                        id:
                            ferry.id,

                        vesselName:
                            ferry.vesselName,

                        departureTime:
                            ferry.departureTime,

                        time:
                            ferry.time,

                        passengers:
                            passengers,

                        passengerCapacity:
                            PASSENGER_CAPACITY,

                        passengerRemaining:
                            passengerRemaining,

                        vehicles:
                            vehicles,

                        vehicleCapacity:
                            MOTORCYCLE_CAPACITY,

                        vehicleRemaining:
                            vehicleRemaining
                    };
                });

            // =================================================
            // RESPONSE
            // =================================================

            return res.status(200).json({

                success: true,

                date:
                    requestedDate,

                capacities:
                    capacities
            });

        } catch (error) {

            console.error(
                "Get ferry capacity error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Unable to retrieve ferry capacity."
            });
        }
    }
);

module.exports = router;