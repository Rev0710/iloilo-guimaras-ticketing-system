import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MayaPayment = () => {

    const navigate = useNavigate();

    // =========================================================
    // API URL
    // =========================================================

    const API_URL = "http://localhost:5000";

    // =========================================================
    // GUIMARASGO LOGO
    // =========================================================

    const LOGO_URL =
        "https://scontent.fcgy2-2.fna.fbcdn.net/v/t1.15752-9/775468126_1793367781697550_3767041847597317415_n.png?stp=dst-png&cstp=mx532x469&ctp=s532x469&_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEKTnmoEB20Fs5gE6WYWTxBd_QaoqEL1HV39BqioQvUdc9ZjhsVKyPy19OQYcSyO20Y_14PqMHIf2M01vrRKE4U&_nc_ohc=fK0ygs4SALUQ7kNvwEhUgQl&_nc_oc=Adr97yUKqKQuY-Rb-Lpj__Sjoqm7YY75sVczdULR8n8AbUyhy3oVy9DJ-YO_YUPfnTE&_nc_zt=23&_nc_ht=scontent.fcgy2-2.fna&_nc_ss=7a2a8&oh=03_Q7cD6AFmBhmkMTNembwVy95XQOYfaHONnpCT7udBE1IJnmNvHg&oe=6AB20956";

    // =========================================================
    // MAYA MERCHANT QR
    // =========================================================

    const MAYA_QR_URL = "/images/maya-qr.jpg";

    // =========================================================
    // PAYMENT PROOF
    // =========================================================

    const [paymentProof, setPaymentProof] = useState(null);

    const [proofPreview, setProofPreview] =
        useState(null);

    const [errorMessage, setErrorMessage] =
        useState("");

    // =========================================================
    // GET TRIP DETAILS
    // =========================================================

    const savedTrip =
        sessionStorage.getItem("tripDetails");

    let trip = null;

    try {

        trip =
            savedTrip
                ? JSON.parse(savedTrip)
                : null;

    } catch (error) {

        console.error(
            "Unable to recover trip details:",
            error
        );

        trip = null;
    }

    // =========================================================
    // NORMALIZE TRIP INFORMATION
    // =========================================================

    const normalizedTrip = trip
        ? {

            ...trip,

            passengerName:
                trip.passengerName ||
                trip.name ||
                "",

            passengerAge:
                trip.passengerAge ||
                trip.age ||
                "",

            passengerGender:
                trip.passengerGender ||
                trip.gender ||
                "",

            passengers:
                Number(
                    trip.passengers ||
                    trip.numberOfPassengers ||
                    1
                ),

            vehicleType:
                trip.vehicleType ||
                trip.vehicle ||
                trip.vehicleDetails?.type ||
                "Motorcycle",

            plateNumber:
                trip.plateNumber ||
                trip.plate_number ||
                trip.plate ||
                trip.motorcyclePlateNumber ||
                trip.vehiclePlateNumber ||
                trip.vehicleDetails?.plateNumber ||
                trip.vehicleDetails?.plate ||
                trip.motorcycle?.plateNumber ||
                ""

        }
        : null;

    // =========================================================
    // IF TRIP INFORMATION IS MISSING
    // =========================================================

    if (!normalizedTrip) {

        return (

            <main className="maya-page">

                <div className="maya-container missing-container">

                    <h2>
                        Trip Details Not Found
                    </h2>

                    <p>
                        Please return to the booking page
                        and select your trip again.
                    </p>

                    <button
                        type="button"
                        className="primary-button"
                        onClick={() =>
                            navigate("/book-trip")
                        }
                    >
                        Back to Book Trip
                    </button>

                </div>

                <style>{`

                    * {
                        box-sizing: border-box;
                    }

                    .maya-page {
                        min-height: 100vh;

                        display: flex;

                        align-items: center;
                        justify-content: center;

                        padding: 20px;

                        background: #f7f8fa;

                        font-family:
                            Arial,
                            Helvetica,
                            sans-serif;
                    }

                    .missing-container {
                        text-align: center;
                    }

                    .maya-container {
                        width: 100%;
                        max-width: 520px;

                        padding: 40px;

                        background: #ffffff;

                        border-radius: 20px;

                        box-shadow:
                            0 10px 35px
                            rgba(0, 0, 0, 0.08);
                    }

                    .primary-button {
                        width: 100%;

                        height: 50px;

                        border: none;

                        border-radius: 10px;

                        background: #f28c28;

                        color: #ffffff;

                        font-size: 15px;

                        font-weight: 700;

                        cursor: pointer;
                    }

                `}</style>

            </main>
        );
    }

    // =========================================================
    // FARES
    // =========================================================

    const passengers =
        Number(
            normalizedTrip.passengers || 1
        );

    const passengerFare =
        passengers * 40;

    const motorcycleFare =
        150;

    const ppaFee =
        65;

    const totalFare =
        passengerFare +
        motorcycleFare +
        ppaFee;

    // =========================================================
    // BOOKING REFERENCE
    // =========================================================

    let bookingReference =
        sessionStorage.getItem(
            "currentBookingReference"
        );

    if (!bookingReference) {

        bookingReference =
            "GG-" +
            Math.floor(
                100000 +
                Math.random() * 900000
            );

        sessionStorage.setItem(
            "currentBookingReference",
            bookingReference
        );
    }

    // =========================================================
    // HANDLE PAYMENT PROOF UPLOAD
    // =========================================================

    const handleProofUpload = (event) => {

        setErrorMessage("");

        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        // =====================================================
        // CHECK FILE TYPE
        // =====================================================

        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png"
        ];

        if (
            !allowedTypes.includes(
                file.type
            )
        ) {

            setErrorMessage(
                "Please upload a JPG, JPEG, or PNG image."
            );

            event.target.value = "";

            return;
        }

        // =====================================================
        // CHECK FILE SIZE
        // =====================================================

        if (
            file.size >
            5 * 1024 * 1024
        ) {

            setErrorMessage(
                "The payment proof must be smaller than 5 MB."
            );

            event.target.value = "";

            return;
        }

        // =====================================================
        // SAVE FILE
        // =====================================================

        setPaymentProof(file);

        // =====================================================
        // CREATE PREVIEW
        // =====================================================

        const reader =
            new FileReader();

        reader.onload = () => {

            setProofPreview(
                reader.result
            );
        };

        reader.onerror = () => {

            setErrorMessage(
                "Unable to read the payment proof image."
            );

            setPaymentProof(null);

            setProofPreview(null);
        };

        reader.readAsDataURL(file);
    };

    // =========================================================
    // REMOVE PAYMENT PROOF
    // =========================================================

    const handleRemoveProof = () => {

        setPaymentProof(null);

        setProofPreview(null);

        setErrorMessage("");

        const input =
            document.getElementById(
                "payment-proof"
            );

        if (input) {

            input.value = "";
        }
    };

    // =========================================================
    // COMPLETE PAYMENT / SUBMIT BOOKING
    // =========================================================

    const handleCompletedPayment = async () => {

        setErrorMessage("");

        // =====================================================
        // PAYMENT PROOF REQUIRED
        // =====================================================

        if (
            !paymentProof ||
            !proofPreview
        ) {

            setErrorMessage(
                "Please upload your Maya payment receipt screenshot before submitting."
            );

            return;
        }

        try {

            // =================================================
            // STEP 1 — UPLOAD PAYMENT PROOF
            // =================================================

            const formData =
                new FormData();

            formData.append(
                "paymentProof",
                paymentProof
            );

            const uploadResponse =
                await fetch(
                    `${API_URL}/api/payment/upload-proof`,
                    {
                        method: "POST",

                        body: formData
                    }
                );

            let uploadResult;

            try {

                uploadResult =
                    await uploadResponse.json();

            } catch (jsonError) {

                throw new Error(
                    "The server returned an invalid response while uploading the payment proof."
                );
            }

            if (
                !uploadResponse.ok ||
                !uploadResult.success
            ) {

                throw new Error(
                    uploadResult.message ||
                    "Payment proof upload failed."
                );
            }

            console.log(
                "Payment proof uploaded:",
                uploadResult.file
            );

            const uploadedProof =
                uploadResult.file;

            // =================================================
            // STEP 2 — CREATE BOOKING OBJECT
            // =================================================

            const completedBooking = {

                // ---------------------------------------------
                // BOOKING REFERENCE
                // ---------------------------------------------

                bookingReference,

                // ---------------------------------------------
                // ROUTE
                // ---------------------------------------------

                origin:
                    normalizedTrip.origin,

                destination:
                    normalizedTrip.destination,

                // ---------------------------------------------
                // SCHEDULE
                // ---------------------------------------------

                date:
                    normalizedTrip.date,

                time:
                    normalizedTrip.time,

                // ---------------------------------------------
                // PASSENGER
                // ---------------------------------------------

                passengerName:
                    normalizedTrip.passengerName,

                passengerAge:
                    normalizedTrip.passengerAge,

                passengerGender:
                    normalizedTrip.passengerGender,

                passengers,

                // ---------------------------------------------
                // VEHICLE
                // ---------------------------------------------

                vehicleType:
                    normalizedTrip.vehicleType,

                plateNumber:
                    normalizedTrip.plateNumber,

                // ---------------------------------------------
                // FARE
                // ---------------------------------------------

                passengerFare,

                motorcycleFare,

                ppaFee,

                totalFare,

                requiredAmount:
                    totalFare,

                // Do not assume payment is verified yet.

                totalPaid:
                    null,

                // ---------------------------------------------
                // PAYMENT
                // ---------------------------------------------

                paymentMethod:
                    "Maya / QRPh",

                paymentStatus:
                    "PENDING VERIFICATION",

                // ---------------------------------------------
                // BOOKING STATUS
                // ---------------------------------------------

                status:
                    "PENDING PAYMENT VERIFICATION",

                // ---------------------------------------------
                // PAYMENT PROOF
                // ---------------------------------------------

                paymentProof: {

                    fileName:
                        uploadedProof.filename,

                    originalName:
                        uploadedProof.originalName,

                    fileType:
                        uploadedProof.mimetype,

                    fileSize:
                        uploadedProof.size,

                    url:
                        uploadedProof.url,

                    uploadedAt:
                        new Date().toISOString()
                },

                // ---------------------------------------------
                // BOOKING TIMESTAMP
                // ---------------------------------------------

                bookedAt:
                    new Date().toISOString()
            };

            console.log(
                "Booking prepared:",
                completedBooking
            );

            // =================================================
            // STEP 3 — SAVE BOOKING TO MONGODB
            // =================================================

            const bookingResponse =
                await fetch(
                    `${API_URL}/api/payment/create-booking`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                completedBooking
                            )
                    }
                );

            let bookingResult;

            try {

                bookingResult =
                    await bookingResponse.json();

            } catch (jsonError) {

                throw new Error(
                    "The server returned an invalid response while saving the booking."
                );
            }

            if (
                !bookingResponse.ok ||
                !bookingResult.success
            ) {

                throw new Error(
                    bookingResult.message ||
                    "Unable to save booking to the database."
                );
            }

            console.log(
                "Booking saved to MongoDB:",
                bookingResult.booking
            );

            // =================================================
            // USE MONGODB BOOKING
            // =================================================

            const savedBooking =
                bookingResult.booking ||
                completedBooking;

            // =================================================
            // STEP 4 — SAVE PAYMENT STATUS
            // =================================================

            sessionStorage.setItem(
                "paymentStatus",
                "PENDING VERIFICATION"
            );

            sessionStorage.setItem(
                "paymentMethod",
                "Maya / QRPh"
            );

            // =================================================
            // STEP 5 — SAVE CONFIRMED BOOKING
            // =================================================

            sessionStorage.setItem(
                "confirmedBooking",
                JSON.stringify(
                    savedBooking
                )
            );

            // =================================================
            // STEP 6 — SAVE LATEST BOOKING
            // =================================================

            sessionStorage.setItem(
                "latestBooking",
                JSON.stringify(
                    savedBooking
                )
            );

            // =================================================
            // STEP 7 — SAVE BOOKING HISTORY
            // =================================================

            let allBookings = [];

            try {

                const savedAllBookings =
                    sessionStorage.getItem(
                        "allBookings"
                    );

                if (savedAllBookings) {

                    const parsed =
                        JSON.parse(
                            savedAllBookings
                        );

                    if (
                        Array.isArray(parsed)
                    ) {

                        allBookings =
                            parsed;
                    }
                }

            } catch (historyError) {

                console.error(
                    "Unable to load booking history:",
                    historyError
                );

                allBookings = [];
            }

            // =================================================
            // CHECK EXISTING BOOKING
            // =================================================

            const existingIndex =
                allBookings.findIndex(
                    (item) =>
                        item.bookingReference ===
                        savedBooking.bookingReference
                );

            if (
                existingIndex === -1
            ) {

                allBookings.push(
                    savedBooking
                );

            } else {

                allBookings[
                    existingIndex
                ] = {

                    ...allBookings[
                        existingIndex
                    ],

                    ...savedBooking
                };
            }

            // =================================================
            // STEP 8 — SAVE ALL BOOKINGS
            // =================================================

            sessionStorage.setItem(
                "allBookings",
                JSON.stringify(
                    allBookings
                )
            );

            // =================================================
            // STEP 9 — SAVE RECENT BOOKINGS
            // =================================================

            const recentBookings =
                [...allBookings]
                    .reverse()
                    .slice(0, 3);

            sessionStorage.setItem(
                "recentBookings",
                JSON.stringify(
                    recentBookings
                )
            );

            // =================================================
            // STEP 10 — SAVE PAYMENT DETAILS
            // =================================================

            const paymentDetails = {

                paymentMethod:
                    "maya_qrph",

                amount:
                    totalFare,

                currency:
                    "PHP",

                status:
                    "PENDING VERIFICATION",

                bookingReference,

                paymentProof: {

                    fileName:
                        uploadedProof.filename,

                    originalName:
                        uploadedProof.originalName,

                    fileType:
                        uploadedProof.mimetype,

                    fileSize:
                        uploadedProof.size,

                    url:
                        uploadedProof.url
                },

                trip:
                    normalizedTrip
            };

            sessionStorage.setItem(
                "paymentDetails",
                JSON.stringify(
                    paymentDetails
                )
            );

            // =================================================
            // STEP 11 — CLEAN CURRENT BOOKING REFERENCE
            // =================================================

            sessionStorage.removeItem(
                "currentBookingReference"
            );

            sessionStorage.removeItem(
                "bookingReference"
            );

            // =================================================
            // STEP 12 — GO TO CONFIRMATION
            // =================================================

            navigate(
                "/confirmation",
                {
                    replace: true
                }
            );

        } catch (error) {

            console.error(
                "Payment submission failed:",
                error
            );

            setErrorMessage(
                error.message ||
                "Unable to submit payment. Please try again."
            );
        }
    };

    // =========================================================
    // FORMAT TIME
    // =========================================================

    const formatTime = (time) => {

        if (!time) {
            return "N/A";
        }

        const stringTime =
            String(time);

        if (
            stringTime
                .toUpperCase()
                .includes("AM") ||
            stringTime
                .toUpperCase()
                .includes("PM")
        ) {

            return stringTime;
        }

        const parts =
            stringTime.split(":");

        if (
            parts.length < 2
        ) {

            return stringTime;
        }

        const hours =
            Number(parts[0]);

        const minutes =
            parts[1];

        const suffix =
            hours >= 12
                ? "PM"
                : "AM";

        const displayHour =
            hours % 12 || 12;

        return `${displayHour}:${minutes} ${suffix}`;
    };

    // =========================================================
    // PAGE
    // =========================================================

    return (

        <main className="maya-page">

            <div className="maya-container">

                {/* BACK */}

                <button
                    type="button"
                    className="maya-back"
                    onClick={() =>
                        navigate("/payment")
                    }
                >
                    ← Back to Payment Method
                </button>

                {/* LOGO */}

                <div className="maya-logo">

                    <img
                        src={LOGO_URL}
                        alt="GuimarasGo Logo"
                    />

                </div>

                {/* TITLE */}

                <div className="maya-heading">

                    <div className="maya-icon">
                        M
                    </div>

                    <div>

                        <h1>
                            Maya / QRPh Payment
                        </h1>

                        <p>
                            Scan the merchant QR code
                            to make your payment.
                        </p>

                    </div>

                </div>

                {/* PAYMENT NOTICE */}

                <div className="payment-notice">

    <strong>
        IMPORTANT
    </strong>

    <p>
        • Scan the QR code below using Maya or
        another supported QRPh payment app.
    </p>

    <p>
        • After successfully paying, save a
        screenshot of your Maya payment receipt.
    </p>

</div>

                {/* MAYA QR */}

                <div className="qr-section">

                    <div className="merchant-label">
                        Maya Business Merchant
                    </div>

                    <img
                        className="maya-qr"
                        src={MAYA_QR_URL}
                        alt="Maya Business Merchant QR Code"
                    />

                    <h3>
                        GuimarasGO
                    </h3>

                    <p>
                        Scan this QR code using
                        Maya or any supported QRPh app.
                    </p>

                </div>

                {/* AMOUNT TO PAY */}

                <div className="amount-to-pay">

                    <span>
                        Amount to Pay
                    </span>

                    <strong>
                        ₱{totalFare.toFixed(2)}
                    </strong>

                    <p>
                        Please send exactly this amount
                        to the merchant.
                    </p>

                </div>

                {/* PAYMENT DETAILS */}

                <div className="payment-details">

                    <h2>
                        Payment Details
                    </h2>

                    <div className="detail-row">

                        <span>
                            Booking Reference
                        </span>

                        <strong>
                            {bookingReference}
                        </strong>

                    </div>

                    <div className="detail-row">

                        <span>
                            Passenger
                        </span>

                        <strong>
                            {
                                normalizedTrip
                                    .passengerName ||
                                "N/A"
                            }
                        </strong>

                    </div>

                    <div className="detail-row">

                        <span>
                            Age
                        </span>

                        <strong>
                            {
                                normalizedTrip
                                    .passengerAge ||
                                "N/A"
                            }
                        </strong>

                    </div>

                    <div className="detail-row">

                        <span>
                            Gender
                        </span>

                        <strong>
                            {
                                normalizedTrip
                                    .passengerGender ||
                                "N/A"
                            }
                        </strong>

                    </div>

                    <div className="detail-row">

                        <span>
                            Passengers
                        </span>

                        <strong>
                            {passengers}
                        </strong>

                    </div>

                    <div className="detail-row">

                        <span>
                            Route
                        </span>

                        <strong>
                            {normalizedTrip.origin}
                            {" → "}
                            {normalizedTrip.destination}
                        </strong>

                    </div>

                    <div className="detail-row">

                        <span>
                            Departure
                        </span>

                        <strong>
                            {formatTime(
                                normalizedTrip.time
                            )}
                        </strong>

                    </div>

                    <div className="detail-row">

                        <span>
                            Vehicle
                        </span>

                        <strong>
                            {normalizedTrip.vehicleType}
                        </strong>

                    </div>

                    <div className="detail-row">

                        <span>
                            Plate Number
                        </span>

                        <strong>
                            {
                                normalizedTrip
                                    .plateNumber ||
                                "N/A"
                            }
                        </strong>

                    </div>

                </div>

                {/* FARE SUMMARY */}

                <div className="fare-card">

                    <h2>
                        Fare Summary
                    </h2>

                    <div className="fare-row">

                        <span>
                            Passenger Fare
                        </span>

                        <span>
                            ₱
                            {passengerFare.toFixed(2)}
                        </span>

                    </div>

                    <div className="fare-row">

                        <span>
                            Motorcycle
                        </span>

                        <span>
                            ₱
                            {motorcycleFare.toFixed(2)}
                        </span>

                    </div>

                    <div className="fare-row">

                        <span>
                            PPA Fee
                        </span>

                        <span>
                            ₱
                            {ppaFee.toFixed(2)}
                        </span>

                    </div>

                    <div className="fare-divider" />

                    <div className="total-row">

                        <strong>
                            Total to Pay
                        </strong>

                        <strong>
                            ₱
                            {totalFare.toFixed(2)}
                        </strong>

                    </div>

                </div>

                {/* PAYMENT PROOF */}

                <div className="proof-card">

                    <h2>
                        Payment Proof
                    </h2>

                    <p className="proof-description">
                        After you successfully pay
                        through Maya, take a screenshot
                        of the Maya payment receipt and
                        upload it here.
                    </p>

                    <label
                        htmlFor="payment-proof"
                        className="upload-button"
                    >
                        📷 Upload Payment Receipt
                    </label>

                    <input
                        id="payment-proof"
                        type="file"
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={
                            handleProofUpload
                        }
                        hidden
                    />

                    {/* RECEIPT PREVIEW */}

                    {proofPreview && (

                        <div className="proof-preview">

                            <div className="proof-preview-header">

                                <strong>
                                    Payment Receipt Preview
                                </strong>

                                <button
                                    type="button"
                                    onClick={
                                        handleRemoveProof
                                    }
                                    className="remove-proof"
                                >
                                    Remove
                                </button>

                            </div>

                            <img
                                src={proofPreview}
                                alt="Uploaded Maya payment proof"
                            />

                            <p>
                                {paymentProof?.name}
                            </p>

                        </div>
                    )}

                    {/* ERROR */}

                    {errorMessage && (

                        <div className="error-message">

                            {errorMessage}

                        </div>
                    )}

                </div>

                {/* SUBMIT */}

                <button
                    type="button"
                    className="complete-payment-button"
                    onClick={
                        handleCompletedPayment
                    }
                >
                    Payment Completed & Submit
                </button>

                <p className="bottom-note">
                    Your payment receipt will be reviewed
                    by GuimarasGo staff before the booking
                    is confirmed.
                </p>

            </div>

            {/* =====================================================
                CSS
            ===================================================== */}

            <style>{`

                * {
                    box-sizing: border-box;
                }

                .maya-page {

                    min-height: 100vh;

                    background:
                        linear-gradient(
                            180deg,
                            #f8f4ff 0%,
                            #f7f8fa 100%
                        );

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    padding:
                        30px 20px;
                }

                .maya-container {

                    width: 100%;

                    max-width: 650px;

                    margin: 0 auto;

                    padding:
                        25px
                        25px
                        35px;

                    background:
                        #ffffff;

                    border-radius:
                        24px;

                    box-shadow:
                        0 10px 35px
                        rgba(0, 0, 0, 0.08);
                }

                /* =================================================
                   BACK BUTTON
                ================================================= */

                .maya-back {

                    border: none;

                    background:
                        transparent;

                    color:
                        #777777;

                    font-size:
                        13px;

                    cursor:
                        pointer;

                    margin-bottom:
                        20px;
                }

                .maya-back:hover {

                    color:
                        #7b4ce2;
                }

                /* =================================================
                   LOGO
                ================================================= */

                .maya-logo {

                    display:
                        flex;

                    justify-content:
                        center;

                    margin-bottom:
                        15px;
                }

                .maya-logo img {

                    width:
                        110px;

                    height:
                        auto;

                    max-height:
                        90px;

                    object-fit:
                        contain;
                }

                /* =================================================
                   HEADING
                ================================================= */

                .maya-heading {

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    gap:
                        15px;

                    margin-bottom:
                        20px;
                }

                .maya-icon {

                    width:
                        48px;

                    height:
                        48px;

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    border-radius:
                        12px;

                    background:
                        #eee7ff;

                    color:
                        #7046d8;

                    font-size:
                        24px;

                    font-weight:
                        900;
                }

                .maya-heading h1 {

                    margin:
                        0;

                    color:
                        #111111;

                    font-size:
                        24px;

                    font-weight:
                        800;
                }

                .maya-heading p {

                    margin:
                        5px 0 0;

                    color:
                        #777777;

                    font-size:
                        13px;
                }

                /* =================================================
                   PAYMENT NOTICE
                ================================================= */

                .payment-notice {
    display: block;
    padding: 16px 20px;
    border: 1px solid #d8c4ff;
    border-radius: 12px;
    background: #f8f3ff;
}

.payment-notice strong {
    display: block;
    margin-bottom: 12px;
    color: #7040e8;
    font-size: 14px;
    font-weight: 700;
}

.payment-notice p {
    margin: 8px 0;
    color: #333;
    font-size: 14px;
    line-height: 1.6;
}

                /* =================================================
                   QR SECTION
                ================================================= */

                .qr-section {

                    text-align:
                        center;

                    padding:
                        10px
                        0
                        25px;
                }

                .merchant-label {

                    margin-bottom:
                        12px;

                    color:
                        #555555;

                    font-size:
                        13px;

                    font-weight:
                        700;
                }

                .maya-qr {

                    width:
                        280px;

                    height:
                        280px;

                    display:
                        block;

                    margin:
                        0 auto
                        15px;

                    object-fit:
                        contain;

                    background:
                        #ffffff;

                    border:
                        8px solid
                        #ffffff;

                    box-shadow:
                        0 5px 20px
                        rgba(0, 0, 0, 0.10);
                }

                .qr-section h3 {

                    margin:
                        5px 0 5px;

                    color:
                        #222222;

                    font-size:
                        17px;
                }

                .qr-section p {

                    margin:
                        0;

                    color:
                        #888888;

                    font-size:
                        12px;
                }

                /* =================================================
                   AMOUNT TO PAY
                ================================================= */

                .amount-to-pay {

                    margin:
                        5px auto 18px;

                    padding:
                        18px;

                    max-width:
                        350px;

                    border-radius:
                        14px;

                    background:
                        #f5f0ff;

                    border:
                        1px solid
                        #ddd0ff;

                    text-align:
                        center;
                }

                .amount-to-pay span {

                    display:
                        block;

                    color:
                        #777777;

                    font-size:
                        12px;

                    margin-bottom:
                        5px;
                }

                .amount-to-pay strong {

                    display:
                        block;

                    color:
                        #7046d8;

                    font-size:
                        30px;

                    font-weight:
                        800;
                }

                .amount-to-pay p {

                    margin:
                        6px 0 0;

                    color:
                        #777777;

                    font-size:
                        12px;
                }

                /* =================================================
                   CARDS
                ================================================= */

                .payment-details,
                .fare-card,
                .proof-card {

                    border:
                        1px solid
                        #eeeeee;

                    border-radius:
                        13px;

                    padding:
                        18px;

                    margin-bottom:
                        16px;
                }

                .payment-details h2,
                .fare-card h2,
                .proof-card h2 {

                    margin:
                        0 0 15px;

                    font-size:
                        17px;

                    color:
                        #222222;
                }

                /* =================================================
                   DETAILS
                ================================================= */

                .detail-row,
                .fare-row {

                    display:
                        flex;

                    justify-content:
                        space-between;

                    gap:
                        15px;

                    padding:
                        9px 0;

                    font-size:
                        13px;
                }

                .detail-row span,
                .fare-row span:first-child {

                    color:
                        #777777;
                }

                .detail-row strong {

                    color:
                        #222222;

                    text-align:
                        right;

                    max-width:
                        60%;
                }

                .fare-row span:last-child {

                    color:
                        #222222;

                    font-weight:
                        600;
                }

                /* =================================================
                   FARE
                ================================================= */

                .fare-divider {

                    height:
                        1px;

                    background:
                        #dddddd;

                    margin:
                        7px 0;
                }

                .total-row {

                    display:
                        flex;

                    justify-content:
                        space-between;

                    padding-top:
                        5px;

                    font-size:
                        17px;

                    color:
                        #222222;
                }

                /* =================================================
                   PAYMENT PROOF
                ================================================= */

                .proof-description {

                    color:
                        #777777;

                    font-size:
                        12px;

                    line-height:
                        1.5;

                    margin:
                        0 0 15px;
                }

                .upload-button {

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        center;

                    width:
                        100%;

                    min-height:
                        50px;

                    padding:
                        12px;

                    border:
                        1px dashed
                        #9a7be8;

                    border-radius:
                        10px;

                    background:
                        #faf8ff;

                    color:
                        #7046d8;

                    font-size:
                        14px;

                    font-weight:
                        700;

                    cursor:
                        pointer;

                    transition:
                        0.2s ease;
                }

                .upload-button:hover {

                    background:
                        #f2edff;
                }

                /* =================================================
                   PROOF PREVIEW
                ================================================= */

                .proof-preview {

                    margin-top:
                        18px;

                    padding:
                        12px;

                    border:
                        1px solid
                        #eeeeee;

                    border-radius:
                        10px;

                    background:
                        #fafafa;
                }

                .proof-preview-header {

                    display:
                        flex;

                    align-items:
                        center;

                    justify-content:
                        space-between;

                    gap:
                        10px;

                    margin-bottom:
                        10px;
                }

                .proof-preview-header strong {

                    color:
                        #333333;

                    font-size:
                        13px;
                }

                .remove-proof {

                    border:
                        none;

                    background:
                        transparent;

                    color:
                        #d33b3b;

                    font-size:
                        12px;

                    font-weight:
                        700;

                    cursor:
                        pointer;
                }

                .proof-preview img {

                    display:
                        block;

                    width:
                        100%;

                    max-height:
                        500px;

                    object-fit:
                        contain;

                    border-radius:
                        8px;

                    background:
                        #ffffff;
                }

                .proof-preview p {

                    margin:
                        8px 0 0;

                    color:
                        #777777;

                    font-size:
                        11px;

                    word-break:
                        break-word;
                }

                /* =================================================
                   ERROR
                ================================================= */

                .error-message {

                    margin-top:
                        12px;

                    padding:
                        10px;

                    border-radius:
                        8px;

                    background:
                        #fff1f1;

                    border:
                        1px solid
                        #ffd1d1;

                    color:
                        #c62828;

                    font-size:
                        12px;

                    line-height:
                        1.4;
                }

                /* =================================================
                   SUBMIT BUTTON
                ================================================= */

                .complete-payment-button {

                    width:
                        100%;

                    min-height:
                        54px;

                    border:
                        none;

                    border-radius:
                        11px;

                    background:
                        #7046d8;

                    color:
                        #ffffff;

                    font-size:
                        15px;

                    font-weight:
                        700;

                    cursor:
                        pointer;

                    transition:
                        0.2s ease;
                }

                .complete-payment-button:hover {

                    transform:
                        translateY(-1px);

                    opacity:
                        0.93;
                }

                .complete-payment-button:active {

                    transform:
                        translateY(0);
                }

                /* =================================================
                   BOTTOM NOTE
                ================================================= */

                .bottom-note {

                    text-align:
                        center;

                    color:
                        #888888;

                    font-size:
                        11px;

                    line-height:
                        1.5;

                    margin:
                        15px 0 0;
                }

                /* =================================================
                   MOBILE
                ================================================= */

                @media (max-width: 600px) {

                    .maya-page {

                        padding:
                            15px 10px;
                    }

                    .maya-container {

                        padding:
                            22px 18px;

                        border-radius:
                            20px;
                    }

                    .maya-heading h1 {

                        font-size:
                            21px;
                    }

                    .maya-qr {

                        width:
                            240px;

                        height:
                            240px;
                    }

                    .detail-row {

                        flex-direction:
                            column;

                        gap:
                            3px;
                    }

                    .detail-row strong {

                        max-width:
                            100%;

                        text-align:
                            left;
                    }

                    .amount-to-pay strong {

                        font-size:
                            26px;
                    }
                }

            `}</style>

        </main>
    );
};

export default MayaPayment;