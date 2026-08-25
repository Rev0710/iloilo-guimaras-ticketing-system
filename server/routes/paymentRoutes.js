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

module.exports = router;